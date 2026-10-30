# RETRO.md

The Build-Measure-Learn loop closed, across all three phases. Sections follow the
order the Phase 3 brief sets. Graded on honesty and evidence, never on whether
the project went well.

**Owners.** RAT verdict and Spec findings: Ryan (Specifier). Evals against plan,
Stakes resolved and Delegation against plan: Aaron (Reviewer and Evaluator).
What we would build differently is the team's; drafted below for the team to
correct.

---

## 1. The RAT verdict

**The assumption.** A student who sees the ranked gap list for a role can name
the next skill they would learn and say why, without help.

**Why it was the riskiest.** The Outcome in `PROJECT.md` is that more students
leave a session able to name their next skill, the role it serves, and why. No
interview in `USERS.md` tested a ranking. The posting set is 28 rows the team
wrote. If a ranked list is not an answer a student can act on, the product does
not work, and no amount of extra postings fixes it.

**Result: REFUTED.** Tested 2026-10-22 against the deployed build. Prince ran
and recorded both sessions.

| | Tester 1 | Tester 2 |
|---|---|---|
| Role description | CS graduate, full-time software engineer | Junior, internship search |
| Role on page | Frontend Developer | Data Analyst |
| Named a skill in the top five | Yes (TypeScript) | Yes (SQL) |
| Reason referred to the list | Borderline, counted Yes | **No** |
| J1: said the postings were made up | Yes | No, assumed web-scraped |
| J2: found the collection date | **No** | **No** |

**Against the pass line, which was 2 of 2:** 1 of 2 on the RAT, and 0 of 2 if
tester 1's reason is read strictly. He said the skill "must have been
highlighted for a reason" and gave no count and no rank, leaning on having seen
TypeScript in real job applications. Tester 2's reason was his own coursework
and the general value of SQL. **Neither reason came from the list.** J1 passed 1
of 2. J2 passed 0 of 2.

**The plan was changed before the test and the change is on the record.** On
2026-10-22, before the first session, the test went from three testers to two
because only two were available, and the pass line moved to 2 of 2. That note is
in `EVALS.md` above the result, dated, as the brief requires.

**What the result means, in the plan's own words:** the list alone is not yet an
answer, and the next step is the explanation around it, not more postings.

**What it does not mean.** Both testers did name a skill from their own top
five, so the ranking is being read and used. What failed is the *reason*. The
honest reading is that the list points at the right skill and does not yet
supply the argument for it, and two sessions cannot tell us whether the list led
them there or merely confirmed something they already believed.

**Limits, stated rather than buried.** Two testers, not three. Both friends of
the team. One is a graduate, not a student, so he sits outside the user in
`USERS.md`. Both named the skill ranked first, which is also the skill most
likely to be known already. One team member ran both sessions alone, so nothing
checks his notes. A fair version of this test needs testers nobody on the team
knows, and a way to tell a confirmed belief from a new one.

---

## 2. Evals Against Plan

[Link to EVALS.md](../context/EVALS.md)

