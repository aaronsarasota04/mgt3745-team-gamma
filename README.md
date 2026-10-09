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

**Phase 1 decided how the team builds.** The Gate scored Build 83, Buy 40, and
Delegate 50 out of 90, and [ADR-001](context/ARCHITECTURE.md) records the
decision: one Cloudflare Worker serving an API, a D1 database holding the
collected postings and each student's skill list, and a static page that calls
the Worker. No login, because no authenticated user model exists yet and
inventing one in three weeks would cost more than the feature it protects.

**Phase 2 builds the gap endpoint first.** It is the only part that has to be
right for the product to mean anything, and it is the part the Gate's reasoning
rests on.

**Named limitation.** Live job-posting data at any useful scale is paid or
restricted, so the system reads a hand-collected posting set loaded once with
`wrangler d1 execute`. The data is a frozen snapshot and the problem is about
change. ADR-001 carries this under Consequences rather than burying it.

**Resolved on the last day.** ADR-001 carried an open question for two days:
`context/TOOLS.md` described a Google Gemini call that the ADR did not cover. On
2026-10-08 the Implementer confirmed it is real. The system has two parts, and
the second, suggesting three roles from a student's skillset, sends that
skillset to the Google Gemini API. ADR-001 now names that crossing, the diagram
shows Gemini as the only box outside our Cloudflare account, and Build's
control-of-user-data score in the Gate moved from 4 to 3, taking its total from
83 to 79. Build still wins, 79 to 50 to 40, so the decision did not change, only
the honesty of the number behind it.

**Still open.** Nobody has written down which fields of the skillset are sent to
Google, or whether anything identifying the student travels with them. The
crossing is named; its width is not. ADR-001 also still carries a proposed
rather than agreed Approver, and `FEATURES.md` has no feature IDs for the
Consequences to point at.

## See It Work

Phase 2: the deployed URL, and a GIF or screenshots of the build.

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
10. [docs/DDR-001.md](docs/DDR-001.md): the probe delegation
11. Previews: [STYLE.md](context/STYLE.md), [SKILLS.md](context/SKILLS.md), [AGENTS.md](context/AGENTS.md)

## AI Use

| Where | Tool | Role | Record |
|---|---|---|---|
| `context/ARCHITECTURE.md`, the Gate prose | Claude Opus 5 | R; Ryan Linde is A | [docs/DDR-002.md](docs/DDR-002.md) |

The five weight decisions and fifteen score decisions in the Gate were made by
the Architect, not the tool. DDR-002 names the two claims in that file that
could not be verified.

**Disclosure gaps as of this commit.** [docs/DDR-001.md](docs/DDR-001.md) and
[docs/PROBE-001.md](docs/PROBE-001.md) are still template stubs, so the bolt.new
specification probe is not recorded. The `context/TOOLS.md` draft on the
`aaron-phase1` branch also lists bolt.new and GitHub Copilot as having received
project context and prompts, and neither has a DDR. Undisclosed AI use is a
rubric failure, so these are named here rather than left out.
