# PROBE-001: bolt.new Specification Probe

| | |
|---|---|
| Date | 2026-10-08 |
| Accountable | Prince (Specifier) |
| Responsible | bolt.new (one prompt, no follow-ups) |
| Input | context/FEATURES.md as of commit Add Features.md , pasted in full, nothing else |
| Delegation record | docs/DDR-001.md |
| Code kept | None. No generated code is in this repository. |

## Prompt

"Build a web app that implements this specification exactly." followed by the full text of FEATURES.md.

The run also carried a hidden instruction file, .bolt/prompt, which asks for beautiful, fully featured, production-worthy pages built with Tailwind and Lucide icons. The result measures the spec plus that file.

## What bolt Had to Guess

Every item below is something the build did that FEATURES.md did not state.

| # | What bolt assumed | Why it had to guess | Change to FEATURES.md |
|---|---|---|---|
| 1 | Supabase (hosted Postgres, migrations, a .env file) as the backend | The spec never says where data lives | F1-8 and exclusion X5 |
| 2 | 89 generated postings from 15 company names, labeled "hand-collected," with a collection date of 2025-09-15 | X1 calls for a hand-collected posting set, but the spec supplies none | F1-10 |
| 3 | Seven fixed roles in a dropdown | F1-1 says "one target role" with no list | F1-1 reworded |
| 4 | Insert, update, and delete open to anyone holding the public key, on every table | The spec excludes accounts but never says the data is read-only | F1-9 |
| 5 | A React, Vite, TypeScript, and Tailwind build with 18 direct packages, from bolt's own template (bolt-vite-react-ts) | The spec names no stack | Exclusion X6 |
| 6 | A percentage and progress bar for the top-10 count, and a demand bar on every skill row | F3-1 asks for a count, nothing more | None. Noted as something bolt adds unasked. |

## What bolt Got Right Without Guessing

Sorting and counts (F2-1 to F2-4) appeared as written. I recomputed the Product Manager counts from the seed, and all eight visible rows match. Tied counts showed in alphabetical order. The first-gap marker (F2-3), the top-10 count (F3-1), the collection date next to results (F1-4), case-insensitive matching (F1-3, tested with "DoCker" for DevOps Engineer), and the empty-skills message (F1-5) also appeared. The note that the decision to apply stays with the student (F3-2) and the no-contact footer (X3, X4) came through too. bolt copied the recruiter wording from the Kano evidence into the screen, so rationale text in the spec shows up as product copy.

## What bolt Did Not Follow or Could Not Show

F1-6, F2-5, and F3-3 cannot trigger with bolt's data. The role dropdown only lists roles that have postings, every role has at least 11 postings, and every role has at least 10 distinct skills. bolt's seed comment says "100+" postings, and the seed holds 89.


## Reading

Six findings. Five were gaps in the spec and one was bolt's taste. The spec said "hand-collected posting set" without supplying one, so bolt generated postings and kept the label. And the spec never said who may change the data, so bolt left every table open to writes. Rows that stated a visible behavior with a number or a condition came through intact. Rows about where data comes from and who may change it were silent, and bolt chose for us.