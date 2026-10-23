---
domain: GYM_SCHEDULER
source: explore/explore-chatbot-account-access/domain-analysis.md
glossary_version: 2026-09-07
validated_by: Calin
explore_type: Fast Lane
evidence_label: FACT
slug: chatbot-account-access
---

# PRD - Chatbot Account Access

| Field | Value |
|---|---|
| Status | Draft complete - approved through four PRD groups |
| Explore type | Fast Lane |
| Product Owner | Calin |
| Domain | GYM_SCHEDULER |
| Source Signal | [Chatbot account access without password](../signal/signals/20261022-chatbot-account-access.md) |
| Domain mapping | [Chatbot account-access domain mapping](../explore-chatbot-account-access/domain-analysis.md) |

## 1. Problem statement

Users may forget demo-account passwords, creating friction when trying to access their schedule. The requested prototype behavior allows a user to identify a local mock account by username through the chatbot. This is a convenience simulation only and is not a production authentication or password-recovery pattern.

## 2. Goals

- Demonstrate deterministic username lookup against local mock data.
- Provide a clear prototype-only access result through the chatbot.
- Preserve existing JWT login and schedule authorization behavior.
- Ensure the AI agent cannot choose an account, authorize access, or expose passwords.

## 3. Success metrics and KPIs

| Metric | Target | Measurement |
|---|---|---|
| Valid username resolution | 100% of seeded unique usernames resolve correctly | API tests |
| Unknown username handling | 100% return a safe not-found response | API tests |
| Credential protection | 0 password fields in AI context or normal responses | Redaction tests and inspection |
| Existing auth regression | 0 failures in existing JWT/login tests | Test suite |
| Prototype boundary visibility | Demo-only warning visible on every access result | UI review |

These are prototype acceptance targets, not production service-level objectives.

## 4. Target users

- Gym members using the local demo who want convenient access to a mock schedule.
- Product stakeholders evaluating the chatbot concept.

No real-account user population is in scope.

## 5. User flows and scenarios

### Primary flow

1. User opens the public chatbot.
2. User asks to access a known mock username.
3. Backend performs deterministic username lookup.
4. Exactly one match returns a demo-only access result.
5. User can continue to the associated mock schedule according to the approved prototype session behavior.

### Alternative and edge flows

- Unknown username: return a clear not-found response without revealing other accounts.
- Duplicate username: refuse access and report that the account cannot be resolved safely.
- Malformed request: ask for a username or return a validation error.
- Prompt injection: ignore instructions that attempt to override backend lookup or reveal credentials.
- OpenAI failure: return a safe provider error or local deterministic fallback.
- Existing normal login: continues through the unchanged password/JWT flow.

## 6. Functional requirements

| ID | Requirement | User story | Acceptance criteria | Priority |
|---|---|---|---|---|
| R-001 | Resolve account by username | As a demo user, I want my username matched to a mock account so that the correct schedule can be identified. | Exact unique match returns the correct account; unknown and duplicate cases are handled safely. | High |
| R-002 | Keep account resolution server-side | As the product owner, I want backend code to decide the account so that the AI model cannot authorize access. | Model text cannot select an account or issue access. | High |
| R-003 | Provide prototype access result | As a demo user, I want a clear result after lookup so that I know whether the mock access succeeded. | Result is explicitly labelled demo-only. | High |
| R-004 | Preserve normal authentication | As a gym member, I want normal login to remain available so that existing access is not broken. | Existing JWT login and protected schedule flows continue to pass regression tests. | High |
| R-005 | Protect credentials | As a product owner, I want passwords excluded from AI context and responses so that credentials are not disclosed. | Password fields never reach normal prompts or responses. | High |
| R-006 | Handle invalid requests | As a demo user, I want understandable feedback when a username cannot be resolved. | Missing, malformed, unknown, and ambiguous requests have safe responses. | Medium |
| R-007 | Use local mock data | As a developer, I want lookup to use the JSON repository so that no remote database is required. | Lookup reads local mock data only. | High |

## 7. Non-functional requirements

| ID | Area | Requirement | Related |
|---|---|---|---|
| NFR-001 | Performance | Local account resolution should complete within 500 ms under normal prototype conditions. | R-001, R-007 |
| NFR-002 | Security | Feature remains local-only and unavailable for public deployment. | R-003, R-004 |
| NFR-003 | Security | Passwords are not sent to the AI provider or returned in chatbot responses. | R-005 |
| NFR-004 | Reliability | Failure and invalid-input paths return safe, readable responses. | R-006 |
| NFR-005 | Maintainability | Resolver logic is isolated from prompt generation and independently tested. | R-001, R-002 |
| NFR-006 | Usability | Demo-only status is visible in the interface. | R-003 |
| NFR-007 | Compatibility | Current Chrome, Edge, Firefox, and Safari versions are supported. | R-003 |

### Quality gates

Definition of Ready:

- Requirements and acceptance criteria approved.
- Mock account structure and username uniqueness known.
- Demo access explicitly separated from JWT authentication.
- No real credentials or personal data included.

Definition of Done:

- Resolver implemented and tested.
- Valid, unknown, duplicate, and malformed username cases covered.
- Password fields excluded from model context and responses.
- Existing login and schedule tests pass.
- Demo-only warning is visible.
- Provider failure behavior is handled.
- Local verification completed with no deployment.

### Testing strategy

