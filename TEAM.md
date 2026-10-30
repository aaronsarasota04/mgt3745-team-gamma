# TEAM.md

## Working Agreement

- **Meetings.** Tuesdays, 5:30 PM to 6:30 PM ET on Teams. Prince keeps time and logs decisions in the Meeting Log. The team checks in daily in the Teams chat and adds a weekend meeting when needed.
- **Channel.** Teams chat for the daily check-in and coordination. Anything that changes an artifact goes in a pull request comment, so the record lives with the file.
- **Response time.** Within 24 hours on weekdays and weekends, unless the member posted earlier that they will be offline.
- **Quiet member clause.** At 48 hours without a response, a teammate pings the member in the Teams chat and sends an email. At 72 hours, the team gives the member's open work to one person or splits it across the team, and records the change in this file with the date. At 96 hours with no response, the team emails the instructor with this clause and the dates.
- **Disagreement.** If a disagreement survives one meeting, it becomes a DACI in `docs/`, and the owner of the affected file is the Driver. A disagreement about AI use goes to the Approver named in `context/CLAUDE.md`.
- **Dates.** Phase 3 is due Oct 29, 11:59 PM ET. Proposed team checkpoints: all pull requests merged by Oct 29, 6 PM ET; recording linked from the README by Oct 29, 8 PM ET; Canvas submission before the deadline.

## Roster

Roles rotated for Phase 3 per the Rotation Plan below, recorded 2026-10-28. GitHub handles match the accounts that commit, so they agree with `.github/CODEOWNERS`.

| Name | Phase 3 Role | GitHub | Contact hours (ET) |
|---|---|---|---|
| Aaron Rahim | Reviewer and Evaluator | @aaronsarasota04 | Tuesday noon to midnight. All other days 8pm to midnight |
| Prince Muteteke | Architect | @Daedruoy | Weekdays after 5 PM |
| Ryan Linde | Specifier | @ryanlinde-gif | Any day after 4:00 PM |
| Canon | Implementer | @cad3nnn | Mon 6-9, Tue 5:30-7:30, Wed 4:30-6, Thu-Fri 5:30-9, Sat-Sun 1-8pm |

**Roster change, 2026-10-20. Nuhamin has dropped the course.** Recorded here as the working agreement requires. She held Implementer in Phase 1 and was due Specifier in Phase 2. Her open work was `context/CLAUDE.md` and `docs/DDR-001.md`; Aaron volunteered for CLAUDE.md and shipped it in #14. **Update 2026-10-28: `docs/DDR-001.md` is assigned to Prince**, who ran the bolt.new probe it records.

**The team is four**, so per the Phase 3 brief the Reviewer carries the Evaluator's duties under one Verification score. Aaron holds both.

## RACI Matrix (Phase 3)

R = Responsible (does the work), A = Accountable (answers for it; exactly one person, always a person), C = Consulted (asked before), I = Informed (told after). AI tools may be R or C and are never A. Every row where AI is R names the human A beside it.

| Artifact | Specifier (Ryan) | Architect (Prince) | Implementer (Canon) | Reviewer + Evaluator (Aaron) | AI tools |
|---|---|---|---|---|---|
| TEAM.md and the rotation entry in context/CLAUDE.md | C | A/R | C | C | R: Claude drafted the Phase 3 rotation edits; Prince is A (DDR-010) |
| context/FEATURES.md | A/R | C | C | C | |
| docs/RETRO.md: RAT verdict, spec findings | A/R | C | C | C | |
| docs/RETRO.md: evals against plan, stakes resolved, delegation against plan | C | C | C | A/R | R: Copilot drafted them; Aaron is A (DDR-008, DDR-009) |
| docs/RETRO.md: what we would build differently (proposed) | R | A/R | R | R | |
| context/ARCHITECTURE.md: final diagram and ADR history | C | A/R | C | C | |
| docs/DEPLOY.md | C | A/R | R | C | |
| The integrated build on main, deployed from the Implementer's Cloudflare account | C | C | A/R | C | |
| README.md | C | C | A/R | C | |
| Recording, eight minutes or fewer, linked from the README | R | R | A/R | R | |
| context/CLAUDE.md (policy), context/TOOLS.md, context/STANDARDS.md | I | C | A/R | C | |
| .github/CODEOWNERS and branch protection | I | C | A/R | C | |
| context/EVALS.md, final | C | C | C | A/R | |
| Pruned context scaffold, with reasons in the removing pull requests | C | C | C | A/R | |
| docs/DDR-LOG.md (proposed) | I | I | R | A | |
| docs/DDR-001.md, the bolt.new probe | C | A/R | I | C | R: bolt.new ran the probe; Prince is A |
| Pull request reviews | R | R | R | A/R | |

