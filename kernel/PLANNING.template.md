<!-- gen: instantiate at S0 with PRD-derived content; fill stack rows after G2a;
     keep every table row that applies, delete ones that don't. -->
# {{PROJECT_NAME}} — PLANNING.md

> Read this at the start of every session. This folder is the app repo root.

## What we're building

{{ONE_PARAGRAPH_PRODUCT_SUMMARY}} Spec of record: **`{{PRD_PATH}}`**.

Target market(s): {{TARGET_MARKETS}} <!-- gen: from the PRD; drives what S1 verifies and what compliance applies -->

## Stack (decided at G2a — do not relitigate; ADR-001 records why)

| Layer | Choice |
|---|---|
{{STACK_TABLE}}
| Testing | {{TEST_STACK}} — TDD mandatory |
| CI/CD | {{CICD}} |
| Hosting | {{HOSTING}} (see `{{ENV_DOCS_PATH}}`) |
| Local dev | {{LOCAL_DEV}} |

## Repo structure (target)

```
{{STRUCTURE_TREE}}
```

## Core invariants

<!-- gen: derive from PRD risk areas + environment profile; number them; these are
     the non-negotiables every phase gate re-checks. Typical shapes: access control
     defined in the same migration as the table; a single atomic function for value
     mutations; grants only via signature-verified webhooks; config-not-code for
     anything that drifts; coverage floor on critical paths; disclaimers appended
     server-side so they cannot be bypassed by a client. -->
{{INVARIANTS_LIST}}

## Key documents

| Doc | Use |
|---|---|
| `{{PRD_PATH}}` | Feature spec of record |
| `BUILD-PLAN.md` | Phase order, gates, agent routing, decision defaults |
| `docs/architecture.md` | C4 views + ADR index |
| `docs/env-vars.md` | Every env var: purpose, secret?, where set/obtained |
| `{{ENV_DOCS_PATH}}` | Deployment target truth |
{{EXTRA_DOC_ROWS}}

## Validation commands

```bash
{{VALIDATION_COMMANDS}}
```

## Naming conventions

{{NAMING_CONVENTIONS_LINE}}
