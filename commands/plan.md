---
description: "S3 — generate the master BUILD-PLAN (phases, TDD specs, gates, routing, decision defaults) for sign-off (Gate G2)"
---

# /gantry:plan — S3 Build Plan Generation

Generate the project's `BUILD-PLAN.md` from `${CLAUDE_PLUGIN_ROOT}/kernel/BUILD-PLAN.template.md`. Inputs: PRD vNext, ADR-001, `${CLAUDE_PLUGIN_ROOT}/process/phase-library.md`, `no-interruption-contract.md`, `agent-routing.md`, `quality-gates.md`, `deliverables.md`, plus relevant memory entries.

## Steps

1. **Phases**: select/adapt from the phase library, ordered by dependency (P-BOOTSTRAP first, P-HARDENING and P-RELEASE last). Per phase: objective, PRD §refs, memory refs, ordered tasks, **test spec first**, gate + extras, exit criteria, API-spend estimate. Risky integrations get spikes in P-BOOTSTRAP.
2. **Pre-flight (§2)**: everything only the owner can provide, per the contract's categories — including UAT Test Agent provisioning as a pre-S5 item.
3. **Decision defaults (§3)**: one or more rows per contract category, made project-specific from the PRD's risk register.
4. **Agent routing (§4)**: resolve each role to a real `name:` from the live agent roster now — never copy an example table blind. Roles with no match are marked "unaided"; that is a valid plan, not a blocker.
5. **Human gates (§7)**: money, PROD, comms + anything the owner added at S0 + UAT/G3 flow.
6. **Deliverables wiring**: doc creation/update tasks embedded into phases per `deliverables.md` (UAT scenarios get drafted in this stage from PRD user stories → `docs/uat.md`).
7. **Out of scope (§8)**: from the PRD's deferred versions — explicit, so drift is detectable.
8. **Gate G2**: `/gantry:gate G2` — present the plan, pre-flight status, declared stops. The owner's sign-off = authorisation for the autonomous run. **On approval, begin the run immediately** by reading and following `${CLAUDE_PLUGIN_ROOT}/commands/run.md` — the approval *is* the start signal, so do not wait for the owner to type `/gantry:run`.
