# Memory Protocol — two tiers, improving with every project

## Tier 1 — Project memory (in each project repo)

`DECISIONS.md` (choices + why) · `OPEN-QUESTIONS.md` (deferred human items) · `TASK.md` (work state) · `LEARNINGS.md` (append-only surprise log: quirks, wrong estimates, gate-failure causes, patterns that worked; one line each, tagged). Cheap to write during the run; raw ore for harvest.

## Tier 2 — Global OS memory (`Gantry/memory/`, git-versioned)

- `gotchas/<technology>.md` — verified quirks, each stamped `verified on <version/date>`
- `patterns/<domain>.md` — proven approaches worth reusing
- `calibration.md` — planned-vs-actual per phase type; common gate-failure causes
- `MEMORY.md` — one-line index

**Retrieval:** agents load only relevant entries (by stack/domain, via the index) at S2, S3, and phase starts — never the whole store.

**Staleness defence:** S1's "possible today" review re-validates any Tier-2 entries the project touches; stale entries get corrected or deleted (git history preserves them).

## The harvest loop (`/gantry:harvest`, after every project)

1. Mine Tier 1 + git history; ask the owner a short retro (what annoyed you, what would you change).
2. Classify each finding — **the global-vs-project test:** does it hold across projects and stacks?
   - Cross-project technique/quirk → Tier 2 memory
   - Stack- or domain-specific → kernel template, phase library, or gotchas file
   - Process improvement → OS process docs / command edits
   - Anything that is really about how *this owner* likes to work → their own config, proposed and never applied by Gantry
3. Produce one reviewable proposal: Tier-2 diffs + template/process edits.
4. The owner approves → apply, dedupe/update rather than append, bump the Gantry version, update calibration.

## Hard rules

1. **`~/.claude/CLAUDE.md` is never modified by Gantry**, nor is anything else outside the Gantry repo and the project repo.
2. Project-confidential content never leaves Tier 1. Tier 2 holds generalisable technique only — no client names, no customer data, no private infrastructure detail.
3. Single writer: Tier-2 writes happen only at harvest, so concurrent project runs can't conflict.
4. Wrong memory is worse than no memory — delete aggressively; the git history is the archive.