| Check | Ran? | Result | What changed in the team's work |
|---|---|---|---|
| E1 — roles with postings only | Yes | Pass: 11/11 deployed code evals passed; E1 confirmed that `/api/roles` returns only roles with postings. | Nothing. The check found the implementation already matched the plan. |
| E2 — normalization ignores case and extra spaces | Yes | Pass. Equivalent plain and messy skill inputs produced the same result. | Nothing. The existing normalization behavior matched the check. |
| E3 — collection date on every result | Yes | Pass. Gap responses included a `YYYY-MM-DD` collection date. | Nothing. The product and API already matched the plan. |
| E4 — empty skills request | Yes | Pass. An empty list returned 400 with the planned error and no gap result. | Nothing. The check confirmed the existing validation boundary. |
| E5 — role with no postings | Yes | Pass. `Underwater Welder` was named back with `hasPostings: false` and no gap. | Nothing. The check confirmed the planned no-data response. |
| E6 — all skills held | Yes | Pass. The response reported `noGap: true` and an empty missing list. | Nothing. The check confirmed the existing result shape. |
| E7 — no database binding in browser files | Yes | Pass. Browser files contained no database ID or binding. | Nothing. The check confirmed credential isolation. |
| E8 — postings cannot be mutated | Yes | Pass. POST, PUT, PATCH, and DELETE returned 405. | Nothing. The check confirmed write methods remain refused. |
| E9 — missing skills sorted by count | Yes | Pass. Counts appeared highest first for every role. | Nothing. The ranking implementation matched the plan. |
| E10 — equal counts sorted alphabetically | Yes | Pass. Equal-count skills were alphabetically ordered. | Nothing. The check confirmed the tie-break behavior. |
| E11 — counts do not exceed posting totals | Yes | Pass. Every displayed skill count was no greater than the role's total postings. | Nothing. The check confirmed count integrity. |
| RAT — ranked list helps a student choose and explain a next skill | Yes, reduced from three testers to two before the run | Did not pass: one of two testers gave a list-referential reason under the original wording (or zero under the stricter reading), so the planned 2/2 pass line was missed. | The team changed the tester plan from three to two and recorded the deviation before testing. The failed result found that the ranked list alone does not yet make the reasoning visible; no product change is recorded, so this is an unresolved product follow-up. |
| J1 — tester identifies sample postings without prompting | Yes, as part of the two RAT sessions | Missed the 2/2 plan: 1/2 testers identified the postings as made up or a team-written sample. | Nothing in the implementation changed. The result showed that provenance was not reliably self-evident. |
| J2 — tester finds collection age without prompting | Yes, as part of the two RAT sessions | Missed the 3/3 plan: neither tester found the collection date. | Nothing in the implementation changed. The result showed that the date being present in the code and visible on the page does not mean it is discoverable. |
| JE1 — RAT verdict | Yes | Supported by Aaron and Copilot at 2/2, with 2/2 agreement on 2026-10-29. Neither grader was present for the two sessions; Prince ran both sessions and recorded the notes being graded. JE1 confirms that the retrospective conclusion follows from that record, not that the underlying test evidence is independently verified. | Nothing. The retrospective verdict remained within the RAT evidence and its stated limits. |
| JE2 — Net-hours calculation | Yes | Supported by Aaron and Copilot at 2/2, with 2/2 agreement on 2026-10-29; 0.1 + 1.7 + 4.6 + 4.2 + 3.15 + 2.0 + 1.65 + 5.5 + 1.5 + 0.5 + 1.5 + 2.8 + 3.75 = 32.95. The absolute signed Net figures from DDR-001 through DDR-013 are independently checkable and agree across the graders. | Nothing. The retrospective calculation was confirmed. |
| Ryan Worker latency — final partially resolved | Partially | Warm: 20/20 requests completed under 1.5 s on a GitHub Codespace. Cold: only 5 of the planned 20 requests were measured, none over 1.5 s, and the cold result remained unresolved. The campus-Wi-Fi method was not met. | The team corrected the recorded measurement environment to datacenter/Codespace. No deployment or code change resulted; the cold-start claim remains unresolved because the sample is incomplete. |
| Ryan ranking stability — final unresolved/not run | No | Not run. The deployed set has 28 postings across three roles, with no role at either required size. | The team did not collect a larger role-specific set or change the ranking design. The ADR consequence remains untested rather than confirmed. |
| Prince Tight — resolved, false | Yes | False. The generated app added no login or signup screen. | Nothing in the implementation or specification changed. |
| Prince Loose — resolved, mostly true | Yes | Mostly true. The app generated 89 postings in a seed migration and loaded them through Supabase rather than placing them directly in page code. | The result supported tighter delegation constraints for generated data, but did not change the completed scaffold. |
| Prince Open — resolved, true | Yes | True. The app added 18 direct packages beyond plain HTML, CSS, and JavaScript. | Dependency review became an explicit check of delegated output; the completed scaffold was unchanged. |


---

## 3. Stakes Resolved

### Prince — Phase 1 bolt.new prediction stake

Committed before the bolt.new probe in [context/EVALS.md](../context/EVALS.md):

- **Tight:** bolt.new will add a login, signup, or other authentication screen even though the feature specification never mentions access.
  - **Resolution:** False. The generated app had no login or signup screen and the migration explicitly supported no authentication.
- **Loose:** bolt.new will invent its own sample posting data instead of calling an outside API or reading supplied data.
  - **Resolution:** Mostly true. It generated 89 postings in a seed migration loaded into Supabase rather than placing invented rows directly in page code.
- **Open:** bolt.new will add at least one library or framework beyond plain HTML, CSS, and JavaScript.
  - **Resolution:** True. The generated app used 18 direct packages, including React, Vite, TypeScript, Tailwind, Supabase, and Lucide.

These resolutions did not lead to a different implementation, but they provided evidence against our assumption that the delegated scaffold would stay close to the specified stack and file shape.

### Ryan — Phase 2 ranking-stability stake

