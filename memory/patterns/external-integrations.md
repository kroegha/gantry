# Pattern — External integrations that can't stop the run

*(core to the no-interruption contract)*

1. **Interface first:** every external service gets a client interface owned by the project, so the real provider is swappable.
2. **Mock adapter always exists** (request-mocking library or fixtures) — it's what unit/integration tests use, and it's the fallback when credentials or access are missing at pre-flight.
3. **Feature flag** selects real vs mock at runtime; missing access ships the mock path and logs to OPEN-QUESTIONS for live verification at the next gate.
4. **Spike risky APIs in P-BOOTSTRAP** — anything with unverified auth flows, quotas, or endpoints (findings → `docs/spikes/<name>.md`) *before* a phase depends on it. Never let an agent "implement the API" from assumptions; scraping a login-gated service is a compliance defect, not a workaround.
5. **Webhooks:** verify signatures on every event; idempotency via a unique external-id constraint; replay tests mandatory.
6. **One live smoke test** per provider behind an env flag, excluded from CI.
