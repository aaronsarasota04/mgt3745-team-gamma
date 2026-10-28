# Prince Muteteke: Individual Retrospective

## My role in each phase

- **Phase 1, Specifier.** I was accountable for PROJECT.md, USERS.md, FEATURES.md, and TEAM.md, and I ran the bolt.new probe ([PROBE-001](../PROBE-001.md), [DDR-001](../DDR-001.md)). The three user profiles merge three members' HW2 research. Only Aaron's research was about our problem, so the other two profiles are marked as borrowed patterns. I reviewed Aaron's pull request #9.
- **Phase 2, Reviewer and Evaluator.** I was accountable for the eleven node:test evals ([evals/worker.test.js](../../evals/worker.test.js)), the opportunity tree, the RAT, the stake resolutions, and the README. I ran the two RAT sessions and the latency measurements myself. I reviewed Ryan's four pull requests, #16 to #19, and wrote the comments myself.
- **Phase 3, Architect.** I wrote the Final rotation for TEAM.md and CLAUDE.md, wrote DDR-001, rewrote [ARCHITECTURE.md](../../context/ARCHITECTURE.md) as the final version, wrote [DEPLOY.md](../DEPLOY.md), and reviewed pull requests 32 and 33.

## One decision I would change

I ran Ryan's latency stake as one run of about three and a half hours in a GitHub Codespace, without checking how long a Codespace stays alive. The first run began at 5:03 PM ET on 2026-10-21, and its last row is cold request 6 at 6:03 PM ET ([evals/latency-results-run1.csv](../../evals/latency-results-run1.csv)). I restarted the same design at 10:48 PM, and its last row is cold request 5 at 11:38 PM ET ([evals/latency-results.csv](../../evals/latency-results.csv)). The runs lasted 60 and 50 minutes. The stake resolved on the final run's 5 cold requests, with the first run's 6 reported beside it and not pooled. None of the 11 cold requests was slow and none failed, and both runs came from a datacenter and not the campus Wi-Fi the stake named. The first run's timestamps were the measurement that should have changed my plan. I should have piloted one hour, then split the cold requests across sessions or moved them off the Codespace. I recorded each interruption in EVALS.md before restarting, which kept the result honest, but it did not make it complete.

## The artifact I am proudest of

[PROBE-001](../PROBE-001.md). A builder's guesses became spec rows, and the rows became tested behavior. Its fourth finding was that bolt.new opened every table to writes. That became F1-9, Ryan's Worker returns 405 on POST, PUT, PATCH, and DELETE, and my E8 test checks it on the deployed URL. Its first finding became F1-8 and E7. I enjoyed seeing how bolt.new could run with an idea and generate it in such a short time, and that speed is what made its guesses worth reading.

## My delegation record

| Tool | Where | What for | How I checked it | Record |
|---|---|---|---|---|
| bolt.new | Phase 1 probe | Finding what the spec left open | Read the file list, package.json, and migration, and compared the running app with each EARS row | [DDR-001](../DDR-001.md) |
| Claude | All three phases | Drafts of my Phase 1 files, the Phase 2 evals, tester script, latency script, and README, and the Phase 3 rotation, ARCHITECTURE.md, DEPLOY.md, and this retrospective's structure | Ran npm test, compared drafts with the repo and my terminal output, and checked claims against the pages and files | [DDR-006](../DDR-006.md) and [DDR-010](../DDR-010.md) |
| bolt.new and Google AI Studio | HW6, in my own repository | Building F2 from one shared prompt, to compare them | Row by row against the EARS rows, plus a shared test | DDR-001, DDR-002, and DDR-003 (for Claude) in [my HW6 repository](https://github.com/Daedruoy/mgt3745-hw6) |

Claude made two errors that I caught against the evidence: it misread a line count from `wc -l`, which includes the header, and it said a measurement came from a laptop when my terminal path showed a Codespace. I wrote my review comments myself, and the RACI gives AI no role on reviews.

Claude also drafted my Phase 1 files. No DDR in this repository records that, although CLAUDE.md's DDR rule requires one, so I am noting the gap here.