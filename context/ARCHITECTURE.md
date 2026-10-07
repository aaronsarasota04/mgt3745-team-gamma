# ARCHITECTURE.md

Accountable: Ryan Linde (Architect, Phase 1).

## The Gate: Build, Buy, or Delegate

Where the Phase 2 system runs and who writes it, for the problem chosen in
[DACI-001](../docs/DACI-001.md): a graduating CS student cannot tell which tools
and frameworks are worth investing learning time in, because employer
expectations move faster than a curriculum does.

**Weights are committed in this commit. No option has been scored yet.** Scores
arrive in a separate, later commit so the order is visible in the history rather
than asserted afterwards.

### Weights (commit before scores)

| Criterion | Weight (1 to 5) | Why |
|---|---|---|
| Fits the job the student is hiring this tool for | 5 | A tool that lists openings without telling a student what to learn next is a job board, and job boards already exist. If it misses this, nothing else it does matters. |
| Team capability in three weeks | 4 | All five of us deployed a Cloudflare Worker and a D1 database in HW4 and HW5. Three weeks leaves no room to learn a platform none of us has shipped on. |
| Switching cost | 3 | Scored from experience rather than guessed: moving data out of the browser in HW4 cost each of us an evening, and `wrangler d1 export` produced a portable file. We know what this number means now. |
| Control of user data | 4 | The system holds a student's own account of what they do not know yet, and which roles they are targeting. Not regulated data, but the kind a user would not want their current employer to read. |
| Cost | 2 | Free tiers exist for every option under consideration. Cost only becomes real past the course, and nothing here is intended to outlive it. |

**Open against this table.** Criterion 1 needs the job statement IDs from
`USERS.md` once the Specifier commits them, in the form the demo uses
(`J-<name>`). Until those exist the criterion is stated in words; the IDs get
added in the scores commit.

### Scores (1 to 5)

Scored after the weights above were committed and opened for review. The three
options are the course's standard doors, read for this problem:

- **Build** — our own Cloudflare Worker, a D1 database, and a static page, the stack all five of us deployed in HW4 and HW5.
- **Buy** — an existing skills or job-data product: a job board with skill extraction, a learning-path catalogue, or a postings API.
- **Delegate** — bolt.new generates the application from our spec and hosts it.

| Criterion | Weight | Build: Worker, D1, static page | Buy: existing skills or job-data product | Delegate: bolt.new generates and hosts |
|---|---|---|---|---|
| Fits the job the student is hiring this tool for | 5 | 5 | 2 | 4 |
| Team capability in three weeks | 4 | 5 | 3 | 2 |
| Switching cost | 3 | 4 | 2 | 2 |
| Control of user data | 4 | 4 | 2 | 2 |
| Cost | 2 | 5 | 2 | 4 |
| **Weighted total (max 90)** | | **83** | **40** | **50** |

**Notes on the scores.**

- **Buy scores 2 on fit, and that is the whole result.** The nearest products show
  a student openings, or a catalogue of courses. None of them answers the question
  the problem is about: *given what I already know, what should I learn next.* If
  one of them did, this project would not need building.
- **Buy scores 2 on cost, which is unusual for a Buy column.** Job-posting data at
  any useful scale is paid, and LinkedIn's API is effectively closed to student
  projects. The free option is a student reading postings by hand, which is the
  problem rather than a solution to it.
- **Delegate scores 4 on fit and 2 on capability, and both are true at once.** In
  HW5 bolt.new produced a working feature from a specification in minutes. It also
  shipped nineteen dependencies nobody asked for and a hidden instruction file that
  contradicted our standards. We can get a plausible build from it; we could not
  maintain one.
- **Switching cost for Build is 4 rather than 5** because `wrangler d1 export`
  produced a portable file in HW4 and the Worker is one file, but we have only ever
  moved three rows we did not care about. Moving a term's worth of real data is an
  experiment none of us has run.

**On the margin.** Build wins by 33 points out of 90, which is wide enough that a
reviewer should ask whether Buy was scored fairly rather than conveniently. The
honest answer is that Buy loses almost entirely on one criterion, fit, and that
criterion carries the heaviest weight. Drop fit to a weight of 3 and Build still
leads 73 to 36. **The result is not sensitive to that weight; it is sensitive to
whether an off-the-shelf product exists that answers the student's actual
question.** If a reviewer knows one, that is the finding, and it is worth more
than the table.

## ADR-001: <decision>

- **Status:**
### Context
### Options
### Decision
### Consequences
### Revisit Trigger

## Architecture Diagram

```mermaid
flowchart LR
    A["<component>"] --> B["<component>"]
```
