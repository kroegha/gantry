# Worked Example — "Marketstall"

A fictional project, used two ways: as the illustration of what each stage produces, and as the **acid test** you replay when you change Gantry's templates or process docs materially.

Marketstall is invented. Nothing here describes a real product, company, or customer. It is shaped to exercise every part of the lifecycle at once — money, an external API, an AI feature, a market constraint, and a design system — because a worked example that only exercises the easy path teaches nothing.

**One thing to hold in mind while reading.** The stage headings below are for your navigation; the owner did not type them. They typed `/gantry:start` once, in an empty folder. Everything after that ran continuously — each stage flowing into the next — and came back to them only for the interview, the S0 gap questions, and six approvals. Where this document says "the owner", read it as *someone answering a question or approving a gate*, never as someone issuing a command.

---

## The premise

> A one-person software business wants to build **Marketstall**: a directory where small traders publish a stall page. Traders pay a monthly fee for a verified badge; the badge requires checking the trader's registration against the national business registry. An AI assistant drafts stall descriptions from a few bullet points, metered by credits. Target market: a single country, not the author's own. There is an existing brand style guide but no design system.

The owner arrives with an idea and a two-page brief. No PRD. They open a terminal in an empty folder and type `/gantry:start`.

---

## S-PRD — PRD intake

`/gantry:start` finds an empty folder and enters at S-PRD.

**Route B (author).** The brief is not a PRD, so the interview runs. What it surfaces that the brief did not:

| Question | Answer that changed the project |
|---|---|
| Which market? | A country the owner does not operate in — which turns every payment, tax, and registry assumption into something to verify rather than assume |
| Organisation for the documents? | *(blank)* — a sole trader who does not want a company name on the PRD. Documents generate with no organisation, no placeholder |
| What is out of scope? | Buyer accounts, messaging, reviews — deferred to v2, recorded so drift is detectable later |
| What happens when the registry is down? | Not considered. Logged as an open question, later becomes a decision default |

**Produced:** `docs/Marketstall_PRD_v1.0.md`, `docs/Marketstall_MarketResearch_v1.0.md`, and the `.docx` render.

**G0** — the owner accepts this as the input document. Not as correct: three claims in it are already suspect and flagged as gaps. On approval Gantry moves into S0 immediately, builds the kernel, asks its six gap questions, initialises git, and carries on into S1 — without being asked to.

> **The lesson:** the interview is not overhead. Four questions removed four things that would otherwise have stopped an autonomous run dead.

---

## S1 — PRD review

The fact-check, against the declared market. What it caught:

| Finding | Severity | Consequence |
|---|---|---|
| The payment processor named in the PRD does not onboard businesses registered in the target market | **Critical** | Architecture change before a line of code. Alternative rails identified and sourced |
| The AI model IDs in the PRD were superseded months ago | Critical | Model IDs move to config; a task→model router replaces the hardcoded names |
| The business registry has an official API — the PRD assumed screen-scraping a login-gated search | Critical | Scraping removed; a spike is scheduled instead of an assumption |
| Stated VAT rate was wrong for the target market | Update | Pricing arithmetic corrected throughout; rate becomes content, not code |
| §3 scope table and §5 functional requirements disagreed about buyer accounts | Consistency | Resolved to the §3 answer, logged |

Every finding carries a source URL and the date checked. The review doc becomes the change document; `prd-update` applies it and versions the PRD to v2.0.

**G1** — PRD v2.0 becomes the spec of record. Gantry continues into S2 on approval.

> **The lesson:** the most expensive error class is a PRD assumption about a market the author does not live in. It is cheap here and ruinous at integration.

---

## S2 — Stack evaluation

Three candidates scored against weights declared *before* scoring. The decisive dimension was not runtime performance:

| Dimension (weight) | Option A | Option B | Option C |
|---|---|---|---|
| Workload fit (2) | 4 | 5 | 5 |
| AI-agent buildability (3) | 5 | 5 | **2** |
| Ecosystem for required integrations (3) | 5 | 4 | **2** |
| Ops/supportability for one maintainer (2) | 4 | 3 | 3 |
| Cost at projected scale (2) | 4 | 4 | 5 |

Option C had the best raw performance and lost anyway: no official SDK for either the payment provider or the AI provider in that language, which converts every integration into hand-rolled HTTP and every agent-written line into a guess.

**G2a** — the owner picks Option A. ADR-001 records the choice *and* its weakest dimension.

Because the language is now known, S2 also raises a pre-flight item the empty folder could not have produced earlier: *install the TypeScript language server plugin*. The kernel requires symbol resolution over text search; this is what makes that rule real. Then it continues into S3.

> **The lesson:** score buildability explicitly, or you will pick a stack that is excellent for a team you do not have.

---

## S3 — Build plan

Phases selected from the library and ordered by dependency:

