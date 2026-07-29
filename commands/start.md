---
description: "Start here — begins a new project, or picks up an existing one exactly where it stopped"
argument-hint: "[path to an existing PRD, if you have one]"
---

# /gantry:start — entry point

The only command most projects ever need. It works out what state this folder is in, enters the lifecycle at the right place, and then runs continuously per `${CLAUDE_PLUGIN_ROOT}/process/lifecycle.md` §Continuous execution — stopping only for questions and gates.

Read first: `${CLAUDE_PLUGIN_ROOT}/process/lifecycle.md`.

## Dispatch

Work out the state from files — never by asking. Gate approvals are recorded in `DECISIONS.md`; work state is in `TASK.md`, reconciled against git history. Check in this order and take the first match:

| State on disk | Enter at | Follow |
|---|---|---|
| No kernel, no PRD (empty folder, or only input docs) | S-PRD | `commands/prd.md` with $ARGUMENTS |
| PRD at the canonical path, no kernel (`PLANNING.md` absent) | S0 | `commands/init.md` |
| Kernel exists, no G1 approval in `DECISIONS.md` | S1 | `commands/review-prd.md` |
| G1 approved, no `docs/adr/ADR-001-stack.md` marked Accepted | S2 | `commands/stack.md` |
| ADR-001 accepted, no `BUILD-PLAN.md` | S3 | `commands/plan.md` |
| `BUILD-PLAN.md` exists with incomplete phases | S4 | `commands/run.md` |
| All phases complete, G3 approved | S6 | `commands/harvest.md` |

Announce what you found and where you are entering **in one line**, then go. Do not present the owner with a menu of stages.

## Rules

- **This is a dispatcher.** It adds no behaviour of its own; the stage command it hands to is authoritative.
- **Never restart a completed stage.** Re-entering a stage is always a diff-update, never an overwrite — the stage commands already guarantee this.
- **Ambiguous evidence is not a reason to stop.** A half-written kernel, or a `TASK.md` that disagrees with git history: say what you found, state the stage you are entering and why, and continue. The owner can redirect you if you chose wrong — that costs a sentence, whereas stopping costs the run.
- `$ARGUMENTS`, if given, is the path to an existing PRD and is only meaningful in the S-PRD case. If the project is already under way, mention that you ignored it rather than silently dropping it.
