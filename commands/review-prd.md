---
description: "S1 — research-first PRD review: verify everything against what's possible today, produce PRD vNext"
argument-hint: "[prd-path if not the kernel default]"
---

# /gantry:review-prd — S1 PRD Review

Review the project's PRD against **current reality** — the stage that catches discontinued vendors, stale model names, changed regulations, and APIs that don't exist as specced. $ARGUMENTS may override the PRD path.

Read first: project `PLANNING.md`; `${CLAUDE_PLUGIN_ROOT}/process/lifecycle.md`; relevant `${CLAUDE_PLUGIN_ROOT}/memory/` entries via its MEMORY.md index (also **re-validate any memory entries this project touches** — flag stale ones).

## Protocol

1. **Extract every external claim** from the PRD: vendors/services, APIs and their capabilities, model/library names + versions, prices/fees, regulations, market facts, names of institutions.
2. **Web-verify each** — current sources, cited. Training-data confidence is not verification. Prioritise: things that block architecture (payment rails, critical APIs), then costs, then content facts. **Verify against the project's declared market**, not a default one — availability, fees, and law all vary by jurisdiction (`${CLAUDE_PLUGIN_ROOT}/memory/gotchas/jurisdiction.md`).
3. **Check internal consistency**: scope tables vs FRs, schema vs features, budget arithmetic, version contradictions, legally risky content (fabricated testimonials, unlicensed claims).
4. **Capability upgrades**: what's newly possible that the PRD predates (cheaper models, new provider tools, platform features) — recommend, don't silently add.
5. **Write the review**: `docs/reviews/PRD-review.md` — findings by severity (critical corrections / updates / recommendations / consistency fixes), each with sources. Sources section mandatory.
6. **Produce PRD vNext** by handing the review to the bundled **`prd-update`** skill: the current PRD is its original, `docs/reviews/PRD-review.md` is its change document. Its 5-phase methodology does the document surgery — cataloguing changes, detecting conflicts, versioning, regenerating markdown + `.docx`. For anything needing the owner's judgement, present options in the review doc instead of deciding.
7. **Gate G1**: run `/gantry:gate G1` — present the review summary + PRD diff; the owner signs off the PRD as spec of record (possibly after answering option questions).

## Rules

- Never soften a finding to avoid rework — wrong PRDs compound.
- A finding without a source is not a finding.
- Log every correction category to LEARNINGS (they calibrate future S1 effort).
