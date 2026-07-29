# Deliverable Documentation — catalog and rules

Docs are living artifacts with stages, generated in each project's `docs/` from `kernel/docs-templates/`. Finalisation is release work (P-RELEASE), but creation and updates happen at the stages below — an end-of-project documentation sprint is a process failure.

| Document | Template | Created | Updated | Finalised |
|---|---|---|---|---|
| PRD | authored or adopted at S-PRD | S-PRD | S1 review; on scope change (logged) | G1 |
| Market Research | `prd-create` skill | S-PRD (Route B only) | rarely | G0 |
| Architecture Document | `architecture.template.md` | S2–S3 | every structural phase | S5 |
| BUILD-PLAN | `kernel/BUILD-PLAN.template.md` | S3 | phase completions | run end |
| Env-Vars Reference | `env-vars.template.md` | S0 skeleton | every var (CI parity w/ `.env.example`) | S5 |
| Deployment Document | `deployment.template.md` | first deploy phase | infra changes | G3 |
| UAT Document | `uat.template.md` | S3 (scenarios from user stories) | per UAT round | S5 sign-off |
| Maintenance Runbook | `maintenance.template.md` | S5 | post-launch | G3 |
| Security Summary | `security.template.md` | threat-model phase | security phases | S5 |
| Release Notes | `release-notes.template.md` | S5 | per release | — |
| README | — | S0 | continuously | — |

Project-specific additions the plan generator may add: API reference (products exposing APIs), user guide (end-user products), data dictionary (data-heavy products).

## Rules

1. **Identity is the project's.** Every deliverable carries the project's `{{ORGANISATION}}` value, captured at S-PRD/S0. Blank is the default and a valid answer — a document with no company name is correct output, not a missing field. Gantry never puts its own name on a project's deliverables.
2. **docx versions** are rendered from the repo markdown by the generator bundled with the `prd-create`/`prd-update` skills (`skills/_shared/style-constants.js` controls the styling — edit it once to match a house style). **Markdown in-repo is always the source of truth**; the `.docx` is a render for stakeholders, never the master.
3. Each doc's template carries `<!-- gen: -->` notes saying when it's created/updated — the BUILD-PLAN generator wires those into phase tasks so updates are tasks, not intentions.
4. UAT executor: the read-only Test Agent (see `agent-routing.md`); its report drives the fix loop; the signed-off report is G3 evidence.
