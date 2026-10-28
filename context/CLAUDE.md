# CLAUDE.md

Read `context/STANDARDS.md` and the selected scope in `context/FEATURES.md` before editing. `STANDARDS.md` is normative; if instructions conflict, report the conflict and repair it rather than choosing between them.

Roles rotate each phase. `TEAM.md` is the source for who holds which role. The Final rotation was recorded on 2026-10-28.

## Approved Tools

- Keep the workspace dependency-free by default. Do not install or import external frameworks, libraries, CDN tags, or build tools unless a row is added to `TOOLS.md` before installation detailing what the dependency is trusted with, what data it holds, and the cost of removal.
- AI tools used on this project so far: Claude, GitHub Copilot, Google Gemini, and bolt.new (the Phase 1 specification probe only). Each needs a row in `TOOLS.md`, and each delegated piece needs a DDR.
- Store root agent configuration in `CLAUDE.md` for Claude Code and mirror adapters in `.github/copilot-instructions.md` for VS Code Copilot.

## Where AI May Be Responsible

- AI may be R or C on any artifact row in `TEAM.md`. AI is never A. Every row where AI is R names the DDR and the human A beside it.
- AI never approves or merges a pull request. Merging is a human act by a named reviewer.

## What AI May Do

- Implement feature scopes defined in `context/FEATURES.md` using vanilla web standards: HTML structure in `index.html`, presentation in `styles.css`, client logic in `app.js`, and server execution in `worker.js`.
- Use descriptive camelCase for variables and functions, kebab-case for CSS classes and filenames, and PascalCase for constructors and classes. Name entities for what they hold or do (e.g., `contactEntries`, not `contactArray`), and format booleans as questions (e.g., `isOverdue`).
- Modularize JavaScript code by giving each function a single, distinct purpose while keeping functions loosely coupled.
- Encapsulate browser and server logic inside IIFE wrappers using lexical scope to prevent global namespace pollution.
- Write explanatory comments that detail *why* non-obvious choices, spec rules, or workarounds exist.
- Use `textContent` exclusively when rendering user-supplied or user-controlled text into the DOM.
- Bind SQL parameters using `prepare(...).bind(...)` syntax for all database queries.
- Connect all form controls to explicit labels and provide accessible status feedback (`role="alert"`, `aria-live`).
- Route all network requests through a unified request helper and handle failure gracefully on the page without throwing uncaught exceptions to the console.
- Retain typed user input in form fields whenever storage writes, network calls, or save attempts fail.
- Preserve user-submitted data as entered without changing its meaning or adding unsupported details.
- Handle network and database errors with clear user-visible messages and preserve input state when an operation fails.

## What AI May Never Do Here

- Do not use inline `style` attributes or write inline JavaScript scripts inside HTML files beyond the single tag loading `app.js`.
- Do not write comments that merely describe or narrate what standard code statements do.
- Do not use `innerHTML` to render user-supplied, user-controlled, or unverified dynamic strings.
- Do not build SQL queries via string concatenation or template literal interpolation.
- Do not write or commit any credentials, API keys, tokens, or passwords in code, comments, configuration, or context files (database IDs are treated as addresses and may reside in `wrangler.toml`).
- Do not add dependencies or external assets without prior documentation in `TOOLS.md`.
- Do not invent, fabricate, or assume data, test outcomes, interview evidence, verification results, deadlines, automatic recommendations, or status changes (e.g., implying an update was viewed) unless explicitly recorded in data.
- Do not modify or replace `context/STYLE.md` or `context/SKILLS.md` unless the task names them. They are merged team files, and changes go through a reviewed pull request.
- Do not leave temporary debug statements (such as `console.log`) in code prior to completion.

## The DDR Rule

- Before using output from any delegated task, create its Delegation Disclosure Record (DDR) in `docs/`. Record the tool and model, what information crossed to the tool, who is accountable, and how the output was verified.

## When We Disagree About AI Use

- The Approver is the Reviewer (Aaron Rahim as of 2026-10-28). The member who disagrees says so in a pull request comment or opens a DACI in `docs/`. The Approver decides in writing, and the decision links the DDR if a tool is involved.
- Refer to `STANDARDS.md` as the normative authority for all project policies and standards.
- Feature-specific rules, visual layout constraints, temporary planning boundaries, and Git commit formatting guidelines must be specified in individual task prompts rather than added as persistent context here.
- If a task prompt or adapter instruction conflicts with `STANDARDS.md`, report the conflict to the maintainers, align code to `STANDARDS.md`, and update the conflicting document to match.