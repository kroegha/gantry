# Gantry Memory Index

> One line per entry. Load only what the current stack/domain needs.
> Written only at harvest (`/gantry:harvest`) — never mid-project.

## Gotchas
- [gotchas/jurisdiction.md](gotchas/jurisdiction.md) — what is market-dependent and must be verified per project: payment rails, registries, tax, data protection, sector licensing
- [gotchas/ai-apis.md](gotchas/ai-apis.md) — model drift, config-not-code, prompt caching, structured outputs, SDK coverage
- [gotchas/nextjs.md](gotchas/nextjs.md) — Next 16: caching opt-in, Turbopack default; agent training-data lag
- [gotchas/supabase-selfhosted.md](gotchas/supabase-selfhosted.md) — RLS/Advisors canon, Vector pin, Kong path, proxy network, PG upgrades

## Patterns
- [patterns/money-integrity.md](patterns/money-integrity.md) — atomic ledger, webhook idempotency, charge-before-dispatch
- [patterns/external-integrations.md](patterns/external-integrations.md) — interface + mock adapter + feature flag; spike risky APIs in bootstrap

## Calibration
- [calibration.md](calibration.md) — planned-vs-actual per phase type (empty until this installation's first harvest)
