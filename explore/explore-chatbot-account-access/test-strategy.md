---
domain: GYM_SCHEDULER
source: ../prds/chatbot-account-access-prd.md
validated_by: Calin
explore_type: Fast Lane
evidence_label: OBS
---

# Test Strategy: Chatbot Account Access

| Version | Date | Author | Changes |
|---|---|---|---|
| 0.1 | 2026-10-22 | Explore Agent / Calin | Initial strategy for approved local prototype |

## 1. Overview

`[OBS]` This strategy covers the local chatbot account-access prototype. The quality posture is MVP/experimental: critical security and authentication boundaries receive deep automated coverage, while production-scale testing is deferred.

Guiding principles:

- Automate every testable behavior.
- Push assertions to the lowest practical pyramid layer.
- Never use real credentials or personal data.
- Treat demo token isolation and credential redaction as high-risk areas.
- Preserve existing JWT login and schedule behavior.

## 2. Testing pyramid

| Layer | Target share | Scope | Duration target |
|---|---:|---|---:|
| Unit | 70-80% | Resolver, redaction, token claims, validation, fallback | Under 2 minutes |
| Integration | 20-30% | API, JSON repository, auth boundary, RAG orchestration, provider stub | Under 10 minutes |
| Contract | 0% | Not applicable to the single modular monolith | N/A |
| E2E | 5-10% | Three critical journeys | Under 30 minutes |

Targets are floors, not ceilings.

## 3. Unit testing

Frameworks: Jest for backend and Vitest for frontend. Assertions use framework-native APIs; mocks/stubs isolate filesystem, network, and provider dependencies.

Scope:

- Account Resolver: exact match, normalization, unknown, duplicate, malformed input.
- Demo Access State: claims, expiry, feature guard, separation from normal JWT.
- RAG projection: password exclusion and safe field selection.
- Local fallback: deterministic response for valid/unknown/ambiguous cases.
- DTO validation and response mapping.
- React chat loading, warning, success, and error states.

Patterns: Arrange-Act-Assert, isolated fixtures/builders, descriptive test names, no test interdependence.

Targets: at least 90% line and 85% branch coverage for changed business logic; at least 95% function coverage for public interfaces.

## 4. Integration testing

Tools: Jest + Supertest for API tests; temporary JSON fixture copies for repository tests; MSW or a local stub for OpenAI calls.

Boundaries:

| Boundary | Success | Failure | Edge |
|---|---|---|---|
| Chat Controller -> Account Resolver | Known username | Validation error | Duplicate username |
| Resolver -> JSON Repository | Correct account read | Missing/unreadable file | Empty dataset |
| Resolver -> Demo Access State | Short-lived demo token | Disabled feature/invalid match | Expired token |
| RAG -> AI Agent | Safe context response | Provider 401/429/network error | Prompt injection attempt |
| Demo token -> JWT guard | Demo flow works separately | Demo token rejected by normal guard | Missing/expired claims |
| Existing auth -> Schedule | Login and schedule load | Invalid/expired JWT | Wrong-user access |

Every boundary receives at least one success, failure, and edge test.

## 5. Contract testing

Separate consumer-driven contract testing is not applicable because the feature is deployed as one modular monolith. API request/response shape is validated through Supertest integration tests and typed contracts. A future service split would require OpenAPI or Pact contracts.

## 6. E2E testing

Framework: Playwright, when added to the project.

Critical journeys:

1. Known username -> deterministic resolution -> separate `demo_access` result and visible prototype warning.
2. Unknown or ambiguous username -> safe error response with no account leakage.
3. Existing password login -> normal JWT session -> schedule access remains functional.

Stability target: flaky ratio below 1%. Tests use seeded synthetic accounts and isolated local startup. No E2E test uses real credentials or public environments.

## 7. Non-functional testing

- Performance: local resolver target under 500 ms; measure with a lightweight local benchmark or k6 smoke test if needed.
- Security: demo token cannot satisfy normal JWT guards; password redaction; prompt-injection regression; dependency audit.
- Accessibility: axe-core plus keyboard/focus checks for chatbot warning, input, submit, and error status.
- Compatibility: Playwright Chromium, Firefox, and WebKit; manual exploratory checks for supported browsers.
- Production penetration, load, and compliance testing: deferred because deployment is out of scope.

## 8. Test data and environments

Data:

- Unit: isolated factories/builders and in-memory values.
- Integration: version-controlled synthetic JSON fixtures and temporary copies.
- E2E: seeded demo accounts, including known, unknown, and ambiguous cases.
- Never use real user data, production credentials, or the developer's API key in tests.

Environments:

- Local: unit and integration tests against one local API process.
- CI: unit, integration, and configured E2E tests on isolated runners; platform TBD.
- Staging/production: not in scope for this prototype.

## 9. CI/CD integration

The future pipeline is platform-neutral until DevOps is defined:

1. Lint, typecheck, and unit tests: under 3 minutes; block merge on failure.
2. Integration tests: under 10 minutes; block merge on failure.
3. Build/package: before any approved handoff; block artifact on failure.
4. E2E/NFR checks: when Playwright and CI are configured.

Quality gates:

- 100% unit and integration pass rate.
- 90% line / 85% branch changed-business-logic floors.
- Zero critical/high security findings.
- E2E pass rate 100% for selected journeys.
- Lint and typecheck with zero violations.

Failure policy: fix failing tests before handoff; quarantine a confirmed flaky test and create a fix task within one sprint. Quarantine is not a substitute for fixing a deterministic failure.

## 10. Metrics and success criteria

| Metric | Target | Measurement |
|---|---|---|
| Unit line coverage | >=90% business logic | Jest/Vitest coverage |
| Unit branch coverage | >=85% business logic | Jest/Vitest coverage |
| Public function coverage | >=95% | Coverage report |
| Integration boundary coverage | 100% with success/failure/edge | Test inventory |
| Critical journey coverage | 100% | E2E inventory |
| Flaky ratio | <1% | Test reports |
| Defect escape rate | <3% prototype target | Issue/test review |
| Unit duration | <2 min | Test runner timing |
| Integration duration | <10 min | Test runner timing |
| E2E duration | <30 min | Playwright report |

DORA metrics are not measured until DevOps and deployment exist.

## 11. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Demo token becomes normal authorization | Dedicated claims, guard tests, short expiry, feature flag |
| Password reaches provider or response | Safe projection, redaction tests, response assertions |
| Model chooses wrong account | Deterministic resolver tests before agent call |
| Provider failure breaks demo | Local deterministic fallback tests |
| Existing auth regresses | Login/schedule E2E regression journey |
| Tests use shared mutable JSON | Fixture copies and isolated test setup |

## 12. References

- [PRD](../prds/chatbot-account-access-prd.md)
- [Feature HLD confirmation](../hlds/chatbot-account-access-hld.md)
- [Design sketch](../hlds/chatbot-account-access-design-sketch.md)
- [Architecture confirmation](../explore-chatbot-account-access/architecture-confirmation.md)
- [Risk register](../explore-chatbot-account-access/risks.md)
- [Existing modular-monolith ADR](../decisions/gym-scheduler-adr-001-modular-monolith.md)
- [Existing JSON repository ADR](../decisions/gym-scheduler-adr-002-json-repository.md)
- [Existing typed REST ADR](../decisions/gym-scheduler-adr-003-typed-rest-client.md)
- [Existing secure session ADR](../decisions/gym-scheduler-adr-004-secure-session.md)

Last updated: 2026-10-22