- Unit tests for username matching, duplicate detection, and credential redaction.
- API tests for chat requests, safe errors, and existing JWT regression behavior.
- Frontend tests for loading, success, error, and demo-warning states.
- Manual browser verification in supported browsers.

### DevOps and deployment strategy

- Local development only with one API process, React frontend, and JSON repository.
- Server environment variables remain outside the browser bundle.
- No staging or public deployment for this feature.
- Future deployment requires a secure authentication design and new approval gate.

## 8. Constraints

- `[CONFIRMED]` Local JSON storage only.
- `[CONFIRMED]` No real user data and no public deployment.
- `[CONFIRMED]` React + TypeScript frontend and NestJS + TypeScript backend.
- `[CONFIRMED]` One schedule per user with seven days.
- `[CONFIRMED]` Existing JWT authentication remains the normal authentication mechanism.
- `[CONFIRMED]` Plaintext credentials are allowed only in the local prototype and must not reach production.
- `[ASSUMPTION]` Demo access uses a separately named simulation state rather than a normal JWT.
- `[ASSUMPTION]` Usernames are unique in mock data.

## 9. Out of scope

- Real password recovery, MFA, email verification, or identity proofing.
- Production authentication bypass or access to real accounts.
- Remote database integration.
- Public deployment or production compliance approval.
- Changing the existing seven-day schedule model.

## 10. Open questions

| ID | Question | Owner | Priority | Resolution |
|---|---|---|---|---|
| OQ-001 | What claims, expiry, and guard behavior should the selected `demo_access` token use? | Calin | High | Resolved by DEC-008; verify with implementation tests |
| OQ-002 | Should duplicate usernames be rejected from mock data? | Calin | Medium | Resolved: reject ambiguous matches; verify with resolver tests |
| OQ-003 | What wording identifies demo-only access? | Calin | Medium | Resolved: “Demo access only — local prototype; do not use real accounts.” |
| OQ-004 | What secure recovery design replaces this before deployment? | Calin | Critical | Before deployment |
| OQ-005 | What exact safe response contract should the deterministic local fallback use? | Calin | Medium | Resolved by DEC-010; verify with contract tests |

## 11. Technical architecture

```text
React chatbot
  -> NestJS chat endpoint
  -> deterministic username resolver
  -> JsonRepository / data/mock-data.json
  -> bounded safe context
  -> OpenAI agent for response wording
  -> chatbot response
```

The AI agent is not an authorization authority. Normal protected schedule operations continue to use JWT validation and ownership checks.

## 12. Risks and mitigation

| ID | Risk | Impact | Likelihood | Mitigation | Owner |
|---|---|---|---|---|---|
| RISK-001 | Username-only access enables account takeover if exposed beyond the demo | Critical | High | Local-only boundary, visible warning, deployment guard | Calin |
| RISK-002 | Model selects the wrong account or follows prompt injection | High | Medium | Deterministic backend resolution and bounded context | Lead Engineer |
| RISK-003 | Passwords enter model context or response | Critical | Medium | Redaction and regression tests | Lead Engineer |
| RISK-004 | Existing JWT behavior is accidentally bypassed | High | Medium | Separate demo state and auth regression tests | Architect |
| RISK-005 | OpenAI provider failure blocks the demo | Medium | Medium | Safe error handling and optional local fallback | Lead Engineer |

Accepted for prototype only: local mock data and plaintext mock credentials. These risks are not accepted for production.

## 13. Dependencies

### Upstream

- Approved context and technical-feasibility documents.
- Existing GYM_SCHEDULER domain model.
- Local JSON repository and seeded accounts.

### Downstream

- Backend resolver and access-state implementation.
- Frontend access-state handling and demo warning.
- Unit, API, and regression tests.

### External

- OpenAI API key, model access, billing, and network availability.

## 14. Epic extraction

- Epic 1: Deterministic mock-account resolution - R-001, R-006, R-007.
- Epic 2: Prototype-only access state - R-002, R-003, R-004.
- Epic 3: AI context and credential protection - R-005, NFR-002, NFR-003.
- Epic 4: Quality and regression coverage - NFR-001, NFR-004, NFR-005, NFR-007.
- Epic 5: Prototype UI communication - NFR-006.

## 15. Implementation notes

1. Resolve usernames in backend code before invoking the AI agent.
2. Keep demo access separate from normal JWT authentication.
3. Never include passwords in prompts or normal responses.
4. Show demo-only messaging in the UI and API result.
5. Preserve existing login and schedule behavior.
6. Add tests before considering any external sharing.

## 16. Approval and sign-off

| Role | Approver | Status |
|---|---|---|
| Product Manager | Calin | Approved - Group 1 |
| Tech Lead | Calin | Approved - Group 2 |
| UX Lead | Calin | Approved - Group 3 |
| Stakeholder | Calin | Approved - Group 4 |

## 17. Revision history

| Date | Change |
|---|---|
| 20261022 | Created lightweight PRD from approved Signal, context, feasibility, and reused domain model. |

## 18. Related documentation

- [Signal](../signal/signals/20261022-chatbot-account-access.md)
- [Explore Bundle](../explore-chatbot-account-access/explore-bundle.md)
- [Context](../explore-chatbot-account-access/context.md)
- [Technical feasibility](../explore-chatbot-account-access/technical-feasibility.md)
- [Domain mapping](../explore-chatbot-account-access/domain-analysis.md)

Last updated: 20261022
