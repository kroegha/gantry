---
description: "S2 — stack evaluation: scorecard, 2-3 options with recommendation, the owner chooses (Gate G2a)"
---

# /gantry:stack — S2 Stack Evaluation

Follow `${CLAUDE_PLUGIN_ROOT}/process/stack-evaluation.md` exactly. Inputs: the signed-off PRD vNext, the environment profile (if the project has one), and relevant memory entries (`gotchas/`, `patterns/`, `calibration.md`).

## Steps

1. Derive weighted requirements from the PRD (workload profile, memory/edge needs, integrations, compliance, scale, budget). Declare weights before scoring.
2. Shortlist 2–3 candidate stacks, then **brief one agent per candidate** to research it and return a filled scorecard row: score per dimension, a one-line evidence note with a source URL per score, and the option's weakest dimension. Keep the research out of your own context — you are comparing candidates, not reading documentation (`${CLAUDE_PLUGIN_ROOT}/process/agent-routing.md`). Evidence must be current and cited: SDK coverage, costs, LTS status, environment fit, availability in the project's market.
3. Score the card; write draft `docs/adr/ADR-001-stack.md` with a scored comparison, recommendation, and consequences (including each option's weakest dimension).
4. **Gate G2a — the owner chooses**: present the options via a multiple-choice question — one line of trade-off per option, recommendation marked. Do not proceed on silence.
5. Record the choice + rationale in ADR-001 (Accepted); start `docs/architecture.md` from the template with the L1/L2 sketch.
6. **Parameterise the kernel** from the choice: CLAUDE.md stack/testing/data-layer/integration sections, PLANNING stack table + validation commands, PRP validation slots. Replace every "TBD at G2a".
6a. **Raise the language-server pre-flight item.** The stack is now known, so name the specific language server the agent will need for this project's language(s) — e.g. for TypeScript, `typescript-language-server` from the `claude-code-lsps` marketplace (`/plugin marketplace add Piebald-AI/claude-code-lsps`). Add it to the pre-flight list. The kernel mandates using a language server over text search; without one installed, that rule has nothing behind it.
7. Report the chosen stack and the kernel updates made, then **continue straight into S3** by reading and following `${CLAUDE_PLUGIN_ROOT}/commands/plan.md`. Do not stop and wait for the owner to type `/gantry:plan`.
