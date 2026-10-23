+++
[metadata]
epic_id = "EPIC-GYM-005"
last_updated = "2026-10-22"

[epochs]
  [epochs.0]
  name = "Chatbot Demo Access"
  started = "2026-10-22"
  jira_key = ""
+++

# EPIC-GYM-005 - Chatbot Account Access

**Domain**: GYM_SCHEDULER  
**Owner**: Calin  
**Status**: Ready for Govern Planning  
**Source PRD**: [chatbot-account-access-prd.md](../prds/chatbot-account-access-prd.md)

## Objective

Enable a local GYM_SCHEDULER demo user to request access to a mock account through the chatbot using a username, while preserving the normal JWT authentication boundary. The capability provides deterministic account resolution, safe RAG context, a separate short-lived `demo_access` token, and a deterministic local fallback when the AI provider is unavailable.

This epic is explicitly prototype-only. It must not be used with real accounts, real credentials, or public deployment.

## Scope & Boundaries

### In scope

- Deterministic username resolution against local mock data.
- Unknown and ambiguous username handling.
- Separate short-lived `demo_access` token and guard behavior.
- Chatbot orchestration before AI generation.
- Credential redaction from RAG context and responses.
- Deterministic local fallback for OpenAI failure.
- React chatbot access result and visible demo-only warning.
- Feature-specific unit, API integration, and E2E regression tests.

### Out of scope

- Issuing the normal JWT from a chatbot request.
- Real password recovery, MFA, email verification, or identity proofing.
- Remote databases, public deployment, or production hosting.
- Changing the seven-day schedule model.
- DevOps strategy and deployment provider configuration; deferred by steering-team decision.

## Key Behaviors

1. A known unique username resolves to exactly one mock account.
2. Unknown or ambiguous usernames never produce an access token.
3. The AI agent receives bounded, credential-free context and cannot authorize access.
4. A successful prototype access result uses only the separate `demo_access` token.
5. A `demo_access` token cannot satisfy normal JWT guards.
6. OpenAI provider failure produces a deterministic safe local response.
7. Existing password login, JWT refresh/logout, and schedule ownership behavior remain functional.

## Acceptance Criteria

- [ ] R-001, R-002, R-003, R-004, R-005, R-006, and R-007 pass.
- [ ] NFR-001 through NFR-007 pass for the local prototype scope.
- [ ] `demo_access` claims, expiry, and guard behavior are documented and tested.
- [ ] Unknown, duplicate, malformed, and prompt-injection requests return safe results.
- [ ] No password field enters AI context or normal chatbot responses.
- [ ] OpenAI 401/429/network failures exercise the deterministic local fallback.
- [ ] Existing login-to-schedule E2E regression passes.
- [ ] Known-user, unknown/ambiguous-user, and existing-login E2E journeys pass.
- [ ] No real data, public deployment, or production authentication bypass is introduced.

## Data & Events

### Data Model

- **User** - existing mock account identified by unique username.
- **Account Resolution** - structured zero/one/multiple match result.
- **Demo Access State** - short-lived prototype token state referencing the resolved User.
- **Knowledge Context** - bounded account/schedule facts with credentials excluded.
- **Chat Message / AI Response** - interaction request and generated or fallback response.

### Event Model

Consumes:

- Synchronous chat request from the React chatbot.
- Existing mock account and schedule records from the JSON repository.
- Optional OpenAI response from the provider.

Emits:

- Synchronous chatbot response and demo-access result only.
- No asynchronous events or event-bus messages.

## Dependencies

### Upstream Dependencies

| Domain/Epic | Dependency | Type |
|---|---|---|
| EPIC-GYM-001 | Existing JWT authentication and session boundary | Non-blocking |
| EPIC-GYM-002 | Schedule route and seven-day schedule behavior | Non-blocking |
| EPIC-GYM-004 | JSON fixtures and shared quality tooling | Non-blocking |
| Mock Repository | Seeded accounts and schedules | Blocking for local demonstration |
| OpenAI Provider | Optional response generation | Non-blocking with fallback |

### Downstream Consumers

| Domain/Epic | Consumes | Type |
|---|---|---|
| React Chat UI | Safe chatbot response and demo-access metadata | API |
| Schedule Management | Only normal authenticated identity; must not accept demo token as JWT | Auth boundary |
| Govern Task Planning | Epic acceptance criteria and architecture references | Planning artifact |

### Cross-Domain Integration