Each member is A/R for their own file in `docs/retro/`. Where a row has no R, the A also did the work. The pull request that first uses an AI tool on a row adds its entry to the AI column and links its DDR. Two assignments are proposed because the Phase 3 brief gives them to no role: `docs/DDR-LOG.md` (Aaron) and the "what we would build differently" section of RETRO.md (Prince). Confirm or change them in review.

## RACI Matrix (Phase 2, superseded 2026-10-28)

| Artifact | Specifier (Canon) | Architect (Aaron) | Implementer (Ryan) | Reviewer + Evaluator (Prince) | AI tools |
|---|---|---|---|---|---|
| context/FEATURES.md | A/R | C | C | C | |
| docs/VALIDATION.md | A/R | I | I | C | |
| context/ARCHITECTURE.md: ADR-002 onward, D1 schema, diagram | C | A/R | C | C | |
| The Worker, D1 schema and seed data, static pages | C | C | A/R | C | R: named per piece in that piece's DDR; Ryan is A |
| context/STYLE.md, context/SKILLS.md | C | C | A/R | C | |
| context/TOOLS.md, context/STANDARDS.md, context/CLAUDE.md | I | C | A/R | C | |
| docs/DDR-* for delegated work | I | I | A/R | C | |
| context/EVALS.md: code evals with node:test | C | C | C | A/R | |
| context/EVALS.md: RAT, judgment evals, stake resolution | C | C | C | A/R | |
| Pull request reviews | R | R | R | A/R | |
| README.md | C | C | R | A/R | |
| .github/CODEOWNERS and branch protection | I | C | A/R | C | |

## RACI Matrix (Phase 1, superseded 2026-10-09)

R = Responsible (does the work), A = Accountable (answers for it; exactly one person, always a person), C = Consulted (asked before), I = Informed (told after). AI tools may be R or C and are never A. Every row where AI is R names the human A beside it.

| Artifact | Specifier | Architect | Implementer | Reviewer | Co-Implementer | AI tools |
|---|---|---|---|---|---|---|
| TEAM.md | A/R | C | C | C | C | |
| docs/DACI-001.md | C | C | A/R | C | C | |
| context/PROJECT.md | A/R | C | C | C | C | |
| context/USERS.md | A/R | C | I | C | I | |
| context/FEATURES.md | A/R | C | C | C | C | |
| context/ARCHITECTURE.md | C | A/R | C | C | C | |
| context/STANDARDS.md, TOOLS.md, CLAUDE.md | I | C | A/R | C | R | |
| context/STANDARDS.md, TOOLS.md | I | C | A/R | C | C | |
| context/CLAUDE.md | C | C | C | C | A/R | |
| .github/CODEOWNERS and branch protection | I | I | A/R | C | R | |
| docs/PROBE-001.md | A/R | I | C | C | C | R: bolt.new runs the probe; Prince is A |
| docs/DDR-001.md | C | I | C | C | A/R | |
| context/EVALS.md (OST, RAT) | C | C | I | A/R | I | |
| context/EVALS.md (Prediction Stakes) | R | R | R | A/R | R | |
| Pull request reviews | R | R | R | A/R | R | |
| README.md | C | A/R | C | C | C | |

## Rotation Plan

| Member  | Phase 1     | Phase 2                            | Final       |
|---------|-------------|------------------------------------|-------------|
| Aaron   | Implementer | Architect                          | Reviewer    |
| Prince  | Specifier   | Reviewer                           | Architect   |
| Ryan    | Architect   | Implementer                        | Specifier   |
| Canon   | Reviewer    | Specifier                          | Implementer |
| Nuhamin | *(dropped the course, 2026-10-20)* | *(dropped)* | *(dropped)* |


## Meeting Log

| Date   | Decision or note | Recorded by |
|--------|------------------|-------------|
| Oct 5  | Roles assigned. Problem chosen for DACI-001. Aaron drove the decision. | Prince |
| Oct 9  | Roles rotated per the Rotation Plan. Aaron Architect, Prince Reviewer and Evaluator, Ryan Implementer, Canon Specifier. | Ryan |
| Oct 20 | Nuhamin has dropped the course. Team is now four, so the Reviewer also holds Evaluator. CLAUDE.md was picked up by Aaron. DDR-001 is still unowned. | Ryan |
| Oct 28 | Final rotation recorded in TEAM.md and CLAUDE.md: Aaron Reviewer and Evaluator, Prince Architect, Ryan Specifier, Canon Implementer. DDR-001 assigned to Prince. | Prince |