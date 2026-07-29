# Agent Routing — four bundled contract agents, everything else by discovery

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

If the machine has no library, Gantry does the work itself. Discovery is an optimisation, never a dependency.

## Discovery (do this, never hardcode)

1. Read `~/.claude/AGENT-INDEX.md` on demand if it exists (a generated map by category). Missing → list `~/.claude/agents/` and read the frontmatter. Neither present → **no library; proceed unaided and say so once.**
2. **Match on the `description` field** (trigger conditions), not the filename.
3. **Invoke by the `name:` field** — often human-readable and different from the filename (e.g. `engineering-code-reviewer.md` → "Code Reviewer"). Disambiguate by file.
4. Several fit / task spans domains → hand to an orchestrator agent if one exists, or run specialists in parallel and integrate.
5. Nothing fits → proceed yourself; say which agent you considered and why not (one line in DECISIONS).

Gantry never writes to `~/.claude/agents/`, never proposes edits to it, and never fails a phase because a preferred agent is absent.

## Role → capability map (BUILD-PLAN §4 generation)

Roles, not names. Resolve each to a real `name:` from the live roster at S3, or to "unaided" if the library has no match.

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
