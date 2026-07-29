<!-- gen: create at first deploy phase; update on infra changes; finalised at G3.
     Mirror the structure of the project's own environment guide where it has one. -->
# {{PROJECT_NAME}} — Deployment Document

## 1. App overview
Name · purpose · framework/runtime · repo URL

## 2. Hosting service
Platform ({{PLATFORM}}) · service type · source/build method · container port

## 3. Domains & TLS
| Env | Domain | DNS | Cert |
|---|---|---|---|

## 4. Environment variables
See `docs/env-vars.md` (source of truth). Summary of where each environment's values are actually set.

## 5. Data layer usage
Database/schema · tables created · access policies · functions · storage · migrations + how to run them

## 6. Resources
CPU/RAM expectations · volumes/persistent storage

## 7. Health & readiness
Endpoints/commands the platform probes · expected responses

## 8. Deploy & rollback
Deploy steps (per env, non-production first) · rollback procedure (previous image tag / prior-commit redeploy) · **backup job: what, where, schedule, and how a restore is verified**

## 9. Post-deploy verification
Checklist: URL 200, auth flow, key journeys, webhook reachability, error tracking receiving events
