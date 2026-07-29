<!-- gen: create at S2–S3; update in every phase that changes structure; finalise at S5. -->
# {{PROJECT_NAME}} — Architecture Document

| Owner | {{ORGANISATION}} <!-- gen: blank if the project declared none; leave the row empty rather than inventing a name --> |
|---|---|
| Status / Last updated | {{STATUS}} / {{DATE}} |

## 1. System context (C4 L1)
[Who uses it, what external systems it talks to — diagram + one paragraph]

## 2. Containers (C4 L2)
[Deployable units, data stores, external services — diagram + responsibilities table]

## 3. Key components (C4 L3, critical paths only)
[Money path, auth path, core domain — one diagram each where non-obvious]

## 4. Data model
[Schema overview; link to migrations; access-control model]

## 5. Cross-cutting concerns
[Auth/session model · error handling · observability · i18n · rate limiting · caching]

## 6. ADR index
| # | Decision | Status | Link |
|---|---|---|---|
| ADR-001 | Stack selection | Accepted (G2a) | [link] |

## 7. Deployment view
[Environments, topology — link to deployment.md as source of truth]
