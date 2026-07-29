<!-- gen: instantiate at S3 from PRD vNext + chosen stack + process/phase-library.md +
     relevant memory entries. Every {{...}} filled; phases selected/adapted from the
     library and ordered by dependency; in-run gates declared explicitly. -->
# {{PROJECT_NAME}} — Master Build Plan (v1.0)

| Field | Value |
|---|---|
| Spec of record | `{{PRD_PATH}}` |
| Stack | {{STACK_SUMMARY}} (ADR-001) |
| Method | Context engineering + TDD (per `CLAUDE.md`) with phase-gated PRPs |
| Executor | Claude Code, orchestrated — start-to-finish, no human interruption except §2 pre-flight and §7 gates |
| Date | {{DATE}} |

## 1. How to run this plan (orchestrator instructions)

You are the orchestrator ({{ORCHESTRATOR_AGENT}}). Execute phases **in order**. For each phase:

1. **Generate a PRP**: read the PRD sections referenced, relevant docs, existing code, and relevant Gantry-memory entries listed in §5; produce `PRPs/phase-<n>-<slug>.md` from `PRPs/templates/prp_base.md`. Context-rich; exact file paths and patterns.
2. **Write the phase's failing tests first**, commit (`test: …`).
3. **Implement** until the validation gate passes. Delegate per §4.
4. **Review**: run the code-review agent on the phase diff; fix findings severity ≥ medium.
5. **Record**: update `TASK.md`, `DECISIONS.md`, `OPEN-QUESTIONS.md`, `LEARNINGS.md`; update living docs per the `docs/` catalog (architecture, env-vars, deployment). Conventional Commits; push.
6. **Never proceed on a red gate.** Blocked >3 attempts on one failure → apply §3; still blocked → OPEN-QUESTIONS + stub behind a feature flag + continue. Never halt the run.

Session hygiene: re-read `PLANNING.md` + `TASK.md` each session start; load only the PRD sections and memory entries the phase references.

## 2. Pre-flight — human inputs (before the run starts)

<!-- gen: everything only the owner can provide: repos/services/accounts/keys/domains/DNS.
     Missing item → mock adapter + feature flag + OPEN-QUESTIONS entry, continue. -->
- [ ] Git remote `{{GIT_REMOTE}}` exists and the agent has push access (created at S0)
{{PREFLIGHT_ITEMS}}

## 3. Decision defaults & escalation (the no-interruption contract)

Never stop to ask. Apply these, log in `DECISIONS.md`:

| Situation | Default |
|---|---|
| PRD ambiguous/silent | Simplest interpretation consistent with PRD user stories; note it |
| Third-party API blocked, absent, or unavailable in this market | Client interface + mock adapter + feature flag; flag for live verification |
| Missing credentials | Same as above; never invent or hardcode credentials |
| Library deprecated/renamed vs plan | Current maintained equivalent; record mapping |
| Design detail unspecified | {{DESIGN_DEFAULT}} |
| Flaky third-party in CI | Mock it; never weaken assertions |
| Phase exceeds 3× its API-spend estimate | Pause AI-heavy loops in that phase, stub, flag in OPEN-QUESTIONS, continue with next phase |
| Anything irreversible outside the repo (service deletion, DB drops, PROD, live money, comms in the owner's name) | **Do not do it.** §7 gates govern these |
{{EXTRA_DEFAULTS}}

## 4. Agent routing

<!-- gen: from process/agent-routing.md. The four contract agents below are fixed — copy
     them as-is, do not substitute a discovered equivalent. For the capability roles,
     resolve each to a real `name:` from the live roster, or to "unaided". Never copy an
     example capability table blind. -->

**Contract agents (bundled with Gantry — do not substitute):**

| Work | Agent |
|---|---|
| Per-phase diff review | `code-reviewer` — severity-rated findings; fix ≥ medium before the phase closes |
| Risky-phase exit / readiness verdict | `reality-checker` — defaults to NEEDS WORK; green tests are not evidence |
| UAT execution (S5) | `uat-test-agent` — **read-only**; tests and reports, never fixes or commits |
| Requirements audit (S5) | `requirements-auditor` — PRD → `file:line` traceability |

**Capability agents (resolved from the local library at S3):**

| Work | Agent |
|---|---|
{{AGENT_ROUTING_TABLE}}

## 5. Phases

Every phase inherits the standard gate — `{{GATE_COMMANDS}}` — plus listed extras. TDD ordering is mandatory.

<!-- gen: one block per phase from process/phase-library.md, adapted to the PRD:
### Phase N — <name>
**Objective:** … **PRD:** §refs. **Memory:** relevant gotcha/pattern files.
Tasks: ordered → arrows.
Test spec (first): the failing tests that define done.
Extra gate: (E2E / security review / reality-check / live smoke)
Exit: verifiable criteria.
-->
{{PHASES}}

## 6. Cross-phase rules

- One branch per phase (`feat/phase-<n>-<slug>`) or direct-to-main per repo policy; the code-review agent reviews every phase diff pre-push. `main` stays deployable to {{FIRST_ENV}}.
- Any schema change = migration + regenerated types + data-rules tests in the same commit set.
- Env var added → `.env.example` + `docs/env-vars.md` in the same commit (CI parity check).
- API spend per phase logged to DECISIONS.md against the §5 estimates.

## 7. Human gates (the only planned interruptions)

<!-- gen: always include money/PROD/comms; add project-specific ones. -->
{{HUMAN_GATES}}
Final gates: UAT loop (read-only Test Agent → report → fix → re-verify) and G3 PROD approval per `process/lifecycle.md`.

## 8. Out of scope for this run — do not build

<!-- gen: from PRD out-of-scope + deferred versions. Drift here → stop the task, log it. -->
{{OUT_OF_SCOPE}}
