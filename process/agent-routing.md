# Agent Routing — the orchestrator delegates; four bundled contract agents; everything else by discovery

## The orchestrator does no work of its own

The main Gantry agent is an **orchestrator, and nothing else**. Its job is to decide what happens next, brief an agent to do it, receive a compact result, record state, and repeat. It has to survive an entire build — many phases, many hours — so its context is the scarcest resource in the system and every token it spends on work it could have delegated is taken from the run's lifespan.

**The orchestrator never:**

- writes or edits source, tests, config, or migrations
- reads source files to "check" something — it asks an agent
- loads the full PRD, a full PRP, or a large document into its own context
- pastes file contents into a subagent prompt, or accepts them back
- debugs, greps the codebase, or explores structure

**The orchestrator only:**

- reads and writes the small state files — `TASK.md`, `DECISIONS.md`, `OPEN-QUESTIONS.md`, `LEARNINGS.md`, and the current phase's section of `BUILD-PLAN.md`
- briefs agents and evaluates what they return
- runs git operations and commits
- presents gates to the owner

If you catch yourself opening a source file, stop: that is a delegation you skipped.

### Pass references, never contents

Briefs carry **paths and section references**, never pasted text. `docs/Product_PRD_v2.0.md §5.3–5.6`, `src/payments/ledger.ts`, `PRPs/phase-6-payments.md`. The agent has its own context and its own file tools — let it read. Pasting a file into a prompt copies it into *two* contexts and buys nothing.

This applies to PRP generation as well: **delegate it.** Producing a context-rich PRP means reading the PRD, the existing code, and the memory entries — precisely the loading the orchestrator must avoid. Brief an agent to write `PRPs/phase-<n>-<slug>.md` and take back only its path and a three-line summary.

### The return contract

Every agent returns a compact, structured result. Brief them to return **this and nothing else**:

| Field | Content |
|---|---|
| Status | done / blocked / partial |
| Files changed | paths only, no diffs |
| Gate result | pass, or fail with the failing test names |
| Decisions applied | one line each, for `DECISIONS.md` |
| Open questions | one line each, with the default applied meanwhile |
| Learnings | one line each, only where reality surprised them |
| Blocked on | what a human or another agent must supply |

Roughly twenty lines. **No code, no diffs, no file contents, no full command output, no narration of the work.** If an agent returns a wall of text, do not read it in full and do not paste it onward — extract the fields above, record them, and move on. Ask for a shorter result next time.

The return contract is what makes long runs possible. Work sent out cheaply but returned expensively fills the orchestrator's context just as fast as doing the work itself.

### Checkpoint to files, not to memory

State lives in `TASK.md`, `DECISIONS.md`, `OPEN-QUESTIONS.md`, `LEARNINGS.md`, and git — written as things happen. The orchestrator should be able to lose its entire context and resume from those files alone, which is exactly what happens after a compact and what `/gantry:start` relies on.

---

There are two kinds of agent in this lifecycle, and they are routed differently.

## Contract agents (bundled — use these, not a substitute)

Four roles exist because the process *depends on a specific behaviour*, not just on someone competent doing the work. Gantry ships them in `agents/` and they take precedence over any same-role agent found in the local library:

| Role | Agent | The contract |
|---|---|---|
| UAT execution (S5) | `uat-test-agent` | **Read-only on the project** — its tools are restricted so it cannot edit, write, or commit. It reports; the orchestrator fixes |
| Requirements audit (S5) | `requirements-auditor` | Line-by-line PRD → implementation traceability, every claim cited `file:line` |
| Risky-phase exit / readiness | `reality-checker` | **Defaults to NEEDS WORK**; refuses to pass on green tests alone |
| Per-phase diff review | `code-reviewer` | Rates every finding by severity, so the gate rule "fix ≥ medium" has something to act on |

Substituting a general-purpose equivalent quietly breaks these. A discovered code reviewer that emits no severities makes the phase gate meaningless; a discovered tester that fixes what it finds destroys the read-only boundary the UAT round depends on. **Do not substitute them, and do not "improve" on them by picking a more specialised-sounding agent from the local library.**

The owner may override any of them explicitly. That is their call, and it gets logged in DECISIONS.md like any other.

## Capability agents (discovered — never hardcode a roster)

Everything else — backend, frontend, infrastructure, security design, architecture, data — is routed by discovery against whatever library the machine has. These roles are interchangeable, the local library is usually better tuned than anything Gantry could freeze, and hardcoding a roster would rot.

## Resolution order — always delegate, never require a library

Every capability role resolves down this ladder. **Stop at the first rung that works.**

| # | Rung | When |
|---|---|---|
| 1 | **A matched specialist** from the local library | A `description` genuinely matches the role's trigger conditions |
| 2 | **`general-purpose` subagent + a role brief you write** | No specialist matched — which is the normal case on a fresh install |
| 3 | **Do it in the orchestrator's own context** | **Only** for a change too small to brief — a one-line config edit, a typo — or if subagents are genuinely unavailable. **Never for implementation, debugging, or reading source.** See §The orchestrator does no work of its own |

