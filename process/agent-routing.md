# Agent Routing — binding to the local sub-agent library

Gantry bundles no agents and duplicates none. It binds at run time to whatever sub-agent library the machine has, by discovery. If the machine has none, Gantry does the work itself — routing is an optimisation, never a dependency.

## Discovery (do this, never hardcode)

1. Read `~/.claude/AGENT-INDEX.md` on demand if it exists (a generated map by category). Missing → list `~/.claude/agents/` and read the frontmatter. Neither present → **no library; proceed unaided and say so once.**
2. **Match on the `description` field** (trigger conditions), not the filename.
3. **Invoke by the `name:` field** — often human-readable and different from the filename (e.g. `engineering-code-reviewer.md` → "Code Reviewer"). Disambiguate by file.
4. Several fit / task spans domains → hand to an orchestrator agent if one exists, or run specialists in parallel and integrate.
5. Nothing fits → proceed yourself; say which agent you considered and why not (one line in DECISIONS).

Gantry never writes to `~/.claude/agents/`, never proposes edits to it, and never fails a phase because a preferred agent is absent.

## Role → capability map (BUILD-PLAN §4 generation)

Roles, not names. Resolve each to a real `name:` from the live roster at S3, or to "unaided" if the library has no match.

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
| Per-phase code review | Code review with severity ratings |
| Commit/branch discipline | Git workflow, conventional commits |
| Honesty checks at risky-phase exits | Evidence-demanding verification; defaults to "not ready" |
| Final spec-vs-implementation audit | Requirements traceability auditing |
| UI fidelity vs design system | Visual/design review |

## The UAT Test Agent (special case)

- Separate from all dev agents; **read-only on the project** — tests and reports only. It never edits code, config, data, or docs, and never commits.
- The owner provisions access before S5 (pre-flight item): an authenticated browser session for the deployed environment, app test accounts, anything else declared in the UAT doc.
- Its output is the UAT report (defects with reproduction steps + severity). The orchestrator turns defects into failing tests and fixes through the normal loop; the Test Agent re-verifies.
- No agent library? The role still exists — run UAT as a distinct read-only pass with a fresh context, and hold the same rule: the thing that tests does not fix.

## Model economics for the run itself

Route big-model reasoning (architecture, PRP generation, thorny debugging) and cheaper models (mechanical edits, doc updates, test scaffolding) appropriately — the same cost discipline Gantry demands of the products it builds.