```
P-BOOTSTRAP   skeleton deployed, CI red-commit test, backups, + spike: registry API auth flow
P-SCHEMA      stalls, traders, credits ledger; access control in the creation migration
P-AUTH        trader signup/login; signup credit grant (idempotent)
P-APP-SHELL   layout from the brand style guide, ported to tokens
P-CORE-DOMAIN stall CRUD → AI description generator (charge-before-dispatch)
P-INTEGRATION registry verification: interface → mock → real → flag
P-PAYMENTS    subscription checkout, verified webhooks, receipts        ← in-run human gate
P-CONTENT     public directory pages, performance budget
P-HARDENING   E2E, a11y, security pass, observability, PROD prepared
P-RELEASE     docs finalised → UAT rounds → requirements audit → G3 → deploy
```

Decision defaults made project-specific — including the one the interview surfaced:

| Situation | Default |
|---|---|
| Registry API unavailable or rate-limited | Serve the mock adapter, mark badges "verification pending", never block stall creation |
| AI provider returns 5xx | Refund the credit, surface a retry, log |
| Copy or design detail unspecified | Brand style guide first, then framework defaults |

Agent routing (§4) fixes the four contract agents — `code-reviewer` on every phase diff, `reality-checker` at risky exits, `uat-test-agent` and `requirements-auditor` at S5 — and resolves the capability roles (backend, frontend, devops) against whatever library the machine has. This owner had none installed, so all three resolved to `general-purpose` with a written role brief: the phase's PRP, the PRD sections, the pattern files to follow, and the kernel's constraints. They still ran as separate agents in their own contexts; what they lacked was a tuned system prompt, not delegation.

**G2** — sign-off authorises the autonomous run, and the run starts on approval. The owner does not type anything.

---

## S4–S5 — the build

What the run stopped for, and what it did not:

**Did not stop:** the registry sandbox credentials never arrived. The mock path shipped, an OPEN-QUESTIONS row recorded it, and live verification moved to the next gate. Eleven phases completed without a question.

**Stopped once, as declared:** the live test-mode payment. The owner ran one transaction, confirmed the ledger row and the receipt, and approved — and the run resumed the phase it was in without being restarted.

**`reality-checker` failed the payments phase on its first look.** Every test was green. Its verdict was NEEDS WORK: the webhook had only ever been exercised against the mock, so "signature verification works" was asserted by a test that generated its own signatures. It demanded one real test-mode webhook delivery as evidence. That took an hour and found a header-casing bug.

**`uat-test-agent` found what green tests did not:** on a slow connection the AI generator could be double-submitted, charging two credits for one description. It reported reproduction steps and severity — and, being read-only, could not have quietly patched it instead. The orchestrator wrote a failing test, fixed it, and the agent re-verified in the next round.

**`requirements-auditor`** traced all 47 functional requirements: 44 Implemented with `file:line`, 2 **Stubbed** (registry verification, behind its flag — correctly *not* counted as done), 1 Partial. It also caught one Unrequested feature: a CSV export nobody had asked for.

**G3** — production approved on that evidence: UAT sign-off, requirements audit, readiness verdict, deployment doc. On approval Gantry deployed, verified, tagged, and moved into S6.

> **The lesson:** the read-only boundary is what makes UAT worth running. An agent that can fix what it finds will quietly narrow what it looks for.

---

## S6 — Harvest

Findings classified by the global-vs-project test:

| Finding | Classification | Home |
|---|---|---|
| Double-submit on metered actions needs an idempotency key at the UI boundary | Cross-project | `memory/patterns/money-integrity.md` |
| Registry API pagination quirk | Project-specific | Stays in the project |
| P-PAYMENTS took 2.4× its estimate; cause was webhook replay testing | Calibration | `memory/calibration.md` |
| "Verify the payment processor operates in the target market" should be an S1 checklist item, not folklore | Process | `memory/gotchas/jurisdiction.md` |

---

## Acid-test checklist

Replay this premise through S-PRD → S3 in a scratch folder whenever you change Gantry's templates or process docs materially. The output should include, at minimum:

**Flow**
- [ ] `/gantry:start` in an empty folder enters at S-PRD without asking which stage to run
- [ ] Each stage flows into the next unprompted; **no stage ends with "next step: `/gantry:…`" and then stops**
- [ ] Each gate approval resumes immediately — the owner never types a command to restart

**Content**
- [ ] **S-PRD** asks which market, and asks for an organisation — accepting blank without substituting a placeholder
- [ ] **S-PRD** produces markdown *and* docx at the canonical paths, and stops at G0
- [ ] **S1** flags the payment processor against the declared market, with a source
- [ ] **S1** moves model IDs to config rather than correcting them in place
- [ ] **S1** refuses the scraping approach and schedules a spike instead
- [ ] **S2** scores AI-agent buildability explicitly and states the winner's weakest dimension
- [ ] **S2** raises a language-server pre-flight item naming the specific plugin for the chosen stack
- [ ] **S3** puts the registry spike in P-BOOTSTRAP, before the phase that depends on it
- [ ] **S3** generates a decision default for the registry being unavailable
- [ ] **S3** derives UAT scenarios from the PRD's user stories
- [ ] **S3 §4** carries the four contract agents verbatim and resolves only the capability roles by discovery
- [ ] Kernel carries the money-integrity invariants, the standalone engineering rules, and a backup job appears in P-BOOTSTRAP
- [ ] The only declared in-run stop is the live payment test

Deviations mean one of two things: Gantry regressed, or Gantry improved. Decide which, consciously, and record it.
