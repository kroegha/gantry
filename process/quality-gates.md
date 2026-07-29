# Quality Gates — TDD rules, validation loops, audits

## TDD (non-negotiable, every phase)

1. **Red → Green → Refactor.** The phase's test spec is written and committed (`test:`) before implementation. Commit history is the proof.
2. **Never weaken, skip, or delete a test to make it pass.** Fix the code. A genuinely wrong test gets corrected with the reason in the commit message.
3. Minimum per feature: 1 expected-use, 1 edge case, 1 failure case.
4. External services are mocked in unit/integration tests; at most one live smoke test per provider behind an env flag, excluded from CI.
5. No real personal data in fixtures or seeds, ever.

## Critical-path testing (identify at S3 from the PRD)

Anything touching **money, auth, or irreversible data** gets exhaustive tests: double-spend/race conditions, webhook replay + idempotency, signature-verification failure, zero/negative balances, cross-user access denial on every table, refund-on-provider-error. Coverage floor on these modules: 80% lines (adjust per project, never below).

## The standard gate

Every phase inherits the project's gate commands (from CLAUDE.md — typecheck, lint, test, build). Declared extras per phase: E2E suite, security review, deployed smoke test, performance budget, reality check.

## Audit stages

| Audit | When | Who | Standard |
|---|---|---|---|
| Code review | every phase diff | `code-reviewer` (bundled) | fix severity ≥ medium before merge |
| Security review | auth/payments/hardening phases | discovered security agent | OWASP top 10 + project threat model |
| Reality check | exits of risky phases (streaming, money, release) | `reality-checker` (bundled) | default NEEDS WORK; evidence required (live behaviour, not green tests alone) |
| **UAT** | S5, repeated per round | `uat-test-agent` (bundled, **read-only**) | scenarios from PRD user stories + exploratory; defects → orchestrator fix loop → re-verify |
| Requirements audit | S5 | `requirements-auditor` (bundled) | line-by-line PRD FR/scope vs implementation, cited `file:line` |

Four of these five ship with Gantry because the audit depends on a specific behaviour, not just on competence — see `process/agent-routing.md` §Contract agents. The security reviewer is a capability role and is discovered from the local library.

## Gate discipline

- A red gate blocks the next phase. Period.
- >3 fix attempts on one failure → decision defaults → OPEN-QUESTIONS + feature-flag stub → continue (see no-interruption contract).
- Gate results (incl. failures and their causes) are LEARNINGS material — log them.
