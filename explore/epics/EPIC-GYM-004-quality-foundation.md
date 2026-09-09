+++
[metadata]
epic_id = "EPIC-GYM-004"
last_updated = "2026-09-09"
[epochs]
  [epochs.0]
  name = "Prototype Quality Foundation"
  started = "2026-09-09"
  jira_key = ""
+++

# EPIC-GYM-004 — Prototype Quality Foundation

**Domain**: GYM_SCHEDULER  
**Owner**: Calin  
**Status**: Draft

## Objective

Provide the shared JSON repository, typed contracts, automated test harness, accessibility checks, and local CI gates needed to deliver the prototype safely.

## Scope & Boundaries

In scope: repository interface/JSON adapter, seeded fixtures, shared DTO contracts, Vitest, Jest/Supertest, Playwright, axe checks, lint/typecheck/build commands, and GitHub Actions baseline.

Out of scope: MongoDB, PostgreSQL, cloud hosting, staging, containers, production observability, and deployment provider configuration.

## Key Behaviors

1. Tests run deterministically with isolated JSON fixtures.
2. Quality gates enforce lint, typecheck, tests, coverage, and dependency safety.
3. Repository replacement remains possible without changing domain services.

## Acceptance Criteria

- [ ] NFR-001 and NFR-010 quality gates are executable.
- [ ] Unit, integration, E2E, accessibility, and security test commands are documented.
- [ ] CI blocks failures and reports coverage.
- [ ] JSON repository limitations and future persistence seam are documented.

## Data & Events

Owns prototype JSON records and fixtures. No events or external integrations.

## Dependencies

- EPIC-GYM-001 through EPIC-GYM-003 provide test subjects and contracts.
- Approved Test Strategy and DevOps Strategy.

## Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| JSON concurrent writes | Medium | Single-process limitation and future adapter seam |
| Flaky browser tests | Medium | Stable selectors, condition waits, quarantine policy |
| Security/accessibility gaps | High | Negative auth tests, axe, keyboard review, CI gates |

## Non-Functional Requirements

NFR-001 and NFR-010 directly; supports NFR-003 through NFR-009 through automated verification.

## Task Breakdown Strategy

Repository/fixtures → shared contracts → test harness → CI workflow → accessibility/security checks → quality demo.

## Related Epics

- Supports EPIC-GYM-001, EPIC-GYM-002, and EPIC-GYM-003.

## Links & References

- [Test Strategy](../explore-gym-scheduler/test-strategy.md)
- [DevOps Strategy](../explore-gym-scheduler/devops-strategy.md)
- [HLD](../hlds/gym-scheduler-hld.md)

## Prototype Quality Foundation

Deliver the JSON repository seam, deterministic fixtures, typed contracts, automated tests, accessibility checks, and local CI gates.
