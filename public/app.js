// app.js
// Browser logic for F1. Talks only to the team's Worker, never to D1, which is
// what F1-8 requires. Wrapped in an IIFE so nothing leaks to the global scope.

(function () {
  "use strict";

  const form = document.getElementById("gap-form");
  const skillsInput = document.getElementById("skills-input");
  const roleSelect = document.getElementById("role-select");
  const submitButton = document.getElementById("submit-button");
  const statusLine = document.getElementById("status");
  const resultSection = document.getElementById("result");
  const resultHeading = document.getElementById("result-heading");
  const resultProvenance = document.getElementById("result-provenance");
  const gapList = document.getElementById("gap-list");

  function setStatus(message, tone) {
    // textContent, never innerHTML: the role name in these messages comes from
    // data and the skills come from the student. STANDARDS.md rule 5.
    statusLine.textContent = message;
    if (tone) {
      statusLine.setAttribute("data-tone", tone);
    } else {
      statusLine.removeAttribute("data-tone");
    }
  }

  function hideResult() {
    resultSection.hidden = true;
    gapList.replaceChildren();
  }

  // One helper for every request, so a failure is handled the same way
  // everywhere and never reaches the console as an uncaught error.
  async function requestJson(path, options) {
    const response = await fetch(path, options);
    let body = null;
    try {
      body = await response.json();
    } catch {
      throw new Error("The server sent a response this page could not read.");
    }
    if (!response.ok) {
      throw new Error(body && body.error ? body.error : "Request failed.");
    }
    return body;
  }

  // Split on newlines and commas so a student can paste either way.
  function parseSkills(raw) {
    return raw
      .split(/[\n,]/)
      .map((part) => part.trim())
      .filter((part) => part.length > 0);
  }

  async function loadRoles() {
    try {
      const data = await requestJson("/api/roles", { method: "GET" });
      roleSelect.replaceChildren();

      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "Choose a role";
      roleSelect.appendChild(placeholder);

      // F1-1. Only roles the posting set contains.
      for (const role of data.roles) {
        const option = document.createElement("option");
        option.value = role.role;
        option.textContent = `${role.role} (${role.postingCount} postings)`;
        roleSelect.appendChild(option);
      }
    } catch (error) {
      roleSelect.replaceChildren();
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "Roles unavailable";
      roleSelect.appendChild(option);
      setStatus(`Could not load the roles: ${error.message}`, "error");
    }
  }

  function renderResult(data) {
    gapList.replaceChildren();

    // F1-6. A role with no postings is named, and no gap is shown.
    if (data.hasPostings === false) {
      resultHeading.textContent = `No postings for ${data.role}`;
      resultProvenance.textContent = data.message;
      resultSection.hidden = false;
      return;
    }

    // F1-4. The collection date appears beside every result.
    resultProvenance.textContent =
      `Based on ${data.totalPostings} postings for ${data.role}, collected on ${data.collectedOn}. ` +
      `This is a fixed set. It does not update.`;

    // F1-7. No gap is a sentence, not an empty list.
    if (data.noGap) {
      resultHeading.textContent = "No gap found";
      const item = document.createElement("li");
      item.textContent =
        "Every skill named in these postings is already on your list.";
      gapList.appendChild(item);
      resultSection.hidden = false;
      return;
    }

    resultHeading.textContent =
      `${data.missing.length} skills in these postings are not on your list`;

    for (const entry of data.missing) {
      const item = document.createElement("li");

      const name = document.createElement("span");
      name.textContent = entry.skill;

      const count = document.createElement("span");
      count.className = "gap-count";
      count.textContent =
        `${entry.postingCount} of ${data.totalPostings} postings`;

      item.appendChild(name);
      item.appendChild(count);
      gapList.appendChild(item);
    }

    resultSection.hidden = false;
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const skills = parseSkills(skillsInput.value);
    const role = roleSelect.value;

    // F1-5. No skills means ask, and show nothing. Checked here as well as in
    // the Worker: the Worker is the rule, this is the courtesy.
    if (skills.length === 0) {
      hideResult();
      setStatus("Enter at least one skill you already have.", "error");
      skillsInput.focus();
      return;
    }

    if (role === "") {
      hideResult();
      setStatus("Choose a target role.", "error");
      roleSelect.focus();
      return;
    }

    submitButton.disabled = true;
    setStatus("Checking the posting set…", "info");

    try {
      const data = await requestJson("/api/gaps", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ role, skills }),
      });
      setStatus("");
      renderResult(data);
    } catch (error) {
      // The textarea is never cleared on failure, so a student does not retype
      // a list they already entered. STANDARDS.md rule 7.
      hideResult();
      setStatus(error.message, "error");
    } finally {
      submitButton.disabled = false;
    }
  });

  loadRoles();
})();
