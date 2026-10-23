// Code evals for the deployed Worker. Every request reads data or sends a method
// the Worker refuses, so nothing here changes the database.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BASE_URL =
  process.env.WORKER_URL ?? "https://mgt3745-team-gamma.ryanlindebusiness.workers.dev";

// No posting lists this skill, so the Worker returns every skill for the role as missing.
const UNMATCHED_SKILL = "zzz-not-a-skill";

async function callApi(path, options) {
  const response = await fetch(`${BASE_URL}${path}`, options);
  return { status: response.status, body: await response.json() };
}

function postGaps(payload) {
  return callApi("/api/gaps", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

async function listRoleNames() {
  const { body } = await callApi("/api/roles");
  return body.roles.map((row) => row.role);
}

async function everySkillFor(role) {
  const { body } = await postGaps({ role, skills: [UNMATCHED_SKILL] });
  return body.missing;
}

test("F1-1: /api/roles lists only roles that have postings", async () => {
  const { status, body } = await callApi("/api/roles");
  assert.equal(status, 200);
  assert.ok(body.roles.length > 0, "no roles returned");
  for (const row of body.roles) {
    assert.ok(row.postingCount > 0, `${row.role} has no postings`);
  }
});

test("F1-3: capitalization and extra spaces do not change the result", async () => {
  const [role] = await listRoleNames();
  const [first] = await everySkillFor(role);
  const plain = await postGaps({ role, skills: [first.skill.toLowerCase()] });
  const messy = await postGaps({
    role,
    skills: [`  ${first.skill.toUpperCase().replace(/ /g, "   ")}  `],
  });
  assert.deepEqual(messy.body, plain.body);
  assert.ok(
    !messy.body.missing.some((row) => row.skill === first.skill),
    "a skill the student holds is still shown as missing",
  );
});

test("F1-4: every result carries the date the posting set was collected", async () => {
  const [role] = await listRoleNames();
  const { body } = await postGaps({ role, skills: [UNMATCHED_SKILL] });
  assert.match(body.collectedOn, /^\d{4}-\d{2}-\d{2}$/);
});

test("F1-5: no skills gets a 400 and no result", async () => {
  const [role] = await listRoleNames();
  const { status, body } = await postGaps({ role, skills: [] });
  assert.equal(status, 400);
  assert.equal(body.error, "Enter at least one skill you already have.");
  assert.equal(body.missing, undefined);
});

test("F1-6: a role with no postings is named back and no gap is shown", async () => {
  const { status, body } = await postGaps({ role: "Underwater Welder", skills: ["sql"] });
  assert.equal(status, 200);
  assert.equal(body.hasPostings, false);
  assert.ok(body.message.includes("Underwater Welder"));
  assert.equal(body.missing, undefined);
});

test("F1-7: holding every skill reports no gap instead of an empty list", async () => {
  const [role] = await listRoleNames();
  const everySkill = (await everySkillFor(role)).map((row) => row.skill);
  const { body } = await postGaps({ role, skills: everySkill });
  assert.equal(body.noGap, true);
  assert.deepEqual(body.missing, []);
});

test.skip("F1-8: no database key or binding appears in browser files", () => {
  const looksLikeCredential = /database_id|env\.DB|api[_-]?key|bearer\s/i;
  for (const name of readdirSync("public")) {
    const text = readFileSync(join("public", name), "utf8");
    assert.ok(!looksLikeCredential.test(text), `${name} contains something that looks like a credential`);
  }
});

test("F1-9: adding, changing, or deleting a posting is refused", async () => {
  for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
    const response = await fetch(`${BASE_URL}/api/postings`, { method });
    assert.equal(response.status, 405, `${method} returned ${response.status}`);
  }
});

test("F2-1: missing skills are ordered by posting count, highest first", async () => {
  for (const role of await listRoleNames()) {
    const counts = (await everySkillFor(role)).map((row) => row.postingCount);
    const highestFirst = [...counts].sort((a, b) => b - a);
    assert.deepEqual(counts, highestFirst, `${role} is not ordered by count`);
  }
});

test("F2-4: skills with equal counts are in alphabetical order", async () => {
  for (const role of await listRoleNames()) {
    const missing = await everySkillFor(role);
    for (let index = 1; index < missing.length; index += 1) {
      const before = missing[index - 1];
      const after = missing[index];
      if (before.postingCount === after.postingCount) {
        assert.ok(
          before.skill.localeCompare(after.skill) <= 0,
          `${role}: ${before.skill} should not come before ${after.skill}`,
        );
      }
    }
  }
});

test("F2-8: no count is larger than the total postings shown", async () => {
  for (const role of await listRoleNames()) {
    const { body } = await postGaps({ role, skills: [UNMATCHED_SKILL] });
    for (const row of body.missing) {
      assert.ok(
        row.postingCount <= body.totalPostings,
        `${role}: ${row.skill} shows ${row.postingCount} of ${body.totalPostings}`,
      );
    }
  }
});