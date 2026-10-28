# Phase 1–2 Retrospective (Draft)

## Evals Against Plan

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
| S1 — Worker latency | Partially | Warm: 20/20 requests completed under 1.5 s on a GitHub Codespace. Cold: only 5 of the planned 20 requests were measured, none over 1.5 s, and the cold result remained unresolved. The campus-Wi-Fi method was not met. | The team corrected the recorded measurement environment to datacenter/Codespace. No deployment or code change resulted; the cold-start claim remains unresolved because the sample is incomplete. |
| S2 — ranking stability at 60 and 120 postings | No | Not run. The deployed set has 28 postings across three roles, with no role at either required size. | The team did not collect a larger role-specific set or change the ranking design. The ADR consequence remains untested rather than confirmed. |

## Stakes Resolved

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
