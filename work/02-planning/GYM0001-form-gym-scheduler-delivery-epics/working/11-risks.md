# Risks and Dependencies

## Risk Assessment

| Risk | Category | Likelihood | Impact | Mitigation |
|------|----------|------------|--------|------------|
| Refresh cookie or CORS configuration is incorrect in local browsers. | Security / UX | Medium | High | Keep same-origin/local configuration simple, test refresh rotation with Supertest and Playwright, and document browser setup. |
| Ownership checks are omitted from one schedule mutation path. | Security | Medium | High | Centralize authenticated user context and add cross-user integration tests for every protected operation. |
| JSON writes are corrupted or lost during simultaneous requests. | Data Model / Operations | Medium | Medium | Explicitly document single-process limitation, serialize prototype writes where practical, and defer deployment until durable persistence is designed. |
| Prototype data model diverges from future PostgreSQL migration needs. | Data Model | Low | Medium | Keep stable domain types and repository interfaces; record migration boundary and avoid adapter-specific rules in controllers. |
| Feature scope expands beyond the simple demo. | UX / Dependencies | Medium | Medium | Keep registration, analytics, completion tracking, sharing, and deployment as non-goals; trace work to the four approved epics. |
| Toolchain setup slows the first runnable demo. | Dependencies / Operations | Medium | Medium | Use the smallest workspace and dependency set, establish scripts first, and run quality checks incrementally. |
| Browser accessibility or responsive behavior is discovered late. | UX | Medium | Medium | Add RTL, Playwright, keyboard, and axe coverage for login and the seven-card board from the first UI slice. |
| Provider, region, privacy, and production persistence decisions remain open. | Operations / Compliance | High | Medium | Keep deployment deferred; track BLK-003 and resolve it before public deployment. |
| Prototype scale requirements are exceeded. | Performance | Low | Medium | Treat local single-process performance as sufficient for demo scope and measure before any deployment decision. |

## Dependencies

### Blocking (must complete first)

- [x] No blocking tasks. Approved product, architecture, testing, and DevOps artifacts are available.

### Dependent (depends on this task)

- [ ] Follow-on implementation tasks for EPIC-GYM-001 through EPIC-GYM-004 depend on this planning bridge.
- [ ] Local demo and future deployment planning depend on the implementation tasks produced from the epics.

### Related (shared context)

- [ ] BLK-003 in the [blocker register](../../../../explore/hlds/gym-scheduler-blocker-register.md) tracks deployment provider, region, privacy, and production configuration; it does not block local prototype development.

## Validation Against Research

- [x] No conflicts with accepted ADRs or the approved HLD were found.
- [x] Dependencies align with the research inventory and four-epic boundary map.
- [x] No stale implementation tasks or external integration dependencies were found.

### Conflicts/Gaps Found

| Issue | Description | Resolution |
|-------|-------------|------------|
| Production persistence | PostgreSQL and deployment details remain intentionally unresolved. | Keep them outside prototype implementation and require resolution before deployment. |
| Demo credentials | Exact local values are not specified. | Define safe development-only values in the authentication implementation task; never commit production secrets. |
| Optional field ranges | Detailed ranges are not yet product-defined. | Use simple documented prototype validation and cover it with API tests. |

