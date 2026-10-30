# FEATURES.md

## Kano Classification

| ID | Feature | Class | Evidence and reasoning |
|---|---|---|---|
| F1 | Show the skills a student is missing for a target role | Must-be | Without it the tool answers nothing. J-Devon. Aaron's recruiter said students rule themselves out by reading a job description as a checklist, and the gap view is the check they lack. |
| F2 | Rank missing skills by how many postings list them | Performance | A better ranking is worth more, and it gives the one gap worth closing first. J-Devon. **The RAT tested the ranking on 2026-10-22 and refuted the assumption behind it**: both testers named a skill from the top five, but only one gave a reason that referred to the list at all. The ranking is used; it is not yet what persuades. See EVALS.md and docs/RETRO.md. |
| F3 | Show how many of the top-ranked skills the student already has | Performance | Helps the decision to apply. Aaron's recruiter said a description describes the employer's preferred candidate, not a strict checklist. We assume a count helps, and no interview tested it. |
| F4 | List source types beyond the major job boards | Performance | J-Devon, second job statement. Aaron's recruiter said not all jobs are posted on LinkedIn and alumni one to three years ahead can help a lot. More role-specific sources are more useful. |
| F5 | Surface deadlines for a student who checks once a day | Attractive | J-Maya. Prince's chapter research found the one-window habit in a commuting member. Nobody tested it with job boards. It needs live postings, so it is out of Phase 2. |
| F6 | Track outreach and follow-up | Attractive | J-Jordan. Ryan's athletic research found students lose track of whom to follow up with. Nobody tested it with job search. It needs a saved student record, so it is out of Phase 2. |
| F7 | Improve the skill-gap workflow | Performance | Proposed future improvements from the HW6 spec gap, not requirements for the shipped F1 feature; see [issue #29](https://github.com/aaronsarasota04/mgt3745-team-gamma/issues/29). |

Claude drafted this table. Prince checked each classification against the research (a C row in TEAM.md). Only Aaron's interviews were about this problem, so F5 and F6 rest on patterns from other research and say so.

## EARS Acceptance Criteria

### F1. Skill Gap for a Target Role (J-Devon)

- F1-1. THE SYSTEM SHALL let a student enter the skills they already have and choose one target role from the roles in the posting set. (PROBE-001 #3)
- F1-2. WHEN a student submits skills and a target role, THE SYSTEM SHALL list the skills that appear in postings for that role and are missing from the student's list.
- F1-3. THE SYSTEM SHALL match skills without regard to capitalization or extra spaces.
- F1-4. THE SYSTEM SHALL show the date the posting set was collected next to every result, so a student does not read a frozen snapshot as current.
- F1-5. IF the student enters no skills, THEN THE SYSTEM SHALL ask for at least one skill and SHALL NOT show a result.
- F1-6. IF the target role has no postings in the data set, THEN THE SYSTEM SHALL say so, naming the role, and SHALL NOT show a gap.
- F1-7. IF the student already has every skill in the postings for the role, THEN THE SYSTEM SHALL say no gap was found instead of showing an empty list.
- F1-8. THE SYSTEM SHALL read postings only through the team's own API, and SHALL NOT hold a database key in browser code. (PROBE-001 #1)
- F1-9. IF a request from the browser tries to add, change, or delete a posting, THEN THE SYSTEM SHALL refuse it. (PROBE-001 #4)
- F1-10. THE SYSTEM SHALL show only postings and a collection date that the team supplied, and SHALL NOT generate either. (PROBE-001 #2)

### F2. Ranked Gaps (J-Devon)

- F2-1. THE SYSTEM SHALL order the missing skills by the number of postings for the role that list each one, highest first.
- F2-2. THE SYSTEM SHALL show the posting count beside each skill and the total postings for the role.
- F2-3. WHEN results are shown, THE SYSTEM SHALL mark the top-ranked missing skill as the first gap to close.
- F2-4. IF two skills have the same count, THEN THE SYSTEM SHALL order them alphabetically, so the order does not change between page loads.
- F2-5. IF the role has fewer than 10 postings, THEN THE SYSTEM SHALL say the sample is small next to the ranking.
- F2-6. THE SYSTEM SHALL compute each skill's count from the postings in the posting set. (Issue #15)
- F2-7. THE SYSTEM SHALL NOT treat a skill as held unless the student entered it. (Issue #15)
- F2-8. THE SYSTEM SHALL NOT show a count larger than the total postings shown beside it. (Issue #15)

### F3. Share of Top Skills Held (J-Devon)

Subject to exclusions X5 and X6.

- F3-0. THE SYSTEM SHALL take the ranked skill list for the role from F2, and SHALL NOT generate, seed, or invent ranked skills of its own.
- F3-1. THE SYSTEM SHALL show how many of the 10 top-ranked skills for the role the student already has, counting against the ten highest-ranked skills and ignoring any skill ranked below tenth, and matching skills as F1-3 requires, without regard to capitalization or extra spaces.
- F3-2. IF the student has fewer than half of the top-ranked skills, where exactly half is not fewer than half, THEN THE SYSTEM SHALL still show the gap and SHALL NOT tell the student whether to apply, because the decision stays with the student. THE SYSTEM SHALL NOT apply warning or error styling to this state that it does not also apply at or above half, because styling that appears only when the student has done badly is a verdict with the words removed.
- F3-3. IF the role has fewer than 10 ranked skills, THEN THE SYSTEM SHALL count against the skills it has and show the total used.

### F4. Where Else to Look (J-Devon)

- F4-1. THE SYSTEM SHALL show a short list of source types to search beyond the major job boards: company career pages, university career services, alumni one to three years ahead, and smaller companies.
- F4-2. THE SYSTEM SHALL describe each source type in one line and SHALL NOT name or link a specific person.
- F4-3. IF the sources list fails to load, THEN THE SYSTEM SHALL still show the gap result and say the sources list is unavailable.

### F7. Improved Skill-Gap Workflow (J-Devon)

Performance class. Specified and not built. These rows improve the skill-gap
flow rather than define it, so they live here rather than inside F1: adding a
row to a deployed Must-be feature makes that feature non-compliant, which is
the argument the team used when F7-1 to F7-3 moved out of F1 in #21. F7-4
follows the same rule.

- F7-1. IF the dataset is loading, THEN THE SYSTEM SHALL show a loading status. WHEN the dataset loads successfully, THE SYSTEM SHALL show its supplied collection date. IF loading fails, THEN THE SYSTEM SHALL show an unavailable status. (Issue #29)
- F7-2. THE SYSTEM SHALL provide common entry-level skills as addable presets. WHEN a student adds a preset, THE SYSTEM SHALL preserve the student's existing skills and SHALL NOT add a skill already present, regardless of capitalization or extra spaces. (Issue #29)
- F7-3. WHEN the student chooses Clear Inputs, THE SYSTEM SHALL clear the student's entered skills and target role and reset the displayed results and related interface states. (Issue #29)
- F7-4. WHERE a student enters a skill containing a slash, THE SYSTEM SHALL treat each part as a separate skill. (VALIDATION.md session 3)

## Exclusions

These are decisions, recorded so nobody builds them by accident.

**Read this before delegating a feature.** In HW6 I gave one feature's EARS
rows to two AI builders. Neither prompt carried this section, because a
feature-scoped prompt never does. One builder stood up a hosted Postgres
database and shipped eighteen dependencies, breaking X5 and X6, and it cannot
be blamed for breaking rules it was never shown. **Every feature that is bound
by an exclusion should name it in the feature's own rows**, as F3 now does.
Evidence: https://github.com/ryanlinde-gif/mgt3745-hw6

- **X1. No live posting data (F5).** The system reads a hand-collected posting set loaded once. Deadline alerts need live data.
- **X2. No student accounts and no saved records (F6).** ADR-001 has no login. Outreach tracking needs a saved record.
- **X3. No contact with employers, recruiters, or alumni.** The system never sends a message to anyone.
- **X4. No applications through the system.** It shows evidence and the student decides.
- **X5. No third-party backend or hosted database in Phase 2.** Data lives where ADR-001 puts it. (PROBE-001 #1)
- **X6. No front-end framework and no build step.** The page is plain HTML, CSS, and JavaScript, as STANDARDS.md requires. (PROBE-001 #5)

## AI use

Claude Opus 5 drafted parts of this file's Phase 3 additions: the F7-4 row, the
rewritten F2 evidence, and the section below. The judgments behind them are
mine, and the record is [docs/DDR-012.md](../docs/DDR-012.md).

## Open against this specification

Recorded by the Specifier at the end of Phase 3, as findings rather than rows,
because each needs evidence this project did not gather.

**1. A ranked list is not an explanation.** The RAT asked whether a student who
sees the ranked gap can name their next skill and say why. Both testers named a
skill from the top five and only one gave a reason that referred to the list.
Every row in F1 and F2 describes *what to show*. Nothing in this file requires
the system to say **why** a skill is ranked where it is. That is the gap the RAT
found, and closing it is a feature nobody has specified yet, not a fix to an
existing row.

**2. Nothing requires the collection date to be noticed.** F1-4 requires the
date beside every result, the code eval for it passes, and DDR-004 records it on
the page. Neither tester found it when asked (J2: 0 of 2). A row can be
satisfied and still fail its purpose, and this file has no vocabulary for that
difference.

**3. F7 is specified and unbuilt.** F7-1 to F7-3 are proper EARS rows with no
implementation. They are Performance class and Phase 2's brief only required the
Must-be features, so this is a scope decision rather than a miss. Naming it here
so a reader does not assume the whole file is deployed.
