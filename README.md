# Team Gamma: Which Skills Employers Actually Want

A graduating computer science student cannot tell which tools and frameworks are
worth their learning time. This repository is the Phase 1 record of how the team
chose that problem, how it decided to build, and what it has not settled yet.

## What

A student enters the skills they already have and the role they are targeting,
and the system shows the gap: the skills that appear most often in postings for
that role and least often in their own list.

## Team

| Member | GitHub | Phase 1 role | Phase 2 role | Final role |
|---|---|---|---|---|
| Aaron Rahim | @aaronsarasota04 | Implementer | Architect | Reviewer |
| Prince | @Daedruoy | Specifier | Reviewer | Architect |
| Ryan Linde | @ryanlinde-gif | Architect | Implementer | Specifier |
| Canon | @cad3nnn | Reviewer | Specifier | Implementer |
| Nuhamin | @nuhamin2234 | Implementer | Specifier | Reviewer |

Nobody holds the same role twice. Working agreement, RACI matrix, and rotation
plan: [TEAM.md](TEAM.md).

## Status

**F1 is deployed and every one of its ten EARS rows is satisfied**, verified
against the live build rather than the source. Row-by-row evidence, including
which checks were run and what they returned, is in
[docs/DDR-004.md](docs/DDR-004.md).

| Feature | Class | State |
|---|---|---|
| F1 Skill gap for a target role | **Must-be** | **Deployed.** 10 of 10 EARS rows satisfied |
| F2 Ranked gaps | Performance | Partly. The API orders missing skills by count, highest first, with ties alphabetical (F2-1, F2-4). F2-2, F2-3 and F2-5 are not built |
| F3 Share of top skills held | Performance | Not built |
| F4 Where else to look | Performance | Not built |
| F5, F6 | Attractive | Out of Phase 2 by X1 and X2 |

The Phase 2 brief asks for every Must-be feature working on Workers and D1.
**That is F1, and F1 is done.** The Performance features are welcome once the
Must-be features pass their evals, and they are named here as not built rather
than left ambiguous.

**Code evals are the Reviewer's artifact** and the plan for them is in
[context/EVALS.md](context/EVALS.md): eleven checks mapped to the EARS rows they
test, plus two judgment evals and the RAT. Four of them were run by hand against
the deployment while reviewing that plan, and all four pass: no database key or
binding appears in any browser file, missing skills come back ordered by count,
equal counts are alphabetical, and no count exceeds the total shown beside it.

**Phase 1 decided how the team builds.** The Gate scored Build 79, Buy 40 and
Delegate 50 out of 90, and [ADR-001](context/ARCHITECTURE.md) committed the team
to one Cloudflare Worker, a D1 database, and a static page with no framework and
no build step. The deployed build is that stack: `worker.js` is one file,
`public/` is three, and there are no dependencies and no build step.

**Named limitation, unchanged.** Live posting data at any useful scale is paid
or restricted, so the system reads a hand-collected set loaded once with
`wrangler d1 execute`. **28 synthetic postings across three roles, collected
2026-10-20.** No real posting, employer or person appears anywhere in this
repository, and F1-4 puts that collection date beside every result so nobody
reads a frozen snapshot as current.

**Still open.** `student_skills` exists in the D1 schema because ADR-001 names
it, and F1 never writes to it because ADR-001 also decided there is no login.
That question is with the Architect. Nobody has yet written down which fields of
a skillset would cross to Google if the Gemini feature is built, and
`docs/DDR-001.md` is still an empty stub with no owner after a roster change.

## See It Work

**Deployed: https://mgt3745-team-gamma.ryanlindebusiness.workers.dev**

![F1 running, showing the skill gap for Data Analyst](docs/img/f1-deployed.png)

F1, the only Must-be feature, on a Cloudflare Worker with D1 as ADR-001 decided.
The student enters the skills they already have, picks a role from the three the
posting set contains, and sees the skills those postings name that are missing
from their list, with how many postings name each one.

The amber line is F1-4 doing its job: a gap is never shown without the date the
posting set was collected and a statement that the set does not update.

Try these, in this order, to see the three rows that are refusals rather than
features:

| Do this | What should happen | Row |
|---|---|---|
| Submit with the skills box empty | "Enter at least one skill you already have." No result. | F1-5 |
| Enter `sql` and `  EXCEL  `, pick Data Analyst | Same answer as `SQL` and `Excel`. Case and padding change nothing. | F1-3 |
| Pick IT Support Specialist, enter all six of its skills | "No gap found", a sentence rather than an empty list | F1-7 |

## Links, in Reading Order

1. [TEAM.md](TEAM.md): who owns what
2. [docs/DACI-001.md](docs/DACI-001.md): why this problem
3. [context/PROJECT.md](context/PROJECT.md): the problem, reframed
4. [context/USERS.md](context/USERS.md): users and their jobs
5. [context/FEATURES.md](context/FEATURES.md): Kano and EARS
6. [docs/PROBE-001.md](docs/PROBE-001.md): what bolt.new had to guess
7. [context/ARCHITECTURE.md](context/ARCHITECTURE.md): the Gate, ADR-001, the diagram
8. [context/EVALS.md](context/EVALS.md): the tree, the RAT, every member's stake
9. [context/CLAUDE.md](context/CLAUDE.md), [context/STANDARDS.md](context/STANDARDS.md), [context/TOOLS.md](context/TOOLS.md): how we work
10. [docs/DDR-001.md](docs/DDR-001.md): the probe delegation (still a stub)
11. [docs/DDR-004.md](docs/DDR-004.md): the F1 build, row by row against the deployment
12. [docs/DACI-001.md](docs/DACI-001.md), [docs/PROBE-001.md](docs/PROBE-001.md), [docs/DDR-002.md](docs/DDR-002.md), [docs/DDR-003.md](docs/DDR-003.md)
13. The build itself: [worker.js](worker.js), [schema.sql](schema.sql), [seed.sql](seed.sql), [public/](public/)
14. [context/STYLE.md](context/STYLE.md) and [context/SKILLS.md](context/SKILLS.md): merged from the members' HW5 versions, conflicts noted

## AI Use

| Where | Tool | Role | Record |
|---|---|---|---|
| `context/ARCHITECTURE.md`, the Gate prose | Claude Opus 5 | R; Ryan Linde is A | [docs/DDR-002.md](docs/DDR-002.md) |
| The F1 build: Worker, D1 schema, seed, pages | Claude Opus 5 | R; Ryan Linde is A | [docs/DDR-004.md](docs/DDR-004.md) |
| `context/STANDARDS.md` and `context/CLAUDE.md` | Gemini | R; Aaron Rahim is A | [docs/DDR-003.md](docs/DDR-003.md) |

The five weight decisions and fifteen score decisions in the Gate were made by
the Architect, not the tool. DDR-002 names the two claims in that file that
could not be verified.

**Disclosure gaps as of this commit.** [docs/DDR-001.md](docs/DDR-001.md) and
[docs/PROBE-001.md](docs/PROBE-001.md) are still template stubs, so the bolt.new
specification probe is not recorded. The `context/TOOLS.md` draft on the
`aaron-phase1` branch also lists bolt.new and GitHub Copilot as having received
project context and prompts, and neither has a DDR. Undisclosed AI use is a
rubric failure, so these are named here rather than left out.
