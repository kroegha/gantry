# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in **this repository** — the Gantry plugin source. Read this first, then `process/lifecycle.md`.

## What this repo is

Gantry is a **Claude Code plugin written almost entirely in Markdown**. The exceptions are two JSON manifests and one Node script (`skills/_shared/generate-prd.js` + its style module) that renders PRDs to `.docx`. Everything else is a slash command, a process document, a template, or a memory entry — prompt material an agent consumes at runtime.

Two consequences:

- **"Changing behaviour" means editing prose.** The quality bar is precision of wording, not passing tests. A contradiction between two documents is a bug — the agent reads both and gets conflicting instructions.
- **Almost nothing here runs.** You verify a change by reloading the plugin in a Claude Code session and exercising the affected command. The one exception is the docx generator, which you can and should actually execute (see *Working on the plugin*).

**Know which of two audiences you're writing for.** Most content in this repo (TDD mandates, gate rituals, decision defaults, deliverable-doc rules) tells an agent how to behave **inside a project Gantry builds** — it is *not* instructions for working in this repo. Editing here is ordinary, careful documentation work.

## What Gantry does (one line)

Bring a PRD or just an idea; `/gantry:*` takes it to production — PRD intake → fact-check → stack choice → phased TDD build plan → autonomous run with human gates → deliverable docs → cross-project memory. Stops only at declared gates.

## Lifecycle at a glance (canonical source: `process/lifecycle.md` — restated here, keep in sync)

| Stage | Command | Gate that follows |
|---|---|---|
| S-PRD Intake — adopt an existing PRD, or author one | `/gantry:prd [existing-prd]` | **G0** PRD accepted as input |
| S0 Bootstrap — kernel + git + remote + pre-flight | `/gantry:init <prd> [extra docs]` | rolls into G1 |
| S1 PRD review — "possible today" fact-check → PRD vNext | `/gantry:review-prd` | **G1** PRD sign-off |
| S2 Stack — scored options + recommendation + draft ADR | `/gantry:stack` | **G2a** owner chooses stack |
| S3 Plan — phased TDD BUILD-PLAN + UAT scenarios | `/gantry:plan` | **G2** plan sign-off = handoff |
| S4 Run — autonomous phase-by-phase build | `/gantry:run [phase]` | in-run only (money / PROD / comms) |
| S5 Release — deliverable docs, UAT + fix loop, readiness verdict | *(final phases of the run — no own command)* | **G3** PROD approval |
| S6 Harvest — distil learnings into memory/templates | `/gantry:harvest [project path]` | owner approves the diffs |

`/gantry:gate <G0|G1|G2a|G2|G3>` is the **gate ritual** (not a stage): summarise evidence, state exactly what approval means, wait — never proceed on silence.

## Architecture — four layers, one direction of dependency

```
commands/   thin stage entry points  ─reads→  process/   the authoritative manual
                                     ─reads→  memory/    cross-project knowledge
                                     ─invokes→ skills/   prd-create, prd-update, docx generator
                                     ─instantiates→ kernel/  templates → target project
```

1. **`commands/*.md`** — the **eight** `/gantry:*` commands: `prd, init, review-prd, stack, plan, run, gate, harvest`. Deliberately short — they orchestrate and delegate detail to `process/`. Each has YAML frontmatter (`description`, optional `argument-hint`) and references other OS docs via `${CLAUDE_PLUGIN_ROOT}/...`, which only resolves when running as an installed plugin.
2. **`process/*.md`** — the manual and real specification. `lifecycle.md` is the spine; the rest are loaded by name: `prd-intake.md`, `no-interruption-contract.md`, `quality-gates.md`, `agent-routing.md`, `stack-evaluation.md`, `phase-library.md`, `deliverables.md`, `memory.md`, and `environments/_template.md`.
3. **`kernel/`** — templates instantiated into each *target* project at S0: six kernel docs, `BUILD-PLAN.template.md`, `PRPs/prp_base.md`, and `docs-templates/` (architecture, deployment, env-vars, maintenance, release-notes, security, uat). Not used by this repo itself.
4. **`skills/`** — bundled `prd-create` and `prd-update` (each `SKILL.md` + `references/`), plus `_shared/generate-prd.js` and `_shared/style-constants.js`. Bundled rather than referenced so a fresh install has no external skill dependency.
5. **`memory/`** — Tier-2 memory: `gotchas/` (`jurisdiction`, `ai-apis`, `nextjs`, `supabase-selfhosted`), `patterns/` (`money-integrity`, `external-integrations`), `calibration.md`, indexed in `MEMORY.md`. Written **only at harvest (S6)** — that single-writer rule is what lets concurrent project runs coexist.

## Working on the plugin

Reload and exercise the changed command:

```
/plugin marketplace update gantry-marketplace
```

Stale behaviour after edits → remove `~/.claude/plugins/cache`, restart, reinstall. Errors surface in `/plugin` → **Errors** tab.

The docx generator is the one thing you can test directly — do so after any change to it, in **both** modes, because the no-organisation path is the default for public users and the easiest to break:

```bash
npm install
node skills/_shared/generate-prd.js <in.md> <out.docx> --product-name "X" --version "1.0"
node skills/_shared/generate-prd.js <in.md> <out.docx> --product-name "X" --version "1.0" --organisation "Acme Ltd"
```

Commits use Conventional Commits.

## Invariants to preserve when editing

- **`${CLAUDE_PLUGIN_ROOT}` for every cross-file reference** from a command to an OS doc. A bare relative path breaks the plugin install.
- **The stage/gate table in `process/lifecycle.md` is canonical.** Command files, `README.md`, and the table above restate it — change `lifecycle.md` first, then propagate, or the agent gets conflicting instructions.
- **Neutrality is a feature, not an accident.** No company name, no personal name, no specific market's payment rails/tax/privacy law, and no private infrastructure detail belongs anywhere in this repo. Deliverable identity comes from the project's `{{ORGANISATION}}` value — blank by default, and **blank must render as absent, never as a placeholder**.
- **"The owner"** is the term for the human who approves gates. Defined once in `lifecycle.md`. Don't introduce a second term for the same role.
- **S-PRD is the only stage allowed to interview the user**, and `/gantry:run` must never be able to reach it. That boundary is what lets the no-interruption contract hold everywhere else — if you weaken it, the central promise goes with it.
- **Templates carry `<!-- gen: -->` notes and `{{SLOT}}` placeholders.** The `gen:` comments tell the generating agent *when* a section is created/updated and what to source it from; `deliverables.md` relies on them to wire doc updates into build phases. A slot without a `gen:` note is a slot the agent will guess at.
- **Nothing outside this repo and the target project may be written.** Gantry reads `~/.claude/agents/` and `~/.claude/AGENT-INDEX.md` to route work; it never writes there, and never fails a phase because an agent is missing.
- **Commands stay re-runnable and resumable.** State lives in the target project's kernel files + git history, never in conversation. Any new step must tolerate re-execution after a crash, a gate, or a context clear.
- **Gates are the only stops**, each with a defined evidence set in `lifecycle.md`. Adding a gate means adding its evidence row too.
- **Version bumps touch two files in lockstep**: `.claude-plugin/plugin.json` (`version`) and the "Current: **vX.Y.Z**" line in `README.md`.

## Style of the prose itself

Dense, declarative, table-heavy. Rules are numbered and stated as absolutes ("never weaken a test", "wrong memory is worse than no memory"). Keep new content in that register — hedged prose reads as optional to an agent, and optional rules don't survive an autonomous run.
