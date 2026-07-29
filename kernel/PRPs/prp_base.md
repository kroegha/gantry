# PRP Template — Gantry (stack-agnostic; validation slots filled from the project's CLAUDE.md)

name: "phase-<n>-<slug>"
description: Phase PRP — context-rich with validation loops. Follow project CLAUDE.md globally.

## Goal
[End state for this phase — specific and verifiable]

## Why
[PRD value; what depends on this phase]

## What (success criteria)
- [ ] [Measurable outcomes, from BUILD-PLAN phase exit criteria]

## All Needed Context
```yaml
- file: <PRD path>            # sections: [exact §/FR numbers]
- file: PLANNING.md           # structure, invariants, commands
- file: [design notes]        # if UI work
- file: [env docs]            # if deploy/infra work
- memory: [Gantry memory/gotchas or patterns entries the BUILD-PLAN lists for this phase]
- file: [existing source files establishing the pattern to follow]
- url:  [official docs for any library touched — verify current major version]
- gotcha: [known quirks for this phase]
```

### Current codebase tree (relevant slice)
```bash
```

### Desired tree (files added/changed + responsibility)
```bash
```

## Implementation Blueprint

### Data models / schema first
[Validation schemas, migrations (with access policies), generated types]

### Tasks in order (TDD: each task = failing tests → implement → green)
```yaml
Task 1:
  TEST: <test path> — cases: [expected, edge, failure]
  CREATE/MODIFY: <source path>
  PATTERN: mirror [file]
Task N: ...
```

### Integration points
```yaml
MIGRATION: [path + type-regeneration command]
CONFIG: [env loader addition + .env.example + docs/env-vars.md]
ROUTES/ENTRYPOINTS: [paths]
```

## Validation Loop
```bash
# Level 1 — every task: <typecheck + lint commands from CLAUDE.md>
# Level 2 — <unit/integration test command>  (never weaken a test to pass)
# Level 3 — <build + E2E commands, if phase declares them>
# Level 4 — deployed smoke: <health-check command against first environment>
```

## Final checklist
- [ ] All gates green · [ ] Invariant checks for anything this phase touched · [ ] No hardcoded config
- [ ] TASK/DECISIONS/OPEN-QUESTIONS/LEARNINGS updated · [ ] Living docs updated (architecture, env-vars, deployment)
- [ ] Code-review agent pass · [ ] README current

## Anti-patterns
No new patterns when existing ones work · No skipped validation · No secrets in code ·
No `:latest`/unpinned versions · No free-text parsing of structured AI output · No real personal data in fixtures
