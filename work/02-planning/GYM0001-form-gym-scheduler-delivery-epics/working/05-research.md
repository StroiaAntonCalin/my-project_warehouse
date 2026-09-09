# Research Findings

## Search Terms

- JSON repository
- authentication and session
- weekly schedule / seven days
- exercise ordering and CRUD
- typed REST API

## Decision Inventory

| Decision ID | Status | Key Requirement | Link |
|-------------|--------|-----------------|------|
| ADR-001 | Accepted | Use a NestJS modular monolith with Identity & Access, Schedule Management, REST API, and Repository modules. | [ADR-001](../../../../explore/decisions/gym-scheduler-adr-001-modular-monolith.md) |
| ADR-002 | Accepted | Use a version-controlled JSON mock-data file behind a repository interface; defer PostgreSQL. | [ADR-002](../../../../explore/decisions/gym-scheduler-adr-002-json-repository.md) |
| ADR-003 | Accepted | Use a typed REST client and local React state; do not add a client caching framework. | [ADR-003](../../../../explore/decisions/gym-scheduler-adr-003-typed-rest-client.md) |
| ADR-004 | Accepted | Keep short-lived access JWTs in memory and rotating refresh tokens in Secure, HttpOnly, SameSite cookies. | [ADR-004](../../../../explore/decisions/gym-scheduler-adr-004-secure-session.md) |

## Related Tasks

No other implementation or completion tasks exist. The current task is the planning bridge for the approved delivery epics.

| Task ID | Status | Relationship | Link |
|---------|--------|--------------|------|
| GYM0001 | Planning | Forms the delivery epics that will become follow-on implementation work. | [Task](../task.md) |

## Documentation References

| Document | Relevance | Link |
|----------|-----------|------|
| Product requirements | Defines login, one schedule, seven day cards, and exercise behavior. | [PRD](../../../../explore/prds/gym-scheduler-prd.md) |
| High-level design | Defines modules, API, data model, and local runtime shape. | [HLD](../../../../explore/hlds/gym-scheduler-hld.md) |
| Boundary map | Defines ownership and dependency flow between Identity and Schedule Management. | [Boundary map](../../../../explore/hlds/gym-scheduler-boundary-map.md) |
| Test strategy | Defines Vitest/RTL, Jest/Supertest, Playwright, axe, and coverage expectations. | [Test strategy](../../../../explore/explore-gym-scheduler/test-strategy.md) |
| DevOps strategy | Defines the lean local/CI quality gates and deferred deployment stages. | [DevOps strategy](../../../../explore/explore-gym-scheduler/devops-strategy.md) |
| Epic index | Defines the four approved delivery boundaries. | [Epic index](../../../../explore/epics/README.md) |

## Conflicts and Gaps

| Conflict/Gap | Description | Resolution |
|--------------|-------------|------------|
| No blocking conflict | The accepted ADRs agree with the approved PRD, HLD, test strategy, and JSON-only prototype constraint. | Carry the decisions into implementation task plans. |
| Demo credentials | Exact seeded usernames, passwords, and roles are not yet specified. | Choose non-secret local demo values during authentication task planning and document them safely. |
| Exercise validation ranges | Optional numeric field ranges are not fully specified. | Define simple prototype ranges in the exercise domain task and cover them with tests. |
| JSON write concurrency | The repository is intentionally single-process and does not provide production concurrency guarantees. | Keep the limitation explicit; defer durable persistence before deployment. |
| Completion tracking | The membership-value metric is documented, but workout completion is not required for the first CRUD demo. | Keep completion tracking outside the first implementation slice unless product scope changes. |

