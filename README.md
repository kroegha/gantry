# Gantry

An agentic delivery OS for [Claude Code](https://claude.com/claude-code). Bring a PRD — or just an idea — and Gantry takes the project to production, stopping only where a human is genuinely required.

```
/gantry:prd                             # S-PRD: have a PRD? adopt it. No PRD? build one → G0
/gantry:init docs/MyProduct_PRD_v1.0.md # S0:   kernel, git, remote, pre-flight
/gantry:review-prd                      # S1:   "possible today" fact-check → PRD vNext → G1
/gantry:stack                           # S2:   scored options + recommendation → G2a: you choose
/gantry:plan                            # S3:   phased TDD BUILD-PLAN → G2 sign-off = handoff
/gantry:run                             # S4–S5: autonomous build → in-run gates → UAT → G3 → PROD
/gantry:harvest                         # S6:   distil learnings into Gantry's memory (approval-gated)
```

Seven stages, six gates. Between gates it does not stop to ask.

## Why this exists

Most agent failures on real projects are not coding failures. They are: building from a spec that was wrong about the world, choosing a stack the agent cannot actually build in, stalling on a missing credential, or asking a human a question at 2am and idling until morning.

Gantry addresses each one directly — a research-first PRD review, a scored stack evaluation that weights *agent buildability*, a pre-flight pass that eliminates blockers before the run, and decision defaults that resolve ambiguity by rule instead of by interruption.

## What it enforces

**PRD intake before anything else** (adopt yours, or author one through a guided interview) · **TDD** — failing tests first, gates never weakened · a **no-interruption contract** — pre-flight plus decision defaults instead of mid-run questions · **living deliverable docs** (architecture, UAT, deployment, maintenance, env-vars, security) that are written as work happens, not in an end-of-project sprint · a **read-only UAT agent** with a separate dev-agent fix loop · **agent routing** by discovery against whatever sub-agent library you have — and unaided if you have none · **two-tier memory** that improves the OS after every project.

It is brand-neutral by design: no company name is stamped on anything it generates unless you supply one, and no market's payment rails, tax rules, or privacy law are assumed as defaults.

## Install

This repo is both the plugin and its own single-plugin marketplace.

```
/plugin marketplace add kroegha/gantry
/plugin install gantry@gantry-marketplace     ← choose User scope for all projects
```

Verify: `/plugin list` shows `gantry`; typing `/gantry` autocompletes the eight commands.

**Updating:**

```
/plugin marketplace update gantry-marketplace
```

Troubleshooting: `/plugin` → **Errors** tab. Stale behaviour after an update → remove `~/.claude/plugins/cache`, restart, reinstall.

### Word document output (optional but recommended)

PRDs render to `.docx` for stakeholders. This is the only part of Gantry that needs a dependency:

```bash
npm install        # in the Gantry plugin directory — installs `docx`
```

Without it, everything still works and PRDs stop at markdown, which is the version of record regardless. Styling is controlled entirely by `skills/_shared/style-constants.js` — edit that one file to match a house style.

### Before the first autonomous run

1. **Permissions.** Approval dialogs kill autonomous runs. Pre-approve what the run needs in `~/.claude/settings.json` (or via `/permissions`):

   ```json
   {
     "permissions": {
       "allow": [
         "Edit", "Write",
         "Bash(git *)", "Bash(gh *)", "Bash(npm *)", "Bash(npx *)",
         "Bash(docker *)", "Bash(docker compose *)",
         "WebFetch", "WebSearch"
       ]
     }
   }
   ```

   Extend per project stack. `claude --dangerously-skip-permissions` also works but removes every guardrail — prefer the allowlist.
2. **A git host CLI**, authenticated, if you want S0 to create the remote for you. Optional; S0 works locally without it.
3. **A sub-agent library** in `~/.claude/agents/` if you have one — Gantry discovers and routes to it, never modifies it, and proceeds unaided if it is absent.
4. **An environment profile** for your deployment target. Copy `process/environments/_template.md` and fill it in once per estate you reuse. Without one, deployment details become pre-flight items rather than guesses.

## Repo map

| Path | What |
|---|---|
| `commands/` | The eight `/gantry:*` stage commands |
| `process/` | The manual: lifecycle, PRD intake, no-interruption contract, agent routing, stack evaluation, quality gates, phase library, deliverables, memory, environment profile template |
| `kernel/` | Templates instantiated into each project (CLAUDE.md, PLANNING, BUILD-PLAN, PRP, docs-templates/) |
| `skills/` | Bundled `prd-create` and `prd-update`, plus the shared docx generator |
| `memory/` | Cross-project memory (gotchas, patterns, calibration) — written only at harvest |
| `examples/marketstall.md` | Worked example + acid-test checklist |

## Design notes

**Gates are the only stops.** Each has a defined evidence set. The agent presents evidence, states exactly what approval authorises, and waits — never proceeding on silence.

**State lives in files, not conversation.** Every command is re-runnable and resumable; a crash, a context clear, or a closed laptop is just stopping. Re-running picks up from the first incomplete item.

**Memory is single-writer.** Cross-project memory is written only at harvest, which is what lets concurrent project runs coexist without conflicting.

**Wrong memory is worse than no memory.** Gantry ships with no calibration data at all rather than borrowed numbers — another team's velocity is not evidence about yours.

## Versioning

Semver. Harvest proposals bump the version; `memory/` changes ship as part of the release. Current: **v0.1.0** — the lifecycle is proven in private use, but this public packaging has not yet been run end-to-end by anyone else. Treat it accordingly.

## Licence

MIT. See [LICENSE](LICENSE).
