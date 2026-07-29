# The No-Interruption Contract

The run stops only at declared gates. Everything else is handled by **pre-flight** (eliminate blockers before starting) and **decision defaults** (resolve ambiguity by rule). This file is the framework; each project's BUILD-PLAN §2/§3 instantiates it.

Scope note: this contract governs S0–S6. **S-PRD is deliberately outside it** — see `process/prd-intake.md`. Everything the PRD stage settles is ambiguity the run never has to stop for.

It applies **between** stages as well as within them: a finished stage flows into the next one without waiting to be re-invoked, and a cleared gate resumes immediately (`lifecycle.md` §Continuous execution). Handing control back to the owner is something Gantry does at gates and nowhere else.

## 1. Pre-flight framework (BUILD-PLAN §2 generation)

At S3, enumerate everything only the owner can provide, per category:

| Category | Examples |
|---|---|
| Repos & access | Git remote (created at S0), push access, CLI authentication verified |
| Hosting services | Platform service created, pointing at the repo, autodeploy on |
| Domains & DNS | Per-env hostnames, records exist |
| Credentials | Every API key/secret by **name** + where it must be set (never values in docs) |
| Third-party accounts | Payment test accounts, provider sign-ups needing human email verification |
| Data | Any seed/reference data only the owner has |
| **Agent tooling** | A language server for the chosen stack's language(s), so symbol resolution and diagnostics are real rather than guessed. Generated at S2 from the stack decision — name the specific plugin, not "an LSP" |
| UAT provisioning (pre-S5) | Read-only Test Agent access: authenticated browser session for the deployed environment, app test accounts, other declared access |

**Missing-item rule:** wrap the dependency in a client interface + mock adapter + feature flag; log to OPEN-QUESTIONS; continue. Live verification moves to the nearest gate after the item appears.

## 2. Decision-default categories (BUILD-PLAN §3 generation)

Generate project-specific defaults in each category — every category must have at least one row:

1. **Spec ambiguity** — simplest interpretation consistent with the PRD's user stories; log it.
2. **Third-party unavailability** — mock + flag (see missing-item rule). Includes APIs that turn out not to exist as specced, or not to be available in the project's market: build the fallback named in the PRD/risk register.
3. **Library/model drift** — the current maintained equivalent; record the mapping; verify major version before importing.
4. **Design gaps** — design system of record first, then framework defaults, then PRD principles.
5. **Cost breach** — phase exceeding 3× its API-spend estimate: stub, flag, move on.
6. **Repeated failure** — >3 fix attempts on one failure: decision default if one applies; else OPEN-QUESTIONS + feature-flag stub + continue.
7. **Irreversibles** — never: PROD changes, live money, comms sent in the owner's name, service/data deletion, force-push. These wait for gates regardless of cost to progress.

## 3. Logging protocol

- Every default applied → `DECISIONS.md` row (date, decision, why, alternative).
- Every deferred item → `OPEN-QUESTIONS.md` row with the default applied meanwhile.
- Every surprise → `LEARNINGS.md` line.
- Gates present the accumulated DECISIONS/OPEN-QUESTIONS since the last gate as part of the evidence.

## 4. Resume semantics

State = kernel files + git history. Any command re-run reads TASK.md/BUILD-PLAN state and continues from the first incomplete item. There is no separate recovery procedure; crashing is just stopping.
