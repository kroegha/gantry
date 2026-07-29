---
description: "Gate ritual — present evidence, state exactly what approval means, wait for explicit approval"
argument-hint: "<gate-name: G0|G1|G2a|G2|G3|custom>"
---

# /gantry:gate — Human Gate Ritual

Gate: $ARGUMENTS. Definitions in `${CLAUDE_PLUGIN_ROOT}/process/lifecycle.md`.

1. **Assemble the evidence** for this gate (lifecycle table): G0 = the PRD + how it got there + structural coverage + gaps (`${CLAUDE_PLUGIN_ROOT}/process/prd-intake.md`) · G1 = review doc + PRD diff · G2a = scorecard + options + recommendation (present as multiple choice — the owner picks) · G2 = BUILD-PLAN + pre-flight status + declared stops · in-run = the specific live verification · G3 = UAT sign-off + requirements audit + readiness verdict + deployment doc.
2. **Include the ledger since the last gate**: DECISIONS applied, OPEN-QUESTIONS raised/unanswered, budget vs actual.
3. **State precisely what approval authorises** (one sentence) and what happens next.
4. **Wait.** Never proceed on silence or partial answers. If the owner amends, apply amendments, restate, re-ask.
5. On approval: record it in DECISIONS.md (date, gate, scope of approval, amendments) and, where applicable, tag the repo (`gate/G2`, `v1.0` at G3).
6. **Then continue immediately into the next stage** — read `${CLAUDE_PLUGIN_ROOT}/commands/<next>.md` and follow it, announcing the transition in one line. Approval is the signal to proceed, never a cue to wait for the owner to type the next command (`${CLAUDE_PLUGIN_ROOT}/process/lifecycle.md` §Continuous execution). The stage that follows each gate: G0 → S0 `init` · G1 → S2 `stack` · G2a → S3 `plan` · G2 → S4 `run` · in-run → resume the current phase · G3 → finish the release, then S6 `harvest`.
