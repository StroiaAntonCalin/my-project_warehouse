# Domain Mapping: Chatbot Account Access

- Status: Reused and mapped for Solution Design
- Date: 20261022
- Source domain analysis: [GYM_SCHEDULER domain analysis](../explore-gym-scheduler/domain-analysis.md)
- Locked domain model: [GYM_SCHEDULER domain model](../domain/gym-scheduler-domain.md)
- Mapping owner: Calin

## Purpose

This feature remains within the existing GYM_SCHEDULER domain. No new business domain is introduced. The mapping below identifies which existing domain terms and rules apply to the chatbot account-access proposal.

## Reused glossary

| Existing term | Use in this feature |
|---|---|
| User | Account identified by the requested username |
| JWT | Existing normal authentication token; must remain distinct from any demo-access simulation |
| Schedule | The single weekly schedule owned by the resolved User |
| Schedule Card | One of the seven daily schedule sections returned after access |
| Exercise Assignment | Scheduled exercise data the user may view after access |
| Authentication System | Existing credential verification and JWT authority |

## Feature-specific supporting concepts

| Concept | Type | Definition | Relationship |
|---|---|---|---|
| Chat Message | Supporting interaction object | User question or assistant response | May request account resolution |
| Knowledge Context | Supporting read model | Bounded account and schedule facts retrieved from mock data | Passed to the AI agent |
| Demo Access Request | Proposed boundary object | A request to access a mock account by username | Must be resolved by backend code, not by model text |
| Demo Session | Proposed runtime object | Explicitly non-production access state for the local demo | Must not be treated as a normal JWT |
| AI Agent | System actor | Generates a response from supplied context | Cannot authorize or choose an account independently |

## Applicable domain rules

1. A User owns exactly one Schedule.
2. A Schedule contains exactly seven Schedule Cards.
3. Schedule data is owned by the resolved User.
4. Existing JWT authentication remains the authority for normal protected schedule access.
5. The chatbot may retrieve mock facts, but retrieval does not grant production authorization.
6. Username matching must be deterministic and must handle unknown or duplicate records.
7. Credentials must not be included in general AI context or normal chatbot responses.

## Explicit feature boundary

The proposed username-only behavior is a local prototype simulation. It is not a new Authentication System rule, does not replace password verification, and must not be deployed with real users or real credentials.

## Traceability

- Signal: [Chatbot account access without password](../../signal/signals/20261022-chatbot-account-access.md)
- Context: [context.md](context.md)
- Technical feasibility: [technical-feasibility.md](technical-feasibility.md)
- Original domain analysis: [domain-analysis.md](../explore-gym-scheduler/domain-analysis.md)

## Validation

- [x] Existing GYM_SCHEDULER glossary reused.
- [x] Existing one-user/one-schedule/seven-day rules preserved.
- [x] Existing JWT rule preserved as the normal authentication boundary.
- [x] New chatbot concepts are marked as supporting/proposed rather than silently added to the core domain.

Last updated: 20261022
