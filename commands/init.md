---
description: "S0 Bootstrap — set a project up from a PRD in an empty folder: kernel, git, remote, pre-flight"
argument-hint: "<path-to-PRD> [additional docs: env guides, design template, ...]"
---

# /gantry:init — S0 Bootstrap

You are bootstrapping a new project in the current folder using Gantry. Inputs: $ARGUMENTS (first argument = PRD path; further arguments = supporting docs).

Read first: `${CLAUDE_PLUGIN_ROOT}/process/lifecycle.md`.

## Steps

1. **Validate**: current folder is empty or contains only the provided input docs. **If no PRD is supplied or found at the canonical path, do not stop with an error — route to S-PRD:** run `/gantry:prd` (`${CLAUDE_PLUGIN_ROOT}/process/prd-intake.md`), then resume here with the PRD it produced.
2. **Read all inputs** fully: PRD, environment guides (if none, note that no environment profile exists and treat deployment target as a pre-flight item), design template (note it for the kernel's design section), any extras.
3. **Inventory agents**: read `~/.claude/AGENT-INDEX.md` if present (fallback: list `~/.claude/agents/` + frontmatter). No library is a valid state — record it and route work unaided.
4. **ONE structured gap interview** (AskUserQuestion, ≤6 questions, only genuine gaps): typically — `{{ORGANISATION}}` for deliverables if not already captured, compliance/jurisdiction context, budget ceilings (API + infra), domains/hostnames, deadline pressure, existing accounts/keys status, extra always-approve gates beyond money/PROD/comms.
5. **Instantiate the kernel** from `${CLAUDE_PLUGIN_ROOT}/kernel/` templates (follow each template's `<!-- gen: -->` notes; fill every `{{...}}`; stack-specific slots get "TBD at G2a" markers, not guesses):
   - `CLAUDE.md`, `PLANNING.md`, `TASK.md`, `DECISIONS.md`, `OPEN-QUESTIONS.md`, `LEARNINGS.md`
   - `PRPs/templates/prp_base.md` (copy)
   - `docs/` structure: the PRD stays at its canonical path; add `docs/env/`, `docs/design/`, `docs/spikes/`, and seed `docs/env-vars.md`
   - If S-PRD reported a PRD source path (adopted from elsewhere), record it in `DECISIONS.md` now — S-PRD had no kernel to write it to
   - If a design template was provided: write `docs/design/DESIGN-NOTES.md` — review it (tokens, strengths, gaps, a11y flags, porting map) before any UI work exists.
6. **Pre-flight checklist**: generate per `${CLAUDE_PLUGIN_ROOT}/process/no-interruption-contract.md` §1 into `OPEN-QUESTIONS.md` (or a BUILD-PLAN placeholder) — every account/key/service only the owner can provide.
7. **Git + remote**:
   - Write `.gitignore` FIRST (env files, node_modules/build dirs, OS cruft; verify no secrets staged).
   - `git init` → initial commit (`chore: bootstrap <project> with Gantry v<version>`).
   - If a git host CLI is authenticated, offer to create the remote and push (private by default). If not, log it to OPEN-QUESTIONS, continue locally, push later. Never create a public repo without asking.
8. **Report**: kernel files created, repo URL, pre-flight items needing the owner, and next step: `/gantry:review-prd` → Gate G1.

## Rules

- Never invent facts for template slots — mark TBD and log. The PRD is not yet reviewed; do not "fix" it here (that's S1).
- `{{ORGANISATION}}` blank means blank. Do not substitute a placeholder company name.
- No secrets in any file, ever.
- This command is re-runnable: if a kernel exists, diff-update rather than overwrite, and say what changed.
