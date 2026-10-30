# Individual Retrospective — Ryan Linde

## My role in each phase

**Phase 1, Architect.** I owned `context/ARCHITECTURE.md`: the Gate rerun for
the team problem, ADR-001 with its crossing named, and the Mermaid diagram. I
also wrote `docs/DDR-002.md` after Aaron asked, in review, whether AI had
written the Gate prose. It had, and I said so.

**Phase 2, Implementer.** I built and deployed the only Must-be feature: the
Worker, the D1 schema and synthetic seed, and the static page, at
https://mgt3745-team-gamma.ryanlindebusiness.workers.dev. I merged the team
`STYLE.md` and `SKILLS.md` from everyone's HW5 versions, rotated `CODEOWNERS`
and `TEAM.md`, and removed `student_skills` from the schema and the live
database once ADR-002 decided it.

**Phase 3, Specifier.** `FEATURES.md` final state, and the RAT verdict and
spec-findings sections of `docs/RETRO.md`.

## One decision I would make differently

**I scored "control of user data" as 4 for Build in the Gate without reading
`TOOLS.md` first.**

The evidence that would have changed it already existed when I scored. Aaron's
`TOOLS.md` carried a Google Gemini row saying the Worker sends a student's
skillset to Google. I scored from ADR-001's own description of the system,
which did not mention Gemini, and I gave Build a 4 partly because nothing left
our Cloudflare account. That reasoning was wrong at the moment I wrote it.

What I did about it is the part I would keep: I recorded the contradiction in
the ADR as an open question rather than guessing, asked three times over two
days, and when Aaron confirmed Gemini was real I moved the score from 4 to 3,
took the total from 83 to 79, and wrote the reasoning under the table instead
of editing the number quietly. Build still won, so the decision held and only
the honesty of the number changed.

What I would do differently is cheaper than any of that: **read the other
role's file before scoring a criterion that depends on it.** It would have
taken five minutes in Phase 1 and saved a revision in Phase 2.

## The artifact I am proudest of

**[docs/DDR-004.md](../DDR-004.md)**, the delegation record for the F1 build.

Not for the build, which is three files and some SQL. For the structure: it
separates what I verified by *reading the code* from what I verified by
*running the deployed build*, and it says plainly that at the time of the first
commit nothing had been run.

That split exists because of HW6. I gave the same feature to bolt.new and
Google AI Studio, and bolt reported "Build and typecheck pass. The page is
complete and meets every acceptance criterion" while its own preview rendered a
blank white page. Both halves were defensible; the build and the typecheck did
pass. What outran the evidence was *completeness*.

I did not want to write the same sentence about my own work, so DDR-004 says
what each claim rests on, and the deployment section was written only after
`npm test` ran against the live Worker.

## My delegation record

| Tool | What it did | How I verified it |
|---|---|---|
| **Claude Opus 5** | Drafted the Gate prose in `ARCHITECTURE.md` ([DDR-002](../DDR-002.md)); the F1 Worker, schema, seed and pages ([DDR-004](../DDR-004.md)); the STYLE and SKILLS merges; and these retrospective sections | Every EARS row traced to the line that satisfies it, then re-checked against the deployed build. The code eval suite runs against the live Worker. For the STYLE merge I computed the WCAG contrast of all four members' palettes rather than taking a recommendation |
| **bolt.new** | HW6: built F3 from the team's EARS rows, one prompt | Row by row against the rows, plus a shared `node:test` both builders faced. Found it had shipped a live Supabase key in `.env`, which I removed before committing, and recorded the removal |
| **Google AI Studio** | HW6: built F3 from the identical prompt | The same test found a defect its own build could not show: it never caps the ranked list at ten, invisible because every role it invented has ten or fewer skills |

**What I decided rather than delegated:** the five Gate weights and fifteen Gate
scores; which feature to build and what the synthetic posting set should contain;
that `student_skills` should be raised with the Architect rather than quietly
deleted or quietly backed with a login; that the compound-skill finding belonged
in F7 rather than F1, because adding a row to a deployed Must-be feature breaks
its compliance, which is the argument I had used on a teammate's PR a week
earlier and had to apply to myself.

**Where I was wrong.** In HW6 I predicted both builders would violate the F3-2
prohibition, because a tool trained to look impressive would add a verdict.
Both wrote a comment naming the row and handed the decision back to the student.
The number was wrong and so was the reasoning: an explicit SHALL NOT with its
rationale attached is a requirement these tools take seriously. What they do not
take seriously is anything the spec leaves unsaid.