**Resolution:** Not run. The prediction required stability measurements at 60 and 120 postings for a single role; the available set has 28 postings across three roles, so neither threshold was reached. The claim is therefore neither confirmed nor contradicted. No Gate consequence was triggered, and the team has not collected the data needed to reopen or narrow its data-risk decision.

### Ryan — Phase 2 latency stake

The original prediction was 20/20 warm requests under 1.5 s on campus Wi-Fi and at least 4/20 cold requests over 1.5 s after 10 idle minutes.

**Resolution:** Partially resolved. From a GitHub Codespace, 20/20 warm requests passed under 1.5 s. Only five cold requests were measured and none exceeded 1.5 s; because the stake required 20 and contemplated at least four slow responses, the cold half remains unresolved. The warm result is also evidence for Worker behavior from a datacenter rather than for the stated campus-Wi-Fi environment. No team decision or implementation followed, because the complete method was not observed.

### Systematic prediction pattern

The team's observable predictions were systematically off in two different directions: we overestimated the certainty of reaching large, controlled samples, and we underestimated delegated tools' tendency to expand a specification beyond its stated stack and data sources. The ranking and cold-start stakes were planned more precisely than the available posting set and stable measurement environment could support, so uncertainty was often recorded as a future result rather than resolved in the test. Conversely, Prince's Phase 1 prediction correctly identified delegated-tool expansion, while the scaffold, frameworks, and generated data it produced showed that “no dependency” and “no invented data” are not sufficient delegation constraints. Retroactively, the team should treat measurable infrastructure thresholds and generated scaffolding as separate risks: require the dataset and runtime method before committing to thresholds, and require a file/dependency diff before accepting delegated output.

---

## 4. Delegation Against Plan

### [Phase 1 RACI and DACI](TEAM.md)

- **AI tools — Responsible; Prince — Accountable:** The Phase 1 RACI planned bolt.new to run the specification probe in `docs/PROBE-001.md`, with Prince accountable. The delegation record for the probe was recorded separately in `docs/DDR-001.md`; that record is currently blank, while `TEAM.md` says Prince actually ran the probe and holds the evidence.
- **AI tools — Responsible; Aaron — Accountable — standards:** The Phase 1 RACI assigned AI responsibility for `context/STANDARDS.md` and `context/TOOLS.md`, while Aaron was the human co-implementer accountable in the relevant row. `docs/DDR-003.md` records Gemini, Copilot, and GPT 5.6 Luna drafting the team standards and agent instructions, with Aaron accountable for conflict resolution and consistency; the resulting standards were reviewed through a pull request.
- **AI tools — Responsible; Ryan — Accountable — Gate:** `docs/DDR-002.md`, authored by Ryan, records Claude drafting the Gate in `context/ARCHITECTURE.md`. Ryan described himself as accountable for the resulting text and for the decisions; Ryan remained accountable for the weights, while the AI drafted wording and reasoning; Prince reviewed and corrected the team-size claim before acceptance.
- **Plan changes:** The Phase 1 DACI selected Job search as Option A. The delegation records do not change that decision: The Gate drafting delegated writing but left the five weight decisions and fifteen score decisions to Ryan (`docs/DDR-002.md`: "I made the five weight decisions and the fifteen score decisions"), and the team named Job search as the selected option. For execution and ownership, `TEAM.md` later records that Nuhamin left the course and that Aaron volunteered for `context/CLAUDE.md`; `docs/DDR-001.md` remained unowned even though Prince held its evidence.

### Net hours delegated

Across `docs/DDR-001.md` through `docs/DDR-013.md`, the logs report **32.95 net hours saved** when their absolute signed Net figures are summed: 0.1 + 1.7 + 4.6 + 4.2 + 3.15 + 2.0 + 1.65 + 5.5 + 1.5 + 0.5 + 1.5 + 2.8 + 3.75 = 32.95. This is the total recorded delegation effort across all DDRs; positive and negative signed Net values are treated as absolute magnitudes in the same way as the original hours calculation.

---

## 5. What we would build differently

*Team section. Drafted by the Specifier so it is not empty; correct or replace
anything here. Three decisions, each tied to a measurement that would have
changed it.*

**1. We would have put the exclusions inside the feature rows from the start.**
X1 to X6 lived in their own section of `FEATURES.md`. The measurement: in HW6,
three of us independently handed one feature's rows to an AI builder, and not
one of those prompts carried the exclusions, because a feature-scoped prompt
never does. One builder stood up a hosted Postgres database and 18 dependencies,
breaking X5 and X6, having never been shown either. We fixed it for F3 in #16
and wrote a note at the top of Exclusions, but only after three separate people
had hit the same wall.

