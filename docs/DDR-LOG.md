# Delegation Decision Record Log

This log inventories delegation records through Phase 3. It links numbered
DDR files and also identifies other tools that contributed to integration,
recording, and retrospective work.

## Numbered DDR records

| DDR | Phase | Tool(s) | Work delegated | Human accountability |
|---|---|---|---|---|
| [DDR-001](DDR-001.md) | 1 | bolt.new | Specification probe for `FEATURES.md` and live-app screenshots | Prince Muteteke |
| [DDR-002](DDR-002.md) | 1 | Claude Opus 5 | Gate prose in `context/ARCHITECTURE.md` | Ryan Linde |
| [DDR-003](DDR-003.md) | 1 | Gemini 3.6 Flash, GitHub Copilot, GPT-5.6 Luna | Team `STANDARDS.md` and `CLAUDE.md` drafting and review | Aaron Rahim |
| [DDR-004](DDR-004.md) | 2 | Claude Opus 5 | Worker, D1 schema and seed, static page, and Phase 2 delegation record | Ryan Linde |
| [DDR-005](DDR-005.md) | 2 | GitHub Copilot, GPT-6 Luna | ADR-002 draft | Aaron Rahim |
| [DDR-006](DDR-006.md) | 2 | Claude Sonnet 5.5 | Code evals, `EVALS.md`, RAT design, latency scripts, and README use | Prince Muteteke |
| [DDR-007](DDR-007.md) | 2 | GitHub Copilot, GPT-6 Luna | ADR-002 architecture diagram update | Aaron Rahim |
| [DDR-008](DDR-008.md) | 3 | GitHub Copilot, GPT-6 Luna | Evals-against-plan and stakes-resolved retrospective sections | Aaron Rahim |
| [DDR-009](DDR-009.md) | 3 | GitHub Copilot, GPT-6 Luna | Delegation-against-plan comparison and delegated-hours reconciliation | Aaron Rahim |
| [DDR-010](DDR-010.md) | 3 | Claude Sonnet 5.5 | Phase 3 rotation and governance edits, architecture-final text, DDR-001 completion, and deployment instructions | Prince Muteteke |
| [DDR-011](DDR-011.md) | 3 | GitHub Copilot, GPT-6 Luna | EVALS.md and RETRO.md consistency, final stake summaries, and judgment evaluations | Aaron Rahim |
| [DDR-012](DDR-012.md) | 3 | Claude Opus 5 | Specifier Phase 3 artifacts and Ryan's individual retrospective | Ryan Linde |
| [DDR-013](DDR-013.md) | 3 | Mai 1.1 Flash, GitHub Copilot | Aaron's individual retrospective and all-DDR net-hours reconciliation | Aaron Rahim |

## Phase 3 integration, recording, and retrospective tools

| Tool or resource | Use | DDR coverage |
|---|---|---|
| GitHub pull requests and merge workflow | Integrated delegation results, review corrections, and final Phase 3 changes | Referenced by DDRs 001–013 and pull-request history |
| GitHub Copilot / GPT-6 Luna | Integrated and checked retrospective sections, ADR-002 diagram changes, judgment evaluations, and final documentation | DDR-007, DDR-008, DDR-009, DDR-011, and DDR-013 |
| Claude Opus 5 / Sonnet 5.5 | Produced and revised Phase 3 architecture, specification, and retrospective documentation | DDR-010 and DDR-012 |
| Mai 1.1 Flash | Drafted Aaron's individual retrospective and reconciled delegated-hours totals | DDR-013 |
| bolt.new and Google AI Studio | Built alternate F3 implementations during HW6, which supplied spec-validation findings later incorporated into the team retrospective | Recorded in Ryan's individual retrospective and repository spec findings; no separate repository DDR is assigned in this branch |
| GitHub Codespaces and `npm test` | Ran the deployed code evaluations used in the retrospective | DDR-006 and DDR-008 |

The repository does not currently identify a separate recording software tool
for the required final presentation. If the recording was produced with a
named tool, add that tool and its human accountable owner here; no recording
tool is inferred from the current repository evidence. As of Phase 3, The Implementer (Canon) is responsible for the recording.
