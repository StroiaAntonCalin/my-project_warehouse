# Test Strategy: GYM_SCHEDULER

| Version | Date | Author | Changes |
|---|---|---|---|
| 0.1 | 2026-09-09 | Explore Agent / Calin | Initial strategy |

## 1. Overview

### Purpose

Define the automated quality approach for the React/NestJS prototype, grounded in R-001–R-009 and NFR-001–NFR-010. [OBS]

### Scope

- **In scope**: authentication, authorization, seven-card schedule retrieval, exercise CRUD, save/reload persistence, errors, accessibility, responsiveness, API, JSON repository, and critical user journeys. [OBS]
- **Out of scope**: production database migration, production infrastructure, third-party integrations, offline mode, and full load testing. [OBS]

### Guiding Principles

1. Pyramid first: many fast unit tests, fewer integration tests, minimal E2E tests.
2. Automate every repeatable check; manual work is exploratory only.
3. Push assertions to the lowest useful layer.
4. Keep tests isolated and deterministic.
5. Treat targets as floors, not ceilings.

### Risk Posture

MVP / experimental. Authentication, ownership, persistence, and save recovery receive the deepest coverage. [OBS]

### Source Documents

- [PRD](../prds/gym-scheduler-prd.md)
- [HLD](../hlds/gym-scheduler-hld.md)
- [ADR directory](../decisions/)
- [Accessibility specification](../design/accessibility-gym-scheduler.md)

## 2. Testing Pyramid

```text
             E2E 5–10%: five critical journeys
          Integration 20–30%: API/repository boundaries
       Unit 70–80%: domain, auth, validators, components
```

| Layer | Target | Estimated duration |
|---|---:|---:|
| Unit | 70–80% of tests | < 2 minutes |
| Integration | 20–30% | < 10 minutes |
| Contract | 0% — not applicable | — |
| E2E | 5–10% | < 30 minutes |

Red flags: unit share below 60%, E2E share above 15%, pipeline above 30 minutes, or flaky tests above 1%.

## 3. Unit Testing

A unit is one React component, helper, validator, NestJS service, or domain function isolated from network, filesystem, and external state. [INF]

Tooling: Vitest + React Testing Library for frontend; Jest for backend; native TypeScript mocks/builders; V8/Istanbul coverage. [OBS]

Coverage floors: 90% line, 85% branch for business logic, and 95% public-interface function coverage. Auth and ownership logic target 95% line and 90% branch. [INF]

Priority scopes:

| Component | Unit focus | Priority |
|---|---|---|
| Identity & Access | password verification, token claims, refresh rotation, logout, guards | High |
| Schedule Management | one-schedule rule, seven cards, ownership, exercise validation/order | High |
| Repository adapter | mapping and error handling through ports/mocks | High |
| REST/API contracts | DTO validation and response mapping | High |
| React UI/client | forms, seven-card rendering, loading/saved/error states | Medium/High |

Use Arrange-Act-Assert, independent factories, and `should_[expected]_when_[condition]` naming.

## 4. Integration Testing

Integration tests cross one boundary at a time using Jest/Supertest and temporary JSON fixtures. [OBS]

| Boundary | Approach | Required coverage |
|---|---|---|
| REST API ↔ Identity | HTTP test module and seeded fixture | happy, invalid credentials, expired token |
| REST API ↔ Schedule | HTTP test module and auth context | owner access, foreign access, validation errors |
| Schedule ↔ JSON repository | temporary copied JSON file | read, write, malformed file, restart-visible save |
| React client ↔ API | MSW or local API test server | success, 4xx, 5xx, refresh behavior |

Every boundary has at least one happy, error, and edge-case test. No database, queue, or external API integration exists in the prototype. [OBS]

## 5. Contract Testing

Not applicable. The system is one modular monolith, so controller/service/repository integration tests and typed shared contracts provide sufficient API confidence. [OBS]

## 6. E2E Testing

Framework: Playwright across Chromium, Firefox, and WebKit. Avoid fixed sleeps; use condition-based waits. [OBS]

