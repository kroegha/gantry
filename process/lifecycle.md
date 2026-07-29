# Gantry Lifecycle — the stage machine

Seven stages, six human gates. Everything else runs without stopping. Commands are re-runnable; state lives in the project's kernel files, so any stage resumes after a crash, a gate, or a closed laptop.

> **"The owner"** throughout these docs means the human who approves gates and supplies what only a human can (accounts, keys, live-money verification, production sign-off). On a solo project that is you; on a team it is whoever holds that authority. Gantry never assumes more than one.

## Stages

| Stage | Command | Input | Output | Stop? |
|---|---|---|---|---|
| *(entry)* | `/gantry:start [path-to-existing-prd]` | Whatever state the folder is in | Dispatch into the right stage below; also the resume path | — |
| S-PRD Intake | `/gantry:prd [path-to-existing-prd]` | An existing PRD **or** nothing but the product idea | PRD at the canonical path (`docs/{{PRODUCT_NAME}}_PRD_v1.0.md` + `.docx`); market-research doc when authored here | **G0: PRD accepted as the input document** |
| S0 Bootstrap | `/gantry:init <prd> [extras]` | PRD (+ env guides, design system, other docs) in/for an empty folder | Project kernel (CLAUDE.md, PLANNING.md, TASK.md, DECISIONS.md, OPEN-QUESTIONS.md, LEARNINGS.md, PRPs/, docs/ skeletons), git repo + remote push, pre-flight checklist | → G1 (combined with S1) |
| S1 PRD review | `/gantry:review-prd` | PRD + web research | Review doc + PRD vNext ("possible today"-verified, sources cited) | **G1: PRD sign-off** |
| S2 Stack | `/gantry:stack` | PRD vNext, env profile, memory (gotchas) | Scored options (2–3) + recommendation + draft ADR | **G2a: the owner chooses the stack** |
| S3 Plan | `/gantry:plan` | PRD vNext, chosen stack, phase library, memory | BUILD-PLAN.md (phases, TDD test specs, gates, agent routing, decision defaults), stack-parameterised kernel, UAT scenario doc | **G2: plan sign-off = handoff** |
| S4 Run | `/gantry:run` | BUILD-PLAN | Working software, phase by phase; deliverable docs updated per `process/deliverables.md` | In-run gates only (money, PROD, comms) |
| S5 Release | (final phases of the run) | Completed phases | Deliverable doc set finalised; UAT (read-only Test Agent) → fix loop → re-verify; requirements audit; production-readiness verdict | **G3: PROD approval** |
| S6 Harvest | `/gantry:harvest` | LEARNINGS.md, DECISIONS.md, OPEN-QUESTIONS.md, git history, retro answers | Tier-2 memory diffs, template edits — all as a reviewable proposal | The owner approves diffs |

## Gates

| Gate | What the owner approves | Evidence presented |
|---|---|---|
| G0 | This document is the PRD the project will be built from | PRD at the canonical path; how it got there (supplied or authored); market research if authored; the interview record; known gaps |
| G1 | Reviewed PRD becomes spec of record | Review doc with sourced corrections; PRD diff |
| G2a | Stack choice (multiple-choice: options + recommendation) | Scorecard, ADR draft, costs, risks per option |
| G2 | BUILD-PLAN = authorisation to run autonomously | Plan + pre-flight status + declared in-run gates |
| In-run | Live-money tests; anything PROD; comms sent in the owner's name | Per BUILD-PLAN §7 |
| G3 | PROD deployment | UAT sign-off report, requirements audit, readiness verdict, deployment doc |

Gate ritual: `/gantry:gate <name>` — summarise evidence, list exactly what approval means, wait. Never proceed on silence.

## Continuous execution — the run does not wait to be re-started

**One command starts a project; the stages flow into one another on their own.** The user reviews, answers questions, and approves. They do not drive the machine by typing a command per stage.

That command is **`/gantry:start`** — it reads the folder's state, enters the lifecycle at the right stage, and is equally the way to pick a project back up after a closed session. Every other command is a stage entry point that `start` (or the preceding stage) hands to.

1. **A completed stage flows straight into the next.** Do not end a stage by telling the user to run the next command and then stopping. Announce the transition in one line and continue — read `${CLAUDE_PLUGIN_ROOT}/commands/<next>.md` and follow it.
2. **A cleared gate resumes immediately.** Approval is the signal to continue, not a cue to wait for a command. The moment the owner approves (or approves with amendments you have applied and restated), record it and move into the next stage in the same breath.
3. **The only pauses are:** the S-PRD interview, the S0 gap questions, the six gates, and an owner who interrupts. Nothing else — not stage boundaries, not phase boundaries, not a long-running build.
4. **The commands remain individually invocable** for resuming after a closed session, re-running a stage, or deliberately jumping to one. That is a recovery and override path, not the normal way to use Gantry.

Stated negatively, because it is the failure this rule exists to prevent: *finishing a stage, printing "next step: `/gantry:stack`", and stopping* is a bug. So is *receiving "approved" at a gate and waiting.*

## Rules that bind every stage

1. **Never stop mid-stage to ask a human, and never stop between stages at all.** Apply the project's Decision Defaults (BUILD-PLAN §3, generated from `process/no-interruption-contract.md`); log to DECISIONS.md / OPEN-QUESTIONS.md; continue. **S-PRD is the one stage exempt** — it is an interview by design, it sits ahead of the autonomous run, and it is unreachable from `/gantry:run`.
2. **Read before acting:** PLANNING.md + TASK.md at every session start; relevant memory entries (via `memory/MEMORY.md` index) at S2/S3 and phase starts.
3. **Write LEARNINGS.md** whenever reality surprised you (quirk, wrong estimate, gate failure, pattern that worked). One line is enough; harvest does the distilling.
3a. **Context loss is always imminent.** Checkpoint continuously (TASK.md in-progress markers incl. PRP step, per-task commits, decisions written when made). After any compact/clear — or whenever current phase/PRP-step/last-commit can't be stated without guessing — re-read PLANNING.md, TASK.md, and the current phase + PRP before continuing. The kernel CLAUDE.md carries this rule because it's the file guaranteed to reload after a clear.
4. **TDD is mandatory** in S4 — see `process/quality-gates.md`. No gate weakening, ever.
5. **Document identity is the project's, not Gantry's.** Deliverables carry the project's `{{ORGANISATION}}` value, captured at S0 and blank by default. Gantry stamps no company on anything it generates.
6. **Global `~/.claude/CLAUDE.md` and `~/.claude/agents/` are read-only** to Gantry. It reads the agent library to route work; it never writes to either.
