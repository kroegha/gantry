---
description: "S4 — execute the BUILD-PLAN autonomously, phase by phase, stopping only at declared gates. Re-runnable/resumable."
argument-hint: "[phase number to resume from, optional]"
---

# /gantry:run — S4 Autonomous Execution

You are the orchestrator (BUILD-PLAN §4; delegate per `${CLAUDE_PLUGIN_ROOT}/process/agent-routing.md`). Execute `BUILD-PLAN.md` phases in order — from $ARGUMENTS if given, else from the first incomplete phase per `TASK.md` state.

Read at session start: `CLAUDE.md`, `PLANNING.md`, `TASK.md`, current phase of `BUILD-PLAN.md`. Load only the PRD sections and memory entries the phase references.

## Per phase (BUILD-PLAN §1 is authoritative)

1. Generate `PRPs/phase-<n>-<slug>.md` from the PRP template — context-rich, exact paths, gotchas included.
2. Failing tests first (`test:` commit), then implement to green. TDD rules per `${CLAUDE_PLUGIN_ROOT}/process/quality-gates.md` — never weaken a test.
3. Validation gate + declared extras. Red gate blocks the next phase.
4. Code-review agent on the phase diff; fix severity ≥ medium.
5. Update TASK/DECISIONS/OPEN-QUESTIONS/LEARNINGS + living docs (architecture, env-vars, deployment). Log API spend vs estimate.
6. Conventional Commits; push (autodeploy to the first environment).

## Stops and non-stops

- **Never stop to ask.** Ambiguity → BUILD-PLAN §3 decision defaults → log → continue. Blocked >3 attempts → default → else OPEN-QUESTIONS + feature-flag stub → continue.
- **Never reopen the PRD.** A PRD that turns out to be wrong or thin is handled by decision defaults and OPEN-QUESTIONS like any other ambiguity. `/gantry:prd` is not reachable from here.
- **Stop only at** BUILD-PLAN §7 gates (live money, PROD, comms, project-specific ones) — run `/gantry:gate <name>` with evidence. **The moment the gate clears, resume the phase you were in** — an approval is never a cue to wait for the owner to restart the run.
- **Phase boundaries are not stops.** Finish a phase, log it, commit, and start the next one in the same breath.
- Reaching P-RELEASE: deliverable docs finalised → UAT loop (read-only Test Agent; its report → your fix loop → re-verify) → requirements audit → readiness verdict → `/gantry:gate G3`. On G3 approval: deploy per the deployment doc, verify post-deploy, write release notes, tag — then continue into S6 (`${CLAUDE_PLUGIN_ROOT}/commands/harvest.md`).

## Resume semantics

State = kernel files + git. On re-run: reconcile TASK.md against git history, announce where you're resuming and why, continue. Crashes need no special handling.
