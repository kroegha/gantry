# Gantry

An agentic delivery OS for [Claude Code](https://claude.com/claude-code). Bring a PRD — or just an idea — and Gantry takes the project to production, stopping only where a human is genuinely required.

Seven stages, six gates. Between gates it does not stop to ask.

---

## Install

```
/plugin marketplace add kroegha/gantry
/plugin install gantry@gantry-marketplace     ← choose User scope for all projects
```

Verify: `/plugin list` shows `gantry`, and typing `/gantry` autocompletes the commands.

**Updating:** `/plugin marketplace update gantry-marketplace`. Stale behaviour after an update → remove `~/.claude/plugins/cache`, restart, reinstall. Errors appear under `/plugin` → **Errors**.

---

# Using Gantry

## You type one command

Open a terminal in an **empty folder** for your new project, start Claude Code, and type:

```
/gantry:start
```

That is the whole of your command-line involvement. Gantry runs continuously from there — each stage flows into the next on its own — and comes back to you only to **ask a question, show you something to review, or request an approval.** When you answer, it carries straight on. You never have to remember what command comes next, because there isn't one.

Already have a PRD? Hand it over on the same line: `/gantry:start path/to/your-prd.docx`

Your job for the rest of the project is to **review, give feedback, and answer questions.** That's it.

## Where to run it

**In the project folder, not in Gantry's folder.** Gantry is installed once, globally; you run it from inside whatever project you are building. The folder should be either:

- **empty** — the normal case, or
- **containing only your input documents** (an existing PRD, environment guides, a design template)

Don't start Gantry in a folder that already holds an unrelated codebase. It generates a project kernel at the root and expects to own it.

## What the whole run looks like from your side

You start it once. Everything below happens in one continuous flow; the **bold** rows are the only moments it hands control back to you.

| Stage | What it does, unattended | What it needs from you |
|---|---|---|
| **S-PRD** | Asks whether you have a PRD. **Yes** → adopts it (converts, copies into `docs/`, structure-checks it). **No** → interviews you, researches the market, writes the PRD + `.docx` | **Answer the interview.** Then approve at **G0**: this is the document we'll build from |
| S0 | Builds the project kernel (CLAUDE.md, PLANNING.md, TASK.md, DECISIONS.md, OPEN-QUESTIONS.md, LEARNINGS.md, `docs/`), `git init`, offers to create the remote, writes the pre-flight checklist | **Answer up to 6 gap questions** — budget, domains, deadlines, accounts you already hold |
| S1 | Fact-checks every external claim in the PRD against the live web — vendors, APIs, model names, prices, regulations — with sources. Writes a review, applies it, produces PRD vNext | **Approve at G1**: the corrected PRD is now the spec of record |
| S2 | Researches 2–3 candidate stacks, scores them against weighted criteria, drafts ADR-001 | **Choose at G2a** — it recommends, you pick |
| S3 | Writes BUILD-PLAN.md: phases, test specs, gates, agent routing, decision defaults, UAT scenarios | **Approve at G2** — this authorises the autonomous build, and it starts immediately |
| S4–S5 | Builds the product phase by phase: PRP → failing tests → implement → validate → review → commit → push. Then deliverable docs, UAT rounds, requirements audit, readiness verdict. **Hours of work, unattended** | **Approve the declared in-run stops only** — a live test-mode payment, anything in your name. Then **G3** for production |
| S6 | Retro: mines what was learned, proposes updates to Gantry's own memory and templates | **Approve the diffs** |

Six moments of your attention, plus an interview at the start. Everything between them is unattended.

## Picking it back up

Closed the laptop? Session ended? Context ran out? Open the project folder and type the same thing:

```
/gantry:start
```

It reads the project's files, works out exactly where it stopped — which stage, which phase, which task — says so in one line, and carries on. There is nothing to remember and no separate resume command.

## The other commands exist, but you won't normally type them

`/gantry:prd`, `:init`, `:review-prd`, `:stack`, `:plan`, `:run`, `:gate`, `:harvest` are all individually invocable. They are stage entry points, there for deliberately jumping to or re-running one stage — an override path, not the normal way to use Gantry. `/gantry:start` and the stages themselves hand off to them.

`/gantry:gate` in particular is invoked by the stages; type it only if you want a gate's evidence shown to you again.

If you ever lose your place, just ask in plain language — "where are we?", "what's next?" — the agent reads the project state from files and tells you.

## What a gate looks like

The agent stops and shows you:

1. **The evidence** for this specific gate (defined per gate, not improvised)
2. **The ledger since the last gate** — decisions it made on your behalf, open questions it parked, budget spent vs estimated
3. **One sentence stating exactly what your approval authorises**

Then it waits.

**Reply in plain language.** "Approved", or "approved but change X", or a question. If you amend, it applies the amendment, restates, and asks again.

**Silence is never approval.** The agent will not proceed because you went quiet, and it will not interpret "looks good" on an unrelated point as a gate approval.

**Your approval is the resume signal.** The moment you approve, it records the decision and moves into the next stage in the same breath. You do not type anything to restart it.

## The long stretch: the build itself

After you approve the plan at G2, the build starts on its own. This is where most of the work happens, and it is meant to run for a long time without you.

- It works through BUILD-PLAN phases in order, writing failing tests before implementation, running the validation gate after each, and committing per task. **Phase boundaries are not stops** — it finishes one and starts the next.
- **It will not stop to ask you questions.** When it hits ambiguity it applies a decision default from the plan and logs it to `DECISIONS.md`. When something is genuinely blocked, it stubs it behind a feature flag, logs it to `OPEN-QUESTIONS.md`, and moves on.
- It stops only for what the plan declared: a live test-mode payment, anything sent in your name — and finally **G3** before production. Approve, and it resumes the phase it was in.

**If the session ends** — you close the laptop, the context runs out — type `/gantry:start` to pick it back up. It reconciles `TASK.md` against git history, tells you which phase and task it is resuming, and carries on.

**Read `DECISIONS.md` and `OPEN-QUESTIONS.md` while it runs.** That is where it records every judgement call it made instead of interrupting you. Gates summarise them, but the files are live.

## Stopping, resuming, and crashes

Every command is re-runnable and resumable, and `/gantry:start` is the one to reach for. State lives in files and git history, never in the conversation.

- **Close the laptop mid-run?** `/gantry:start` later.
- **Context cleared or compacted?** The agent re-reads `PLANNING.md`, `TASK.md`, and the current phase before touching anything.
- **Crashed?** There is no recovery procedure — crashing is just stopping. `/gantry:start`.
- **Fresh session tomorrow?** Open the project folder, `/gantry:start`. It works out the stage itself.

Re-entering a *completed* stage is safe by design: stages diff-update rather than overwrite, and nothing that has already been approved gets redone.

## Two ways to start

**You have no PRD** — the common case:

```
cd my-new-project
claude
/gantry:start
```

It interviews you (product, users, scope, market, budget), researches competitors, writes the PRD and a market-research document, renders the `.docx`, and stops at G0. Then it keeps going.

**You already have a PRD** — pass it on the command line, or drop it in the folder first:

```
cd my-new-project          # with your existing PRD file in it
claude
/gantry:start path/to/your-prd.docx
```

It converts, copies, and structure-checks it — **without editing the content**. Correcting the content is S1's job, and S1 needs your original to diff against.

## What Gantry will never do without asking

Deploy to production · move real money · send anything in your name · delete a service or data · force-push. These wait for a gate regardless of what it costs in progress.

---

## What it enforces

**PRD intake before anything else** · **TDD** — failing tests first, gates never weakened · a **no-interruption contract** — pre-flight plus decision defaults instead of mid-run questions · **living deliverable docs** (architecture, UAT, deployment, maintenance, env-vars, security) written as work happens, not in an end-of-project sprint · a **read-only UAT agent** with a separate dev-agent fix loop · **agent routing** that uses specialists from your library where they fit and Claude Code's built-in `general-purpose` agent where they don't, so delegation works with no setup at all · **two-tier memory** that improves the OS after every project.

It is brand-neutral by design: no company name is stamped on anything it generates unless you supply one, and no market's payment rails, tax rules, or privacy law are assumed as defaults.

## Why this exists

Most agent failures on real projects are not coding failures. They are: building from a spec that was wrong about the world, choosing a stack the agent cannot actually build in, stalling on a missing credential, or asking a human a question at 2am and idling until morning.

Gantry addresses each directly — a research-first PRD review, a scored stack evaluation that weights *agent buildability*, a pre-flight pass that eliminates blockers before the run, and decision defaults that resolve ambiguity by rule instead of by interruption.

---

## Before your first autonomous run

**1. Permissions — the one that actually matters.** Approval dialogs kill autonomous runs; the agent will sit waiting for a click that never comes. Pre-approve what the run needs in `~/.claude/settings.json` (or via `/permissions`):

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

Extend for your stack. `claude --dangerously-skip-permissions` also works but removes every guardrail — prefer the allowlist.

**2. A git host CLI**, authenticated, if you want S0 to create the remote for you. Optional — S0 works locally without it and logs it as a pre-flight item.

**3. A sub-agent library** in `~/.claude/agents/` — **entirely optional.** If you have one, Gantry discovers specialists in it for the *capability* roles (backend, frontend, infrastructure, security design) and never modifies it. If you don't, it delegates those roles to Claude Code's built-in `general-purpose` agent with a written role brief instead — so you still get delegation, context isolation, and parallel work with zero setup. A library buys you tuned system prompts, not the mechanism. The four **audit** roles ship with Gantry either way.

**4. An environment profile** for your deployment target. Copy `process/environments/_template.md` and fill it in once per estate you reuse. Without one, deployment details become pre-flight questions rather than guesses.

**5. A language server for your stack** — Gantry will tell you which one once the stack is chosen at G2a, and put it on the pre-flight list. You don't need to guess up front. When it asks:

```
/plugin marketplace add Piebald-AI/claude-code-lsps
/plugin install <language>-language-server@claude-code-lsps
```

The project's generated rules require using a language server over text search for symbol resolution and diagnostics — without one installed, that rule has nothing behind it.

### The four bundled audit agents

Gantry ships four agents and uses them in preference to same-role agents in your own library, because the process depends on their specific behaviour rather than on general competence:

| Agent | Why it's bundled |
|---|---|
| `uat-test-agent` | **Read-only, enforced by its tool list** — it physically cannot edit, write, or commit. An agent that can fix what it finds stops looking as hard |
| `requirements-auditor` | Traces every PRD requirement to `file:line` and reports Implemented / Partial / Stubbed / Missing / Unrequested. A generic reviewer writes a summary instead |
| `reality-checker` | Defaults to **NEEDS WORK** and refuses to pass on green tests alone |
| `code-reviewer` | Rates every finding by severity, which is what makes the phase gate's "fix ≥ medium" rule mean anything |

Everything else — backend, frontend, infrastructure, security design, architecture — is routed to a specialist in your own library where one genuinely fits, and otherwise to Claude Code's built-in `general-purpose` agent carrying a role brief Gantry writes (the phase's PRP, the PRD sections, the pattern files, the kernel's constraints). **Delegation does not depend on you installing anything.** Gantry vendors nothing from `~/.claude/`.

Expect roughly **2–4 subagents per build phase** — one or two implementers, the code reviewer, and a reality check or security review where the phase calls for it. Each phase logs its actual spend against the plan's estimate.

### Word document output (optional)

PRDs render to `.docx` for stakeholders. This is the only part of Gantry that needs a dependency — run `npm install` once, in the installed plugin directory:

```bash
# macOS / Linux
cd ~/.claude/plugins/marketplaces/gantry-marketplace && npm install
```

```powershell
# Windows
cd $env:USERPROFILE\.claude\plugins\marketplaces\gantry-marketplace ; npm install
```

Skipping it is fine — **without it everything still works and PRDs stop at markdown, which is the version of record regardless.** Styling is controlled by `skills/_shared/style-constants.js`; edit that one file to match a house style.

---

## Repo map

| Path | What |
|---|---|
| `commands/` | The eight `/gantry:*` commands |
| `process/` | The manual: lifecycle, PRD intake, no-interruption contract, agent routing, stack evaluation, quality gates, phase library, deliverables, memory, environment profile template |
| `kernel/` | Templates instantiated into each project (CLAUDE.md, PLANNING, BUILD-PLAN, PRP, docs-templates/) |
| `agents/` | The four bundled audit agents (read-only UAT tester, requirements auditor, reality checker, code reviewer) |
| `skills/` | Bundled `prd-create` and `prd-update`, plus the shared docx generator |
| `memory/` | Cross-project memory (gotchas, patterns, calibration) — written only at harvest |
| `examples/marketstall.md` | A worked example end-to-end, plus the acid-test checklist |

**New here? Read [`examples/marketstall.md`](examples/marketstall.md).** It walks a fictional project through all seven stages and shows what each one actually produces.

## Design notes

**Gates are the only stops.** Each has a defined evidence set. The agent presents evidence, states exactly what approval authorises, and waits — never proceeding on silence.

**The orchestrator never does the work.** The main agent briefs sub-agents, receives short structured results, records state, and commits — it doesn't write code, read source, or load the PRD into its own context. Each piece of work happens in a fresh context that is thrown away afterwards, so the orchestrator's context stays small and the run can keep going for hours instead of filling up and degrading halfway through a build.

**State lives in files, not conversation.** Every command is re-runnable and resumable; a crash, a context clear, or a closed laptop is just stopping.

**Memory is single-writer.** Cross-project memory is written only at harvest, which is what lets concurrent project runs coexist without conflicting.

**Wrong memory is worse than no memory.** Gantry ships with no calibration data at all rather than borrowed numbers — another team's velocity is not evidence about yours.

## Versioning

Semver. Harvest proposals bump the version; `memory/` changes ship as part of the release. Current: **v0.1.0** — the lifecycle is proven in private use, but this public packaging has not yet been run end-to-end by anyone else. Treat it accordingly.

## Licence

MIT. See [LICENSE](LICENSE).
