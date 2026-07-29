---
description: "S-PRD — make sure a PRD exists: adopt one you already have, or author one from scratch through a guided interview"
argument-hint: "[path to an existing PRD, if you have one]"
---

# /gantry:prd — S-PRD Intake

Guarantee a PRD exists at the canonical path before the project starts. Protocol: `${CLAUDE_PLUGIN_ROOT}/process/prd-intake.md` — follow it exactly. $ARGUMENTS may supply the path to an existing PRD.

## Steps

1. **Check for an existing canonical PRD** (`docs/*_PRD_v*.md`). If one exists, this is a re-run: ask whether to adopt a replacement, revise it (`prd-update`), or leave it — then act on the answer. Never overwrite silently.
2. **Ask the branch question** unless $ARGUMENTS already answered it: *do you have a PRD?* Use AskUserQuestion. Accept "partial" as an answer — adopt what exists, interview only over the gaps.
3. **Route A — a PRD was supplied:** read it in full, convert to markdown if needed, copy (never move) to `docs/{{PRODUCT_NAME}}_PRD_v{{VERSION}}.md`, record the source path in `DECISIONS.md`, run the structural coverage check, render the `.docx` if absent. **Do not fact-check or improve the content — that is S1.**
4. **Route B — no PRD:** invoke the bundled **`prd-create`** skill and follow its workflow (interview → market research → generation → review loop). Capture in the first pass: product name, `{{ORGANISATION}}` (blank is valid and default), and the target market/jurisdiction. Write outputs to the canonical paths.
5. **Gate G0**: run `/gantry:gate G0` — present the PRD, how it got there, structural coverage, gaps, and market research if any. State plainly that approval means *this is the input document*, not that its contents are verified — verification is G1.
6. **Report**: PRD path and version, what is missing, and the next step: `/gantry:init <prd-path>`.

## Rules

- This stage is allowed to ask as many questions as it needs — it is the reason the autonomous run can hold its no-interruption promise. Every other stage inherits the opposite rule.
- Never invent requirements the owner did not state. An unanswered question is a G0 gap, not a gap you fill.
- No secrets in the PRD, ever — not even example credentials.
- Markdown is the source of truth; `.docx` is a render for stakeholders.
