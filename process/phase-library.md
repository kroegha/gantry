# Phase Library — reusable phase patterns for BUILD-PLAN generation (S3)

Select, adapt, and order by dependency. Every phase gets: objective, ordered tasks, **test spec written first**, gate (standard + extras), exit criteria, PRD refs, memory refs, agents. Not every project needs every phase; a phase not in the library gets designed from the same skeleton.

## P-BOOTSTRAP (always first)
Running skeleton deployed to the first environment; all guardrails live.
Includes: scaffold per chosen stack · port design tokens (if design system provided) · tooling (lint/format/test/E2E/mocks/pre-commit hooks) · fail-fast env validation · CI pipeline · container/compose files per the environment profile · health endpoint · first deploy + HTTPS verify · **spikes for any integration flagged risky at S3** (findings → `docs/spikes/`) · backup job for any stateful store · `.gitignore` correctness before first push.
Test spec: env validation rejects missing vars; health 200; CI fails on a deliberate red commit (then revert).
Exit: deployed skeleton; CI green; spikes documented; backups running.

## P-SCHEMA (before anything that touches data)
Full schema + access control + migrations + generated types + atomic functions for critical mutations.
Test spec: cross-user access denied on every table; critical mutations (e.g. balance spend) reject insufficient state; concurrency cannot violate invariants; idempotent grants.
Exit: migrations apply cleanly; types committed; zero access-control lint findings.

## P-AUTH
Signup/login flows per PRD (incl. social), session policy, profile, any signup side-effects (bonuses — idempotent!).
Extra gate: E2E auth journeys + security-agent review.

## P-APP-SHELL
Navigation/layout/state skeleton per design system; core UX chrome (progress, balances, menus); responsive baseline.

## P-CORE-DOMAIN (one or more)
The product's heart, feature-first. Split by PRD feature areas; each slice = full TDD cycle. For AI products: provider clients + config-driven model router + streaming + prompt files + charge-refund logic first (infrastructure), then per-feature steps on those rails.
Extra gate: reality check on the riskiest slice (e.g. streaming live on the first environment).

## P-INTEGRATION (per external service)
Client interface → mock adapter → real adapter → feature flag. Webhooks: signature verification + idempotency + replay tests. If the service failed pre-flight: ship the mock path, flag for live verification at the next gate.

## P-PAYMENTS (special case of P-INTEGRATION; always its own phase)
Checkout, verified webhooks granting value server-side only, receipts, history.
Test spec is exhaustive per `quality-gates.md` critical-path rules.
Extra gates: security review + reality check + **in-run human gate: the owner verifies a live test-mode transaction**.

## P-CONTENT (landing/marketing/SEO)
Performance budget (Lighthouse ≥ 90), truthful content only (no fabricated testimonials/claims), trust marks, meta/OG.

## P-ADMIN
Role-gated admin surface; every admin mutation goes through the same audited service layer as user actions.

## P-HARDENING (always second-to-last)
Full-journey E2E · accessibility audit (WCAG 2.1 AA) · security pass (OWASP + threat model + rate limiting) · performance targets · observability wired (error tracking + analytics) · deployment doc finalised · PROD environment prepared (never deployed yet).

## P-RELEASE (always last)
Deliverable docs finalised (per `deliverables.md`) → **UAT rounds** (read-only Test Agent → report → orchestrator fixes via TDD → re-verify) → requirements audit → readiness verdict → G3 → PROD deploy per deployment doc → post-deploy verification → release notes + tag.

## Sizing & estimates
Give each phase an API-spend estimate and rough effort; log actuals in DECISIONS as you go — `memory/calibration.md` gets the comparison at harvest.
