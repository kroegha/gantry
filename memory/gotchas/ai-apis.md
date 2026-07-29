# Gotchas — AI provider APIs

- **Model IDs drift faster than any other dependency.** Never hardcode in code, schema enums, or PRDs — env/config only, with a router mapping task → model. Model names written into a PRD are routinely stale within months of it being signed off.
- **Route by task economics:** cheap fast models for high-volume chat, strong models for long-form/structured generation. Recheck pricing at project start — it moves quarterly.
- **Prompt caching** on static system prompts cuts input cost dramatically; design prompts as stable files (not inline strings) partly for this reason.
- **Structured outputs** (JSON mode/tool schema + schema-validated parse) for anything machine-consumed. Free-text parsing of AI output is a defect.
- **Charge-then-dispatch** for credit-metered products: deduct before the provider call, refund on provider 5xx/timeout — never on user dissatisfaction. *(pattern detail: patterns/money-integrity.md)*
- **Official SDK coverage is uneven across languages.** Check that every provider the PRD requires has a maintained SDK in the candidate language before scoring a stack — this belongs in the "AI-agent buildability" dimension at S2. *(verified 2026-07)*
- Web-search grounding is available as a provider tool — use it for any feature whose value is current facts (cite sources in UI); don't ship "the model probably knows" for trust-critical outputs.