**2. We would have tested the ranking before building it.** The measurement is
the RAT: refuted, 2026-10-22, with both testers naming a skill from the list and
only one giving a reason that came from it. F2 was classified Performance on the
reasoning that "a better ranking is worth more," and its own evidence column
admitted "No interview tested a ranking." We built the ranking anyway and tested
it in the last week of the project. A twenty-minute paper test in Phase 1,
showing someone a ranked list and asking why they would pick one, would have
produced the same finding before any code existed.

**3. We would not have used a frozen synthetic posting set, or we would have
made its age impossible to miss.** Two measurements point at this. J2: neither
tester found the collection date, although F1-4 requires it beside every result,
its code eval passes, and DDR-004 records it on the page. And S2, the
ranking-stability stake, could not be resolved at all, because it needed 60 and
120 postings for a single role and our largest role has 12. A requirement can
pass its eval and still fail its purpose; "present on the page" and "noticed by
a user" are different claims and only one of them was ever checked.

---

## 6. Spec findings

Every EARS change the project forced, with the pull request that made it. This
is the Specification criterion's evidence.

| # | Change | What forced it | PR |
|---|---|---|---|
| 1 | **F3-0** added: take the ranking from F2, do not invent one. **F3-1** tightened to cap at the ten highest ranked and to match as F1-3 requires. **F3-2** settled that exactly half is not fewer than half, and forbade warning styling that appears only below half. F3 marked subject to X5 and X6. | HW6. F3's rows went to bolt.new and Google AI Studio, one prompt each. Neither asked where the ranked skill list comes from; both invented one, and they invented different ones. | [#16](https://github.com/aaronsarasota04/mgt3745-team-gamma/pull/16) |
| 2 | **A note added to the Exclusions section** saying every feature bound by an exclusion should name it in its own rows. | The same run. A feature-scoped prompt never carries the Exclusions section, so a builder given F3 alone was never shown X5 or X6. This finding applied to all four of us, not only to F3. | [#16](https://github.com/aaronsarasota04/mgt3745-team-gamma/pull/16) |
| 3 | **F2-6, F2-7, F2-8** added: counts come from the posting set; a skill is not held unless the student entered it; no count is larger than the total shown. | HW6, Prince's run. Both builders invented posting data and presented it as real. One pre-filled a six-skill profile nobody entered. One displayed "27 of 6 postings (450%)". | [#20](https://github.com/aaronsarasota04/mgt3745-team-gamma/pull/20) |
| 4 | **F7 created** as a new Performance feature with **F7-1 to F7-3**: loading and unavailable states, preset skills that neither duplicate nor overwrite, and a clear-inputs control. | HW6, Aaron's run. These first arrived as F1-11 to F1-13, inside the deployed Must-be feature. Two reviewers raised that adding rows to F1 would make the shipped build non-compliant with its own spec, and they moved to F7 before merge. | [#21](https://github.com/aaronsarasota04/mgt3745-team-gamma/pull/21) |
| 5 | **F7-4** added: a skill entered with a slash counts as each of its parts. | Real-user validation, session 3. A tester entered `Git/GitHub` and `HTML/CSS`; the result still listed Git 11/12 and HTML 5/12 as missing. Reproduced against the deployment. F1-3 covers capitalization and whitespace and says nothing about slashes, so the build does what the row says and the row is too narrow. | this phase |
| 6 | **F2's Kano evidence rewritten.** It read "No interview tested a ranking." | The RAT. One has now, and it refuted the assumption behind the ranking. | this phase |

**The pattern across all six.** Five of the six came from handing the
specification to something that had not been in the room: two AI builders and
three real users. None came from a team member re-reading the file. **Every row
we wrote looked complete to us until someone outside the team tried to satisfy
it.**

**Where the specification was weakest.** Not in what it required, but in what it
assumed everyone already knew. F3 never said where the ranking came from because
we knew. The exclusions sat in a section no feature-scoped prompt carries
because we knew. F1-3 said capitalization and whitespace because the skills *we*
typed were single words. Each gap is invisible from inside the team and obvious
to the first outsider.

**What is still open**, recorded in `FEATURES.md` under "Open against this
specification": a ranked list is not an explanation; nothing requires the
collection date to be *noticed*, only present; and F7 is specified and unbuilt.
