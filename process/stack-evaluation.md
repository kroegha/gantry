# Stack Evaluation (S2) — scorecard → options → the owner chooses

**Output:** 2–3 viable candidates scored with evidence, one recommendation, a draft ADR-001 — presented at **Gate G2a as a multiple-choice decision. The agent recommends; the owner decides.**

## Process

1. **Derive requirements** from the PRD vNext: workload profile (I/O vs CPU, memory behaviour, concurrency, edge/offline needs), integrations, compliance, scale targets, budget.
2. **Load memory:** `memory/gotchas/` + `memory/patterns/` entries for candidate technologies; `memory/calibration.md` for how past choices played out.
3. **Shortlist 2–3 candidates** (a stack = language/runtime + framework + data layer + hosting shape). Include the environment profile's default where it plausibly fits.
4. **Research each — current, web-verified, sources cited.** Training-data impressions about versions, pricing, and vendor availability are not evidence. Two failure modes recur: a provider that does not operate in the project's market, and a model or library name that was superseded between the PRD being written and the build starting.
5. **Score** (below), weight by what the PRD actually demands, and write the ADR draft with consequences per option.
6. **Present at G2a:** options with one-line trade-off summaries, the recommendation marked, full scorecard attached. Record the owner's choice + rationale in ADR-001 (Accepted).
7. **Parameterise the kernel** from the choice: CLAUDE.md stack sections, validation commands, PRP validation slots, PLANNING stack table.

## Scorecard dimensions

| Dimension | What to check |
|---|---|
| Workload fit | I/O vs CPU profile, memory handling, concurrency model, edge processing if required |
| Cost | Infra + API costs at projected scale; licences |
| Environment fit | The target estate declared in the project's environment profile, or the client-dictated target |
| Supportability & ops | Monitoring, debugging, backup story, deploy complexity, maintainer reality |
| Maintenance | Dependency churn, LTS/EOL status, upgrade path, community health/longevity |
| **AI-agent buildability** | Official SDK coverage for required integrations, codegen reliability in that language, language-server quality. *Weight heavily — a stack with superior runtime performance but no official SDKs for the project's integrations will lose more time than it saves.* |
| Ecosystem | Libraries for every PRD integration; testing ecosystem maturity |
| Security & compliance | Auth patterns, data residency, audit needs — **per the project's declared jurisdiction**, never a default one |
| Performance | Only to the level the PRD demands — no premature optimisation |
| Team/hiring | The owner's familiarity; future human maintainers |

## Scoring & presentation rules

- Score 1–5 per dimension with a one-line evidence note (claim + source). No unsourced 5s.
- Weights declared before scoring (from the PRD), not after.
- A "recommended" option must also be honest about its weakest dimension.
- If two options genuinely tie, say so — the choice is the owner's either way.
