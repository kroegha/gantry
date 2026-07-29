# Pattern — Money & credit integrity

*(applies to any metered, credit-based, or paid product)*

1. **One choke-point:** all value mutations go through a single service backed by an **atomic DB function** — lock, check, mutate, write ledger row, one transaction. No client-supplied balances, ever.
2. **Ledger, not balance:** every movement is a ledger row (amount, type, action, reason); balance is derivable and verifiable against it.
3. **Grants only server-side from verified events:** payment webhooks verify signatures, enforce a unique provider-payment-id (replays = no-ops), and grant inside the same idempotent path. Client redirects never grant anything.
4. **Charge-before-dispatch** for third-party-cost actions (AI calls): deduct first, refund on provider error (5xx/timeout) — not on user dissatisfaction.
5. **Test canon (exhaustive, written first):** concurrent double-spend, insufficient/zero/negative balance, webhook replay, tampered signature, grant idempotency per payment id, refund paths. Coverage floor 80%+ on these modules.
6. **In-run human gate:** a live test-mode transaction verified by the owner before the phase is called done. Green tests are not evidence that money moves correctly.
