// worker.js
// The team's own API. The static page talks only to this, never to D1, which
// is what F1-8 requires: no database key ever reaches browser code.
//
// Routes:
//   GET  /api/roles  -> the roles the posting set actually contains
//   POST /api/gaps   -> the skills missing from a student's list for one role
//
// Every other method and path is refused. F1-9 asks for that explicitly: a
// request from the browser that tries to add, change, or delete a posting is
// refused rather than ignored.

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

// One place that builds every error, so the page can rely on the shape.
function errorResponse(message, status) {
  return jsonResponse({ error: message }, status);
}

// F1-3. Matching ignores capitalization and extra spaces. Applied to the
// student's input here and written into skill_normalised at seed time, so both
// sides of the comparison are normalised the same way.
function normaliseSkill(value) {
  return String(value).toLowerCase().split(/\s+/).filter(Boolean).join(" ");
}

async function listRoles(env) {
  // F1-1. The student chooses from the roles the posting set actually has,
  // rather than typing a role the data cannot answer for.
  const { results } = await env.DB.prepare(
    `SELECT role,
            COUNT(*)        AS postingCount,
            MAX(collected_on) AS collectedOn
       FROM postings
      GROUP BY role
      ORDER BY role`,
  ).all();
  return jsonResponse({ roles: results });
}

async function computeGaps(env, requestBody) {
  const role = typeof requestBody.role === "string" ? requestBody.role.trim() : "";
  const rawSkills = Array.isArray(requestBody.skills) ? requestBody.skills : [];

  // F1-5. No skills means ask for at least one and show no result.
  const studentSkills = rawSkills
    .map(normaliseSkill)
    .filter((skill) => skill.length > 0);
  if (studentSkills.length === 0) {
    return errorResponse("Enter at least one skill you already have.", 400);
  }
  if (role.length === 0) {
    return errorResponse("Choose a target role.", 400);
  }

  // F1-6. A role with no postings is named back to the student, and no gap is
  // shown. Checked before any gap work so the answer cannot be an empty list
  // that looks like success.
  const roleRow = await env.DB.prepare(
    `SELECT role, COUNT(*) AS postingCount, MAX(collected_on) AS collectedOn
       FROM postings WHERE role = ? GROUP BY role`,
  )
    .bind(role)
    .first();

  if (!roleRow || roleRow.postingCount === 0) {
    return jsonResponse({
      role,
      hasPostings: false,
      message: `No postings for ${role} in this data set.`,
    });
  }

  // F1-2. The skills that appear in postings for the role. Parameters are bound
  // rather than concatenated, as STANDARDS.md rule 6 requires.
  const { results: roleSkills } = await env.DB.prepare(
    `SELECT ps.skill_normalised AS normalised,
            MIN(ps.skill)       AS label,
            COUNT(*)            AS postingCount
       FROM posting_skills ps
       JOIN postings p ON p.id = ps.posting_id
      WHERE p.role = ?
      GROUP BY ps.skill_normalised
      ORDER BY postingCount DESC, label ASC`,
  )
    .bind(role)
    .all();

  const held = new Set(studentSkills);
  const missing = roleSkills.filter((row) => !held.has(row.normalised));

  return jsonResponse({
    role: roleRow.role,
    hasPostings: true,
    // F1-4. The collection date travels with the result, so the page cannot
    // render a gap without saying how old the data behind it is.
    collectedOn: roleRow.collectedOn,
    totalPostings: roleRow.postingCount,
    // F1-7. An empty missing list is a real answer, not an empty screen. The
    // page is told which case it is rather than inferring it from length.
    noGap: missing.length === 0,
    missing: missing.map((row) => ({
      skill: row.label,
      postingCount: row.postingCount,
    })),
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      if (request.method === "GET" && path === "/api/roles") {
        return await listRoles(env);
      }

      if (request.method === "POST" && path === "/api/gaps") {
        let body;
        try {
          body = await request.json();
        } catch {
          return errorResponse("Request body was not valid JSON.", 400);
        }
        return await computeGaps(env, body);
      }

      // F1-9. Anything that would add, change, or delete a posting is refused
      // by name, so a reader can see the refusal rather than assume it.
      if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) {
        return errorResponse(
          "This API is read-only. Postings are loaded by the team and cannot be added, changed, or deleted from the browser.",
          405,
        );
      }

      return errorResponse("Not found.", 404);
    } catch (error) {
      // STANDARDS.md rule 8: a failure returns a readable message rather than
      // an uncaught error. The message is generic because the detail belongs in
      // the logs, not in a response a browser can read.
      console.error("Unhandled error", error);
      return errorResponse("Something went wrong reading the posting set.", 500);
    }
  },
};
