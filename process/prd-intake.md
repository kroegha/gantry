# PRD Intake (S-PRD) — the stage before the OS has anything to work with

Gantry builds from a PRD. This stage guarantees one exists, at a known path, in a known shape, before S0 touches anything. Two routes in, one artifact out.

## The branch

The first question of every new project, asked once:

> **Do you already have a PRD for this product?**

| Answer | Route |
|---|---|
| Yes, here it is | **Route A — Adopt** |
| No / only notes, a brief, a deck, a conversation | **Route B — Author** |
| Something in between (a partial spec) | Adopt it via Route A, then run Route B's interview **only** over the gaps it leaves |

Never guess which route applies. Never start writing a PRD for someone who already has one, and never proceed into S0 without one.

## Canonical location and name

Both routes converge here. This is the path S0, S1, and every downstream PRP reference:

```
docs/{{PRODUCT_NAME}}_PRD_v{{VERSION}}.md      ← spec of record, markdown is truth
docs/{{PRODUCT_NAME}}_PRD_v{{VERSION}}.docx    ← rendered for stakeholders
docs/{{PRODUCT_NAME}}_MarketResearch_v1.0.md   ← Route B only
```

`{{PRODUCT_NAME}}` is PascalCase with no spaces (`ShopFront`, `LedgerLite`). `{{VERSION}}` starts at `1.0` and is bumped by S1's review, not here.

## Route A — Adopt an existing PRD

1. **Locate and read it in full.** Accept `.md`, `.docx`, `.pdf`, or plain text. Never work from the filename or a summary.
2. **Convert to markdown** if it is not already — markdown in the repo is always the source of truth. Preserve section numbering, tables, and annexures; note anything that did not survive conversion.
3. **Copy, don't move.** The owner's original stays where it was. Record the source path in `DECISIONS.md` **if the kernel already exists**; in an empty folder S-PRD runs before S0 creates it, so put the source path in the G0 report instead and S0 carries it into `DECISIONS.md` at bootstrap. Do not create kernel files early to have somewhere to write.
4. **Rename to the canonical form.** If the document carries its own version, keep it; otherwise `v1.0`.
5. **Structural sanity check** — not a content review, that is S1's job. Report what is present and what is missing against the section list in `${CLAUDE_PLUGIN_ROOT}/skills/prd-create/references/section-templates.md`. Missing sections are logged as G0 evidence, never silently filled in.
6. **Render the `.docx`** if one was not supplied.

**Do not fact-check, correct, improve, or restructure the content here.** S1 (`/gantry:review-prd`) is the stage that verifies the PRD against current reality, and it needs the original to diff against.

## Route B — Author a PRD from scratch

Delegate to the bundled **`prd-create`** skill, which owns the method: structured interview → market research → document generation → review loop. Gantry's additions to it:

1. **Product name first.** Everything else is named after it.
2. **Capture `{{ORGANISATION}}`** in the same pass — the name that appears on generated deliverables. Blank is a valid answer and the default; Gantry stamps nothing if nothing is given.
3. **Capture the target market/jurisdiction** — not to bake anything in, but because payment rails, company registries, tax treatment, and privacy law are all per-market and S1 must know which market to verify against. See `memory/gotchas/jurisdiction.md`.
4. **Research is web-verified and sourced.** The market-research document carries a sources section. Unsourced competitive claims do not go in.
5. **Iterate to the owner's satisfaction** before G0. This is the one place in Gantry where an unbounded human loop is correct.

## Interruption boundary

S-PRD is interview-driven and stops as often as it needs to. That is not a violation of the no-interruption contract — it is the reason the contract can hold later. Every ambiguity resolved here is one that cannot stall the autonomous run.

Two hard boundaries:

- **`/gantry:run` can never reach this stage.** If the run finds the PRD inadequate, it applies decision defaults and logs to OPEN-QUESTIONS like any other ambiguity. It does not reopen the PRD.
- **S-PRD ends at G0.** After that the PRD changes only through S1's review or an explicit `prd-update` cycle the owner asks for — never as a side effect of building.

## G0 evidence set

Present at the gate, then wait:

| Item | Content |
|---|---|
| The PRD | Canonical path, version, how it got there (adopted from `<path>` / authored here) |
| Structural coverage | Sections present; sections absent and why that is or isn't acceptable |
| Market research | Route B only — competitors found, differentiation, sources |
| Interview record | Route B only — what was asked, what the owner answered, what was assumed |
| Known gaps | Everything deferred to S1 or logged to OPEN-QUESTIONS |
| What approval means | "This document is the input the project will be built from." It is **not** a correctness sign-off — that is G1, after the fact-check. |

## Re-runs

`/gantry:prd` is re-runnable like every other Gantry command. On re-run it detects an existing canonical PRD and asks whether to adopt a replacement, revise the current one (`prd-update`), or leave it alone. It never overwrites a PRD without saying so first.
