---
description: "S6 — post-project retrospective: distil project learnings into Gantry's memory/templates as a reviewable proposal"
argument-hint: "[path to completed project folder]"
---

# /gantry:harvest — S6 Harvest

Run after every completed project (target: $ARGUMENTS or current folder). Protocol: `${CLAUDE_PLUGIN_ROOT}/process/memory.md` — the hard rules there bind absolutely (nothing outside the Gantry repo and the project repo is written; confidential content stays in the project).

## Steps

1. **Mine Tier 1**: LEARNINGS.md (primary), DECISIONS.md, OPEN-QUESTIONS.md, git history (gate failures, rework patterns, estimate vs actual per phase), UAT rounds.
2. **Short retro with the owner** (≤4 questions): what annoyed you, what would you change, what should never happen again, what worked well enough to standardise.
3. **Classify every finding** with the global-vs-project test (memory.md §harvest): Tier-2 memory / kernel-template edit / phase-library or process edit / discard.
4. **Produce one reviewable proposal** in the Gantry repo: exact diffs for memory entries (dedupe/update existing; version-stamp anything version-specific; delete stale), template/process edits, and a `calibration.md` update.
5. **The owner approves** → apply diffs, bump the Gantry version (semver), commit with a summary of what future projects gain.

Nothing is applied without approval. Wrong memory is worse than no memory.

**Never generalise a client's confidential detail into Tier 2.** Technique generalises; names, data, and private infrastructure do not.
