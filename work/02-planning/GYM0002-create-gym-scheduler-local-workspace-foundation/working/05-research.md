# Research Findings

## Search Terms

- React and NestJS workspace
- JSON repository
- shared TypeScript contracts
- local test harness
- `/api/v1` health endpoint

## Decision Inventory

| Decision ID | Status | Key Requirement | Link |
|-------------|--------|-----------------|------|
| ADR-001 | Accepted | Use a NestJS modular monolith with explicit module boundaries. | [ADR-001](../../../../explore/decisions/gym-scheduler-adr-001-modular-monolith.md) |
| ADR-002 | Accepted | Use a version-controlled JSON file behind repository interfaces; defer PostgreSQL. | [ADR-002](../../../../explore/decisions/gym-scheduler-adr-002-json-repository.md) |
| ADR-003 | Accepted | Use typed API contracts and lightweight React state; avoid unnecessary caching infrastructure. | [ADR-003](../../../../explore/decisions/gym-scheduler-adr-003-typed-rest-client.md) |

## Related Tasks

| Task ID | Status | Relationship | Link |
|---------|--------|--------------|------|
| GYM0001 | Completed | Produced the approved delivery epics and technical handoff that define this foundation slice. | [Completed plan](../../../../work/06-completed/GYM0001-form-gym-scheduler-delivery-epics/plan.md) |
| GYM0002 | Planning | Current task; establishes the workspace and quality foundation. | [Task](../task.md) |

No other implementation, active, or completion tasks exist.

## Documentation References

| Document | Relevance | Link |
|----------|-----------|------|
| Quality Foundation epic | Defines JSON repository, typed contracts, tests, accessibility, and CI foundation ownership. | [Epic](../../../../explore/epics/EPIC-GYM-004-quality-foundation.md) |
| HLD | Defines the modular monolith and local runtime boundaries. | [HLD](../../../../explore/hlds/gym-scheduler-hld.md) |
| Test strategy | Defines unit/integration tools and coverage expectations. | [Test strategy](../../../../explore/explore-gym-scheduler/test-strategy.md) |
| DevOps strategy | Defines lean local/CI checks and deferred deployment. | [DevOps strategy](../../../../explore/explore-gym-scheduler/devops-strategy.md) |

## Conflicts and Gaps

| Conflict/Gap | Description | Resolution |
|--------------|-------------|------------|
| Historical database references | Earlier session notes mention PostgreSQL, but the accepted ADR explicitly removes database runtime from the prototype. | Follow ADR-002 and use JSON only. |
| Workspace package layout | The approved artifacts require frontend/backend separation but do not prescribe exact folders or package manager scripts. | Choose the smallest conventional layout during technical refinement and document it in plan.md. |
| Shared contract location | The HLD requires typed boundaries but does not mandate a shared package mechanism. | Choose a low-coupling shared contract location and verify imports in tests. |
| Browser E2E timing | Playwright is required by the broader strategy, but this foundation has no feature UI yet. | Establish test command/configuration only as needed; exercise full browser flows in later feature tasks. |

