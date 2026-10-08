# STANDARDS.md

Status: ACTIVE in Module 3.

Merged from team members' HW5 versions (Aaron, Canon, Nuhamin, Prince, and Ryan). Where two rules conflicted, the stricter version was retained.

This file is normative if an adapter or context/CLAUDE.md conflicts. Repair inconsistent copies; do not silently choose different policies for humans and agents.

## Documents

1. **Rule Ownership & Persistence:** `STANDARDS.md` is normative. Rules that apply universally across all tasks belong in `CLAUDE.md`. Feature-specific, layout-specific, or single-use rules (such as visual interface hierarchies, temporary planning restrictions, or commit message formatting) belong in task prompts rather than persistent context.
2. **Traceability:** When a rule is moved to a task prompt for execution, its general principle remains recorded in `STANDARDS.md` for traceability.

## Code

1. **Naming Conventions:** Use descriptive camelCase identifiers for JavaScript variables and functions, kebab-case for file names and CSS classes, and PascalCase for constructors/classes[cite: 6, 7, 8, 9, 10]. Short conventional names for events and indexes are acceptable when their role is obvious[cite: 6, 7, 9, 10]. Name booleans as questions (e.g., `isOverdue`)[cite: 10]. Avoid arbitrary minimum name lengths or encoding type names into identifiers (e.g., use `contactEntries`, not `contactArray`)[cite: 6, 9, 10].
2. **Separation of Concerns:** Keep structure, presentation, and behavior strictly separated into `index.html`, `styles.css`, and `app.js` (with server code isolated in `worker.js`)[cite: 6, 7, 8, 9, 10]. No inline `style` attributes, application styles, or inline script content in the HTML beyond the single tag loading `app.js`[cite: 7, 9, 10]. Use lexical scope and IIFE wrappers to prevent accidental global variables[cite: 6, 9, 10].
3. **Modular Function Design:** Give each JavaScript function a single, distinct purpose and keep functions loosely coupled to support future extension without affecting existing behavior[cite: 6, 9].
4. **Commenting & Code Cleanliness:** Inline comments explain *why* non-obvious choices, rules, or workarounds exist—never *what* a line of code does[cite: 6, 7, 8, 9, 10]. Do not narrate every statement[cite: 6, 9]. Delete temporary debug output (e.g., stray `console.log` statements) prior to submission[cite: 6, 7, 8, 9, 10].
5. **DOM Manipulation & XSS Prevention:** Use `textContent` for all user-supplied or user-controlled text rendering[cite: 6, 7, 8, 9, 10]. Never insert user strings through `innerHTML`[cite: 6, 7, 8, 9, 10].
6. **SQL Injection Prevention:** User values reach SQL through `bind()` parameter bindings (e.g., `prepare("... VALUES (?)").bind(value)`)[cite: 8, 9, 10]. Never use string concatenation for SQL statements[cite: 8, 9, 10].
7. **Accessibility & Form Handling:** Associate form controls explicitly with labels and make success and error states perceivable (e.g., using `role="alert"` and `aria-live`)[cite: 6, 7, 9, 10]. Preserve unsaved user input in form fields when a storage write or network save fails[cite: 6, 7, 9, 10].
8. **Error Handling & Reporting:** A failed request or network call must produce a clear, human-readable error message shown to the user on the page[cite: 8, 9, 10]. Failed requests must be handled gracefully through unified helpers and never thrown as uncaught errors in the console[cite: 8, 9, 10].
9. **Credential & Secret Security:** No credentials, keys, tokens, or passwords in code, comments, configuration files, context files, or repositories[cite: 8, 9, 10]. Database IDs are treated as addresses and may appear in `wrangler.toml`[cite: 8, 9, 10]. Secret management must comply with `TOOLS.md`[cite: 10].
10. **Dependencies & Trust Boundaries:** No external frameworks, libraries, CDN tags, or build steps allowed unless explicitly documented with a row in `TOOLS.md` defining its trust boundary prior to installation[cite: 10].
11. **Data Authenticity & Integrity:** Present submitted items strictly as entered by the user[cite: 7, 9]. Do not fabricate urgency, deadlines, automatic recommendations, or status changes (e.g., implying an item was seen or acknowledged) unless explicitly recorded in data[cite: 7, 9].

## Git

1. **Commit Message Format:** Write commit messages in the imperative mood with a subject line under 60 characters that names the changed behavior and its purpose (e.g., `"Add timestamp to submitted updates"`)[cite: 6, 7, 9, 10]. Include a body line when necessary to explain rationale not obvious from the diff[cite: 10]. Avoid vague messages like `"updated stuff"` or `"final."`[cite: 9]

---

## Conflict Notes & Merging Choices

* **Separation of Concerns (Code #2):** Combined the browser/server boundary from Ryan and Nuhamin (`index.html`, `styles.css`, `app.js`, `worker.js`)[cite: 8, 10] with Canon and Prince's strict prohibition against inline styles and scripts[cite: 7, 9]. Choice: Kept the strictest version requiring explicit IIFE wrappers, lexical scoping, and complete elimination of inline scripts/styles[cite: 6, 7, 9, 10].
* **Naming Conventions (Code #1):** Reconciled the naming rules across team members: camelCase for variables/functions[cite: 6, 7, 8, 9, 10], kebab-case for file names and CSS classes[cite: 8, 9, 10], and PascalCase for constructors/classes. Choice: Incorporated Ryan's stricter requirements banning type-encoding names (e.g., `contactEntries` over `contactArray`) and requiring question formats for booleans (`isOverdue`)[cite: 10].
* **Comments & Cleanliness (Code #4):** Resolved variation between Aaron's rule ("explain purpose of sections")[cite: 6] and Canon/Prince/Ryan/Nuhamin's rules ("explain why, never what")[cite: 7, 8, 9, 10]. Choice: Adopted the stricter rule that inline comments must strictly explain non-obvious *why* decisions rather than narrating what code does, while preserving the mandatory removal of all temporary debug output (such as `console.log`) before submission[cite: 6, 7, 8, 9, 10].
* **XSS & SQL Security (Code #5 & #6):** Preserved zero-tolerance constraints across all members' versions: strict usage of `textContent` over `innerHTML` for any user text[cite: 6, 7, 8, 9, 10] and mandatory SQL parameter binding via `.bind()` (prohibiting string concatenation)[cite: 8, 9, 10].
* **Form State Preservation (Code #7):** Aaron, Canon, Prince, and Ryan addressed preserving unsaved input during storage/write failures[cite: 6, 7, 9, 10]. Choice: Kept the broader standard requiring unsaved form input to survive any save or network failure so user input is never silently discarded[cite: 10].