**Rung 2 is the default, not a degraded mode.** `general-purpose` is built into Claude Code and exists with no library installed at all. An empty `~/.claude/agents/` costs you a tuned system prompt — it does not cost you delegation, context isolation, or parallelism, and Gantry must not behave as though it does.

### Writing the role brief (rung 2)

When you fall through to `general-purpose`, supply what the missing specialist would have carried. Four things, every time:

1. **The role and its standard** — "You are implementing the server-side slice of phase 4. You are held to the project's invariants and gate commands."
2. **The context it must load** — the PRP, the PRD sections, the files establishing the pattern to follow, the memory entries the phase lists. Never make it go looking.
3. **The deliverable and its definition of done** — which tests must pass, which gate commands must be green.
4. **The constraints from `CLAUDE.md`** — TDD ordering, file size limits, no hardcoded config, surgical changes, validate at boundaries.

A `general-purpose` agent with that brief is close to a specialist. A `general-purpose` agent with "implement the backend" is worse than doing it yourself — the difference is entirely in the brief, so write it properly.

## Discovery (do this, never hardcode)

1. Read `~/.claude/AGENT-INDEX.md` on demand if it exists (a generated map by category). Missing → list `~/.claude/agents/` and read the frontmatter. Neither present → **no library: go to rung 2 and say so once, in one line.** Do not report it as a problem; it is a supported configuration.
2. **Match on the `description` field** (trigger conditions), not the filename.
3. **Invoke by the `name:` field** — often human-readable and different from the filename (e.g. `engineering-code-reviewer.md` → "Code Reviewer"). Disambiguate by file.
4. Several fit / task spans domains → hand to an orchestrator agent if one exists, or run specialists in parallel and integrate.
5. **A weak match is worse than no match.** An agent whose description is adjacent but not aimed at this work brings the wrong standards with it. Prefer rung 2 over a stretch, and note the choice in one line in DECISIONS.

Gantry never writes to `~/.claude/agents/`, never proposes edits to it, and never fails a phase because a preferred agent is absent.

## How many agents a run invokes

So cost is predictable rather than a surprise. Per build phase, typically:

| Invocation | Rung |
|---|---|
| 1–2 implementation agents (more if the phase splits cleanly into parallel slices) | 1 or 2 |
| 1 `code-reviewer` on the phase diff | bundled |
| 1 `reality-checker`, on risky-phase exits only | bundled |
| 1 security review, on auth/payments/hardening phases only | 1 or 2 |

**Roughly 2–4 per phase**, so a ten-phase project runs on the order of 30 subagent invocations, plus one `uat-test-agent` and one `requirements-auditor` per UAT round at S5. Each phase logs its actual API spend against the BUILD-PLAN estimate, so drift shows up in DECISIONS.md rather than in the bill.

Don't spawn an agent for work smaller than the cost of briefing it. A one-line config change is not a delegation.

## Role → capability map (BUILD-PLAN §4 generation)

Roles, not names. Resolve each at S3 down the ladder above: a matched specialist if one genuinely fits, otherwise `general-purpose` + a role brief.

The four contract agents above are **not** in this table — they are already resolved. This table covers the capability roles only.

| Role in the run | Capability to match on |
|---|---|
| Run coordination | Multi-agent orchestration, workflow sequencing |
| Architecture, ADRs, schema design | System design, data modelling, architecture decision records |
| Server-side implementation | Backend/API implementation in the chosen stack |
| UI implementation | Frontend implementation, component work, design-system fidelity |
| Cross-layer features | Full-stack feature delivery |
| AI integration, prompts | LLM integration, prompt engineering, model routing |
| Infra, CI/CD, deploys, backups | DevOps, containerisation, pipelines |
| Test strategy, E2E suites | QA strategy, end-to-end automation; API contract testing |
| Security design + review | Threat modelling, secure code review, OWASP |
| Commit/branch discipline | Git workflow, conventional commits |
| UI fidelity vs design system | Visual/design review |

## Provisioning the UAT Test Agent

The agent ships with Gantry, but its *access* does not. Before S5 the owner provides, as a pre-flight item: an authenticated browser session for the deployed environment, app test accounts, and anything else the UAT document declares. Without them the agent will correctly report scenarios as **untested** rather than passing them.

Its output is the UAT report (defects with reproduction steps + severity). The orchestrator turns defects into failing tests and fixes them through the normal TDD loop; the Test Agent re-verifies in the next round and looks again — a fix is a change, and changes break things.

## Model economics for the run itself

Route big-model reasoning (architecture, PRP generation, thorny debugging) and cheaper models (mechanical edits, doc updates, test scaffolding) appropriately — the same cost discipline Gantry demands of the products it builds.