| # | Journey | Risk | Automated |
|---|---|---|---|
| 1 | Login and load exactly seven weekday cards | High | Yes |
| 2 | Add, edit, remove, and save an exercise | High | Yes |
| 3 | Logout and reject protected access | High | Yes |
| 4 | Recover from invalid input and failed save | High | Yes |
| 5 | Refresh/re-login and verify persisted data | High | Yes |

Target flaky rate is below 1%; flaky tests are quarantined and fixed within one sprint. [INF]

## 7. Non-Functional Testing

- Performance: local timing checks for NFR-001 (<2 seconds) and NFR-002 (page readiness <3 seconds); full load testing deferred. [OBS]
- Security: dependency audit plus tests for password hashing, cookie flags, invalid/expired tokens, ownership, secret/log redaction. [OBS]
- Accessibility: axe-core automated checks plus keyboard and screen-reader review against WCAG 2.2 AA. [OBS]
- Compatibility: Playwright browser matrix for current Chrome, Edge, Firefox, and Safari; responsive widths including approximately 320px. [OBS]

## 8. Test Data and Environments

| Layer | Data approach |
|---|---|
| Unit | Per-test factories/builders; no shared mutable state |
| Integration | Temporary JSON fixture copy reset per test |
| E2E | Version-controlled seeded demo users and schedules |

No real personal or production-derived data is used. [OBS]

| Environment | Purpose | Status |
|---|---|---|
| Local | unit, integration, browser tests | Active |
| CI/GitHub Actions | lint, unit, integration, build, selected E2E | Planned |
| Staging | E2E/performance/security | Deferred for prototype |
| Production | smoke tests | Deferred |

## 9. CI/CD Integration

```text
Push → lint/unit → integration → build → future E2E/NFR → future smoke
```

| Stage | Trigger | Gate |
|---|---|---|
| Lint + unit | every push/PR | 100% pass, coverage floors, zero lint errors |
| Integration | every PR | 100% pass, boundary cases present |
| Build | merge to main | frontend/backend builds succeed |
| E2E/NFR | future deployable environment | 100% critical journeys, NFR targets |
| Smoke | future production deploy | 100% critical checks |

Critical/high dependency vulnerabilities block merges. Failed gates block the relevant merge or promotion. Flaky tests are quarantined, tracked, and fixed rather than ignored. [INF]

## 10. Metrics and Success Criteria

Technical floors: 90% line, 85% branch, 95% public-interface function coverage; 100% critical E2E journeys; 100% integration boundaries with happy/error/edge tests. [INF]

Speed: unit <2 minutes, integration <10 minutes, E2E <30 minutes, full pipeline <20 minutes. Quality: flaky ratio <1%, defect escape <3%, test maintenance <20% of development time. [INF]

Product validation follows the PRD: 4/5 testers understand the board, 4/5 complete core tasks, 100% authorization tests pass, 100% successful saves persist, and 3/5 report usefulness. [OBS]

Deployment frequency, lead time, change failure rate, and MTTR become measurable after deployment exists. [ASM]

## 11. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Auth/ownership defect | High | Deep unit, integration, negative API, and E2E coverage |
| JSON fixture drift or concurrent writes | Medium | Reset fixtures, single-process declaration, repository seam |
| Flaky browser tests | Medium | Stable selectors, condition waits, quarantine policy |
| Accessibility regression | Medium | axe checks, keyboard review, browser matrix |
| Coverage slows prototype delivery | Low/Medium | Apply floors to business logic; keep E2E narrow |

## 12. References

| Document | Path |
|---|---|
| PRD | `explore/prds/gym-scheduler-prd.md` |
| HLD | `explore/hlds/gym-scheduler-hld.md` |
| ADRs | `explore/decisions/gym-scheduler-adr-*.md` |
| Accessibility | `explore/design/accessibility-gym-scheduler.md` |
| Risk register | `explore/explore-gym-scheduler/risks.md` |