- **OpenAI Responses API** - optional natural-language generation; server-side configuration only.
- **Existing Identity & Access** - normal JWT remains authoritative; demo access is separate.

## Technical Considerations

- Account selection is backend-deterministic and occurs before AI generation.
- Password fields are removed from all general RAG projections and response contracts.
- `demo_access` must have distinct claims, expiry, and guard behavior.
- The feature remains inside the existing NestJS modular monolith.
- JSON repository limitations are accepted for the local prototype.
- No event bus, database, or new service deployment is justified.

## Risks & Mitigations

| Risk | Impact | Mitigation | Owner |
|---|---|---|---|
| RISK-001: Username-only access leaks beyond the demo | Critical | Local-only guard, visible warning, no public deployment | Calin |
| RISK-002: Wrong account selected | High | Deterministic resolver and ambiguity rejection | Lead Engineer |
| RISK-003: Password reaches provider/response | Critical | Safe projections and redaction tests | Lead Engineer |
| RISK-004: Demo token bypasses JWT guard | High | Separate claims/guard and negative auth tests | Architect |
| RISK-005: OpenAI provider failure | Medium | Deterministic local fallback | Lead Engineer |

## Non-Functional Requirements

- **Performance:** Local username resolution under 500 ms.
- **Security:** Zero password fields in AI context or normal responses; no public deployment.
- **Reliability:** Safe handling of invalid users and provider failures.
- **Maintainability:** Resolver isolated from prompt generation.
- **Compatibility:** Current Chrome, Edge, Firefox, and Safari versions.
- **Observability:** Safe metadata only; no credentials, tokens, or full prompts in logs.

## Observability & Monitoring

### Key metrics

- `chat_account_resolution_success` - known usernames resolved.
- `chat_account_resolution_rejected` - unknown/ambiguous/malformed requests.
- `chat_provider_fallback_used` - provider failure fallback count.
- `chat_demo_access_issued` - successful prototype access results.
- `chat_demo_access_denied` - safe rejection count.

### Alerts

No production alerts are configured. Local logs must make provider failures and rejected requests visible without sensitive data.

### Dashboards

No dashboard is required for the local prototype.

## Task Breakdown Strategy

Organize implementation planning into capability increments:

1. Resolver and safe account projection.
2. `demo_access` token and guard isolation.
3. Chat orchestration, RAG context, and deterministic fallback.
4. React access result and demo warning.
5. Unit, API integration, and E2E regression coverage.

Detailed implementation tasks belong in Govern planning, not this epic.

## Delivery allocation

This is an unassigned local-prototype backlog item. It has no iteration, release, Jira key, or deployment commitment. Govern planning must assign an iteration/release before implementation begins; the absence of a release is intentional and does not represent a production delivery promise.

## Implementation contracts

- `demo_access` claims, 15-minute expiry, issuer/audience, and guard isolation are defined in [DEC-008](../hlds/chatbot-account-access-decision-log.md#dec-008---isolated-demo_access-token-contract).
- Local-only enablement is defined in [DEC-009](../hlds/chatbot-account-access-decision-log.md#dec-009---local-only-feature-enablement).
- The deterministic fallback response envelope is defined in [DEC-010](../hlds/chatbot-account-access-decision-log.md#dec-010---deterministic-fallback-response-envelope).

## Related Epics

- **EPIC-GYM-001** - provides normal authentication and session behavior.
- **EPIC-GYM-002** - provides the schedule experience after normal authenticated access.
- **EPIC-GYM-004** - provides shared repository fixtures and quality tooling.

## Links & References

- **PRD:** [chatbot-account-access-prd.md](../prds/chatbot-account-access-prd.md)
- **HLD confirmation:** [chatbot-account-access-hld.md](../hlds/chatbot-account-access-hld.md)
- **Design sketch:** [chatbot-account-access-design-sketch.md](../hlds/chatbot-account-access-design-sketch.md)
- **Architecture confirmation:** [architecture-confirmation.md](../explore-chatbot-account-access/architecture-confirmation.md)
- **Risk register:** [risks.md](../explore-chatbot-account-access/risks.md)
- **Test strategy:** [test-strategy.md](../explore-chatbot-account-access/test-strategy.md)
- **Decision log:** [chatbot-account-access-decision-log.md](../hlds/chatbot-account-access-decision-log.md)

## Chatbot Demo Access

Deliver deterministic username resolution and safe prototype-only chatbot access without changing normal JWT authentication.
