<!-- gen: instantiate at S0; re-parameterise stack-specific sections after G2a.
     Replace every {{...}}. Delete sections marked [optional] if not applicable.
     Keep it lean — detail lives in PLANNING.md and docs/. -->
# {{PROJECT_NAME}} — Project CLAUDE.md

> This folder is the app repo root.
> **This file stands alone.** It does not assume a global `~/.claude/CLAUDE.md` exists — if one does, these rules extend it and it applies except where overridden here.
> Authority order: explicit user instruction > this file > global CLAUDE.md.

## 🔄 Project Awareness & Context

- **Always read `PLANNING.md`** at the start of a new conversation.
- **Check `TASK.md`** before starting work; add unlisted tasks (one line + date); mark done immediately; log discoveries under "Discovered During Work".
- **The spec of record is `{{PRD_PATH}}`.** Do not implement from earlier versions or memory. PRD-vs-this-file conflicts → flag in `OPEN-QUESTIONS.md`, follow the PRD.
- **Deployment truth lives in `{{ENV_DOCS_PATH}}`.** Never invent hosting/infra details.
- **Never pause the build to ask a human.** Apply BUILD-PLAN §3 Decision Defaults; log in `DECISIONS.md` / `OPEN-QUESTIONS.md`; proceed.
- **Log surprises to `LEARNINGS.md`** (one line each) — feeds the harvest.
- **Checkpoint discipline (context loss is always imminent):** files and git are the only memory that survives a context clear/compact. Mark the current task in-progress in `TASK.md` *before* starting it (with the PRP step you're on); commit at least per task, never only per phase; write decisions/learnings the moment they happen, not at wrap-up.
- **Post-compact re-entry:** if the conversation was compacted or cleared — or you cannot state the current phase, PRP step, and last commit without guessing — stop and re-read `PLANNING.md`, `TASK.md`, and the current phase's BUILD-PLAN section + PRP before touching anything.

## 🧱 Code Structure & Modularity

- **Language/stack: {{STACK_SUMMARY}}** <!-- gen: from ADR-001 after G2a -->
- **Never create a file longer than 500 lines.** Split into modules.
- Organisation: <!-- gen: structure tree from PLANNING.md, feature-first -->
{{STRUCTURE_RULES}}
- **Validate at every boundary** ({{VALIDATION_LIB}}): API inputs, external-service payloads, env vars (fail fast at boot).
- **No hardcoded config.** Model IDs, prices, fees, feature flags, and any jurisdiction-dependent fact → env vars or config store. <!-- gen: keep this line always -->

## 🧪 Testing & Reliability — TDD IS MANDATORY

- **Red → Green → Refactor.** Failing tests first, committed first. Commit history must show test-first ordering.
- **Never weaken, skip, or delete a test to make it pass.** Fix the code; if the test is wrong, correct it and say why in the commit message.
- Test stack: {{TEST_STACK}} <!-- gen: from stack ADR; include mocking strategy for external services -->
- Tests live in `{{TEST_DIR}}` mirroring source, plus E2E suite.
- Minimum per feature: **1 expected-use, 1 edge case, 1 failure case.**
- {{CRITICAL_PATH}} gets exhaustive tests. <!-- gen: money/auth/data-integrity paths from PRD; e.g. double-spend, replay, race conditions -->
- **Validation gate** (before any task is marked done):
  ```bash
  {{GATE_COMMANDS}}
  ```
- Coverage floor: {{COVERAGE_FLOOR}} on critical-path modules.

## 🗄️ Data Layer Rules

<!-- gen: from the project's environment profile + stack ADR. If the datastore is shared
     with other applications, state the isolation rules explicitly (namespacing/prefixes,
     row-level access control in the creation migration, no cross-application schema
     access). Cover: access-control policy style, function search_path, FK indexing,
     atomic functions for money/critical mutations, server-only privileged keys,
     type regeneration after migrations. -->
{{DATA_LAYER_RULES}}

## 🔌 Integration Rules [optional]

<!-- gen: one block per external integration from the PRD: AI providers (model IDs
     from env only, prompt files not inline, structured outputs, charge-before-call),
     payments (verify signatures, idempotent webhooks, server-side grants only),
     email, third-party APIs (client interface + mock adapter + feature flag). -->
{{INTEGRATION_RULES}}

## 🎨 Design System [optional]

<!-- gen: only if a design template/system was provided at S0. -->
- All UI derives from `{{DESIGN_SYSTEM_PATH}}`; read `{{DESIGN_NOTES_PATH}}` before building UI.
- Port tokens once (bootstrap phase); components consume tokens — never hardcoded colours/sizes/radii/shadows.
- {{THEME_REQUIREMENTS}}

## 📎 Style & Conventions

- {{LINT_FORMAT_TOOLS}} — repo config is law.
- {{NAMING_CONVENTIONS}}
- Doc comments on exported functions (brief — what/why); `// Reason:` comments for non-obvious logic.
- Conventional Commits; tests committed before or with implementation.
- Update `README.md` when setup, env vars, or commands change; keep `docs/env-vars.md` in parity with `.env.example` (CI-checked).
- Deliverable documents carry `{{ORGANISATION}}`. <!-- gen: blank is valid and the default — if blank, deliverables carry no company name at all. Never substitute a placeholder. -->

## 🔐 Secrets & Environments

- Secrets exist **only** in {{SECRETS_LOCATIONS}} and local `.env.local` (gitignored). Never in code, commits, fixtures, logs, or agent output.
- `.env.example` lists every var name with a comment — no values.
- Pin all image/dependency versions where the ecosystem allows. No `:latest`.
- {{DEPLOY_ORDER_RULE}} <!-- gen: e.g. "TEST first, always — verify before PROD" -->

## 🧠 AI Behaviour Rules

### Think before coding

- **State your assumptions explicitly** before writing code. If a requirement has more than one reasonable reading, say so and name the one you're taking — don't pick silently.
- If something is genuinely unclear, apply the BUILD-PLAN §3 decision default and log it. Never guess quietly and never stall.
- If a simpler approach exists than the one asked for, say so in one sentence, then build what was asked unless told otherwise.

### Simplicity first

- **The minimum code that solves the problem.** Nothing speculative: no unrequested abstractions, no "flexibility" for a future that hasn't been specified, no error handling for impossible cases.
- If 200 lines could be 50, write the 50. Would a senior engineer call this overcomplicated? Then simplify it.
- **Surgical changes.** Touch only what the task requires. Match the surrounding style even where you'd do it differently. Don't refactor, reformat, or "improve" adjacent code. Remove only the orphans your own change creates; flag pre-existing dead code rather than deleting it. Every changed line should trace to the task.

### Accuracy

- **Never hallucinate libraries or APIs** — verify a package exists, and its current major version, before importing it. Verify file paths and module names before referencing them.
- **Never delete or overwrite existing code** unless the task requires it.
- **Use the language server** for symbol navigation, references, hover types, diagnostics, and renames — not text search or guesswork. It resolves symbols accurately and catches errors before runtime. Fall back to search only where no language server exists for the language. **This binds sub-agents too.**

### Honesty

- **Report outcomes faithfully.** If tests fail, say so and show the output. If a step was skipped, say that. When something is done and verified, say so plainly without hedging.
- **Push back.** If a request is contradictory, based on a wrong premise, or would make the code worse, say so before acting. Flag contradictions rather than silently picking a side. No sycophancy — agreement that isn't earned is noise.
- A green test suite is not evidence that a feature works. Evidence is observed behaviour.

### Delegation

- **Delegate per BUILD-PLAN §4**, which maps phases to preferred agents.
- The **UAT Test Agent is read-only** on this project — it tests and reports, and never fixes what it finds. Never ask it to.
