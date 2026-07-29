<!-- gen: create at S5; finalised at G3; the post-launch operator's manual. -->
# {{PROJECT_NAME}} — Maintenance & Operations Runbook

## 1. Routine operations
| Task | Frequency | How | Verify |
|---|---|---|---|
| Backups | daily | {{BACKUP_JOB}} | restore test {{CADENCE}} |
| Dependency updates | {{CADENCE}} | update → full gate → deploy to non-production → verify → production | CI green |
| Cert/domain renewals | auto (verify) | {{TLS_MECHANISM}} | expiry monitor |
| Cost review (API/infra) | monthly | {{COST_SOURCES}} | vs budget in BUILD-PLAN |

## 2. Monitoring & alerts
Error tracking ({{ERROR_TOOL}}) · uptime/health checks · usage analytics · what "normal" looks like · alert destinations

## 3. Incident response
1. Assess (severity, blast radius) → 2. Stabilise (rollback per deployment.md §8 is the default move) → 3. Diagnose (logs: {{LOG_LOCATIONS}}) → 4. Fix via TDD loop → 5. Post-incident note in LEARNINGS.md

## 4. Known failure modes
<!-- gen: from OPEN-QUESTIONS + risk register + anything hit during the build -->
| Symptom | Likely cause | Remedy |
|---|---|---|

## 5. Upgrade paths & pinned versions
What is pinned and why (link gotchas) · safe-upgrade procedure · things that must never be bumped casually

## 6. Access inventory
Who/what has access to production systems (services, dashboards, keys — names and locations, never values)
