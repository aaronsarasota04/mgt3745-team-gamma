# TEAM.md

> Replace every line in angle brackets. Each member adds their own roster row through their own pull request: that is your first PR.

## Working Agreement

- **Meetings.** Tuesdays, 5:30 PM to 6:30 PM ET on Teams. Prince keeps time and logs decisions in the Meeting Log. The team checks in daily in the Teams chat and adds a weekend meeting when needed.
- **Channel.** Teams chat for the daily check-in and coordination. Anything that changes an artifact goes in a pull request comment, so the record lives with the file.
- **Response time.** Within 24 hours on weekdays and weekends, unless the member posted earlier that they will be offline.
- **Quiet member clause.** At 48 hours without a response, a teammate pings the member in the Teams chat and sends an email. At 72 hours, the team gives the member's open work to one person or splits it across the team, and records the change in this file with the date. At 96 hours with no response, the team emails the instructor with this clause and the dates.
- **Disagreement.** If a disagreement survives one meeting, it becomes a DACI in `docs/`, and the owner of the affected file is the Driver.
- **Dates.** Oct 5, 5 PM: Initial meeting. Oct 7, 5 PM:  all reviews done and all pull requests merged. Oct 8, noon : links checked and every member has submitted. Hard deadline is Oct 8, 11:59 PM ET.



## Roster

| Name | Role | GitHub | Contact hours (ET) |
|---|---|---|---|
| Ryan Linde | Architect | @ryanlinde-gif | Any day after 4:00 PM |
| Nuhamin | Implementer | @nuhamin22| 5-8pm |
| Aaron   | Implementer | @aaronsarasota4 |Tuesday: noon- midnight .All other days: 8pm- midnight |
| Prince | Specifier | @PrinceMu | Weekdays after 5 PM |


## RACI Matrix (Phase 1)

R = Responsible (does the work), A = Accountable (answers for it; exactly one person, always a person), C = Consulted (asked before), I = Informed (told after). AI tools may be R or C and are never A. Every row where AI is R names the human A beside it.

| Artifact | Specifier | Architect | Implementer | Reviewer | Co-Implementer | AI tools |
|---|---|---|---|---|---|---|
| TEAM.md | A/R | C | C | C | C | |
| docs/DACI-001.md | C | C | A/R | C | C | |
| context/PROJECT.md | A/R | C | C | C | C | |
| context/USERS.md | A/R | C | I | C | I | |
| context/FEATURES.md | A/R | C | C | C | C | |
| context/ARCHITECTURE.md | C | A/R | C | C | C | |
| context/STANDARDS.md, TOOLS.md, CLAUDE.md | I | C | A/R | C | R | |
| context/STANDARDS.md, TOOLS.md | I | C | A/R | C | C | |
| context/CLAUDE.md | C | C | C | C | A/R | |
| .github/CODEOWNERS and branch protection | I | I | A/R | C | R | |
| docs/PROBE-001.md | A/R | I | C | C | C | R: bolt.new runs the probe; Prince is A |
| docs/DDR-001.md | C | I | C | C | A/R | |
| context/EVALS.md (OST, RAT) | C | C | I | A/R | I | |
| context/EVALS.md (Prediction Stakes) | R | R | R | A/R | R | |
| Pull request reviews | R | R | R | A/R | R | |
| README.md | C | A/R | C | C | C | |

Teams of four: delete the Evaluator column.

## Rotation Plan

| Member | Phase 1 | Phase 2 | Final |
|---|---|---|---|
| Aaron | Implementer | Architect | Reviewer |
| Prince | Specifier | Reviewer | Architect |
| Ryan | Architect | Implementer | Specifier |
| Canon | Reviewer | Specifier | Implementer |
| Nuhamin | Implementer | Specifier | Reviewer |


Nobody holds the same role twice, and every role is filled in every phase.

## Meeting Log

| Date | Decision or note | Recorded by |
|---|---|---|
| Oct 5 | Roles assigned. Problem chosen for DACI-001. Aaron drove the decision. | Prince |