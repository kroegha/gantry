<!-- gen: create at S3 — scenarios derived from PRD user stories (one or more per story,
     plus cross-cutting: payments, auth, mobile, a11y, failure modes). Executed at S5 by
     the READ-ONLY UAT Test Agent. -->
# {{PROJECT_NAME}} — UAT Document

| Executor | Read-only AI Test Agent (may not modify code, config, data, or docs) |
|---|---|
| Access provided | {{ACCESS_LIST}} <!-- gen: authenticated browser session for the deployed environment, app test accounts, anything else the agent needs to exercise the product --> |
| Environment / Round | {{ENV}} / {{ROUND}} |

## Scenarios

| ID | User story | Steps | Expected | Result | Evidence |
|---|---|---|---|---|---|
| UAT-01 | {{STORY_REF}} | 1. … | … | pass/fail | screenshot/log ref |

## Exploratory passes
[Free-form: mobile viewport, slow network, invalid inputs, back-button, session expiry, concurrent use]

## Defects

| ID | Severity (blocker/major/minor) | Scenario | Reproduction steps | Expected vs actual | Status |
|---|---|---|---|---|---|

## Round summary
- Scenarios: X pass / Y fail · Blockers open: N
- Handoff: this report goes to the dev orchestrator; fixes follow the TDD loop (failing test reproducing the defect → fix → gate); the Test Agent re-verifies next round.

## Sign-off
| Round | Date | Result | Notes |
|---|---|---|---|
