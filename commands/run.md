---
description: "S4 — execute the BUILD-PLAN autonomously, phase by phase, stopping only at declared gates. Re-runnable/resumable."
argument-hint: "[phase number to resume from, optional]"
---

# /gantry:run — S4 Autonomous Execution

You are the orchestrator, and **you do no implementation work yourself** — read `${CLAUDE_PLUGIN_ROOT}/process/agent-routing.md` §The orchestrator does no work of its own before anything else. Your context has to survive the whole build; every file you open is a delegation you skipped. Execute `BUILD-PLAN.md` phases in order — from $ARGUMENTS if given, else from the first incomplete phase per `TASK.md` state.

Read at session start, and nothing more: `CLAUDE.md`, `PLANNING.md`, `TASK.md`, and the current phase's section of `BUILD-PLAN.md`. **Do not** load the PRD, the PRPs, or any source file — name them in briefs and let the agents read them.

## Per phase (BUILD-PLAN §1 is authoritative) — each step is a delegation

1. **Brief an agent to write the PRP** `PRPs/phase-<n>-<slug>.md` from the template, naming the PRD sections, pattern files, and memory entries the phase lists. Take back the path and a three-line summary — never the PRP body.
2. **Brief an agent for the failing tests** (`test:` commit), then **brief an agent to implement to green**. Same context or separate, per the phase's shape. TDD rules per `${CLAUDE_PLUGIN_ROOT}/process/quality-gates.md` — never weaken a test.
3. **Have the gate run and take back pass/fail plus failing test names** — not the output. Red gate blocks the next phase.
4. **`code-reviewer` on the phase diff**; findings ≥ medium go back to an implementing agent as a fix brief. You route the findings; you do not fix them.
5. **You** update TASK/DECISIONS/OPEN-QUESTIONS/LEARNINGS from the returned fields, and brief doc updates (architecture, env-vars, deployment) where the phase touched them. Log API spend vs estimate.
6. **You** commit (Conventional Commits) and push. Git is yours; the code is not.

When a brief comes back as a wall of text, extract the return-contract fields, record them, and ask for a shorter result next time. Do not read it in full and do not pass it on.

## Stops and non-stops

- **Never stop to ask.** Ambiguity → BUILD-PLAN §3 decision defaults → log → continue. Blocked >3 attempts → default → else OPEN-QUESTIONS + feature-flag stub → continue.
- **Never reopen the PRD.** A PRD that turns out to be wrong or thin is handled by decision defaults and OPEN-QUESTIONS like any other ambiguity. `/gantry:prd` is not reachable from here.
- **Stop only at** BUILD-PLAN §7 gates (live money, PROD, comms, project-specific ones) — run `/gantry:gate <name>` with evidence. **The moment the gate clears, resume the phase you were in** — an approval is never a cue to wait for the owner to restart the run.
- **Phase boundaries are not stops.** Finish a phase, log it, commit, and start the next one in the same breath.
- Reaching P-RELEASE: deliverable docs finalised → UAT loop (read-only Test Agent; its report → your fix loop → re-verify) → requirements audit → readiness verdict → `/gantry:gate G3`. On G3 approval: deploy per the deployment doc, verify post-deploy, write release notes, tag — then continue into S6 (`${CLAUDE_PLUGIN_ROOT}/commands/harvest.md`).

## Resume semantics

State = kernel files + git. On re-run: reconcile TASK.md against git history, announce where you're resuming and why, continue. Crashes need no special handling.
