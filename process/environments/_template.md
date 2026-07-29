<!-- gen: copy to process/environments/<estate-name>.md and fill in, once per deployment
     estate you reuse across projects. A project's own environment guides always override
     this profile — copy those into the project's docs/env/ at S0. This file fills gaps
     and sets conventions; it is not a substitute for per-project deployment truth. -->
# Environment Profile — {{ESTATE_NAME}}

Gantry ships no environment profile of its own. Deployment targets are yours to describe; without one, S2 scores "environment fit" as unknown and S3 puts the missing detail in pre-flight rather than guessing.

## Shape

| Layer | Convention |
|---|---|
| Orchestration | {{ORCHESTRATION}} <!-- e.g. platform-as-a-service, container orchestrator, plain VPS + compose --> |
| Deploy model | {{DEPLOY_MODEL}} <!-- what triggers a deploy, where env vars are set, autodeploy branch --> |
| Ingress | {{INGRESS}} <!-- reverse proxy, TLS issuance, hostname convention per environment --> |
| Backend/data | {{BACKEND}} <!-- database and managed services; shared or dedicated --> |
| Local dev | {{LOCAL_DEV}} |
| Environments | {{ENVIRONMENT_LIST}} <!-- e.g. TEST then PROD; name them and state the promotion order --> |

## Data rules

<!-- gen: the non-negotiables every phase gate re-checks. If the datastore is shared with
     other applications, these are the rules that stop one project damaging another —
     table prefixes/namespacing, row-level access control in the creation migration,
     no cross-application schema access. If it is dedicated, say so and simplify. -->
{{DATA_RULES}}

## Secrets & env conventions

- Where secrets live per environment: {{SECRETS_LOCATIONS}}
- What must never be committed: `.env*` (except `.env.example`), credentials, tokens, private keys.
- Version pinning policy: {{PINNING_POLICY}} <!-- no `:latest` in any environment that matters -->

## Backup & recovery

{{BACKUP_POLICY}} <!-- Any stateful store gets a backup job in P-BOOTSTRAP. State the schedule,
                       destination, retention, and how a restore is tested. An untested backup
                       is not a backup. -->

## Known estate gotchas

<!-- gen: things that have bitten you on this estate specifically, each stamped with the
     version/date verified. Promote anything that generalises beyond this estate to
     memory/gotchas/<technology>.md instead. -->
{{ESTATE_GOTCHAS}}
