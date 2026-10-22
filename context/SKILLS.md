# SKILLS.md

Accountable: the Implementer. Merged 2026-10-20 from the HW5 versions of Aaron,
Canon, Prince and Ryan, with the conflicts noted at the bottom. Nuhamin's exists
but she has left the course and it was not merged.

Reusable patterns and delegation guidance, written so an agent, or a stranger,
could apply them next time. Each entry under fifteen lines. Load-on-demand: read
the heading first and the body only when it is relevant.

## Pattern: one request helper, so failure has exactly one home

**When:** any call from `public/app.js` to the Worker.
**Do:** route every call through a single `requestJson(path, options)` that
either returns parsed JSON or throws one readable message. Check `response.ok`;
on a non-OK status read the server's own `error` field; catch an unparseable
body separately and say so. Callers put the message on the page with
`textContent`, never `innerHTML`.
**Because:** localStorage never failed; the network does. With one helper,
"show the user what went wrong" is written once instead of at every call site,
and a new caller cannot forget it.
**Watch for:** a shared message that is only true on one path. An early version
said "your entry is still here" on the load path, where nothing had been typed.
Path-specific promises belong in the caller, not in the helper.

## Pattern: tests that clean up after themselves

**When:** any eval that writes to a live database.
**Do:** create rows through one helper that records the returned id, and delete
them in an `after` hook.
**Because:** evals here write to the deployed D1 that the real page reads.
Before the hook existed, a row named `eval-coach-1790717496737` appeared in a
user-facing count, a test changing the thing it was measuring, visible in a
screenshot before anyone noticed.

## Pattern: cover every line, and name the row each test serves

**When:** any new EARS row or any code added to the project. *(Aaron's rule.)*
**Do:** aim at 100% line coverage for JavaScript. Where a line is uncovered,
add the test rather than lowering the bar. Each test names the EARS row it
exercises in its title.
**Because:** building on untested code compounds, and a test whose name is an
EARS row is the only kind a reviewer can trace without asking the author.

## Delegation guidance: what to paste, what to check first

**Paste, in order:** PROJECT, FEATURES (rows marked), STYLE, STANDARDS, TOOLS,
then the current page files. **Instruction line last**, naming the exact files
the tool may touch, because that is what a model weighs most heavily in a long
prompt.
**Check first, in this order:** (1) unzip and read the *file list* before any
code, because that is where the scaffold and the dependencies are; (2) look for
a hidden prompt or config the tool shipped itself; (3) diff against your
originals for what was **removed**, not only added; (4) `innerHTML` and
concatenated SQL; (5) whether it used your tokens; (6) only then run the
feature.

## Delegation guidance: record the model before you start

**When:** any delegation you will have to write up.
**Do:** note the tool, the model it reports, the mode, and the date *before*
prompting, and screenshot the tool's first reply including its plan.
**Because:** a DDR that cannot name the tool that wrote the code is weaker than
one that can, and the cost of avoiding it is five seconds. One DDR in this
course already has a permanent hole because nobody checked at the time and the
session is gone.

## What these tools get reliably wrong

Pooled from four members' error logs. This is the section worth reading before
any delegation.

- **bolt.new ships its whole starter scaffold** and around eighteen
  dependencies after being told to add none, and injects its own vendor meta
  tags into `index.html`. *(Ryan, 2026-09-29; confirmed again 2026-10-20: 20
  files, 18 dependencies, and a hosted Postgres database for three rows of
  arithmetic.)*
- **bolt.new reports success it has not verified.** On 2026-10-20 it wrote
  "Build and typecheck pass. The page is complete and meets every acceptance
  criterion" and listed each row it had satisfied, while its own preview
  rendered a blank white page. The build and typecheck did pass. Completeness
  was not checked. *(Ryan, HW6.)*
- **bolt.new invents a workaround instead of asking** when a file restriction
  conflicts with an EARS row that needs a new endpoint. *(Prince.)*
- **bolt and AI Studio treat a live deployed Worker as freely testable**, making
  real writes to production during generation. *(Prince.)* Point them at a
  throwaway database or no database at all.
- **Copilot drifts off the token file**: three unapproved colours including a
  grey, lighter non-token text colours, one concatenated SQL string, and
  incorrect Worker 400 messaging. *(Aaron.)*
- **bolt and AI Studio style buttons with their own blue** rather than
  `color-primary`. *(Aaron.)*
- **Neither bolt nor AI Studio asks a question**, even when the instruction line
  invites one. Given a spec with a hole in it, both fill the hole silently and
  fill it differently. *(Ryan, HW6: both invented a ranked skill list that the
  spec never defined, and invented different ones.)*

## What they get reliably right

- Both found the marked EARS rows unaided and satisfied the visible ones.
- Both respected an explicit **SHALL NOT** when the rationale was attached to
  it, which was the opposite of what we predicted. *(Ryan, HW6.)*
- AI Studio returns one file with no dependencies and uses `textContent` and
  `createElement` throughout, which happens to satisfy our STANDARDS.md without
  having been shown it.

## How the conflicts were settled

Three of the four HW5 versions shared the same two template entries almost
verbatim, so there was little to reconcile and the merge is mostly a union.

- **The request-helper pattern** appears in all four. Ryan's is the longest and
  the only one with a failure case recorded, so it was kept and the others fold
  into it.
- **The delegation checklist** appears in all four. Ryan's ordering is the only
  one that is ordered, so it was kept.
- **Aaron's coverage rule** and **Ryan's cleanup and record-the-model patterns**
  had no counterpart in anyone else's and were carried over whole.
- **The error logs were pooled rather than chosen between**, because they are
  observations rather than rules and four people's observations are worth more
  than one's. Each line names who saw it.
- **Canon's HW5 version was still the unfilled template**, with `<your entry>`
  as a heading and "fill from your error-analysis log" as a body. Nothing was
  taken from it. Recorded here rather than left as a silent gap.
