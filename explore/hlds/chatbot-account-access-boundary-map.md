---
domain: GYM_SCHEDULER
source: ../explore-chatbot-account-access/domain-analysis.md
validated_by: Calin
explore_type: Fast Lane
evidence_label: OBS
---

# Boundary Map: HLD - GYM_SCHEDULER Chatbot Account Access

Date: 2026-10-22  
Status: Validated  
Architect: Calin  
Slug: `chatbot-account-access`

## 1. Truth hierarchy

See [chatbot-account-access-truth-hierarchy.md](chatbot-account-access-truth-hierarchy.md). `[OBS]` The approved feature PRD and mapped domain rules are authoritative; the existing HLD is a directional platform reference.

## 2. Ownership matrix

| # | Domain/component | Owns | Consumes | Produces / hands off | Evidence |
|---|---|---|---|---|---|
| 1 | Identity & Access | User identity, credential verification, normal JWT session authorization | Login credentials and authenticated requests | Authenticated identity and authorization result | [OBS] Existing domain/HLD |
| 2 | Schedule Management | One schedule, seven days, exercises, assignment ordering, owner checks | Authenticated identity and schedule commands | Schedule data and ownership-scoped responses | [OBS] Existing domain/HLD |
| 3 | Chat Orchestration | Chat request validation, retrieval-to-agent sequence, safe response envelope | User chat message and resolver result | Chat response; no authorization decision | [INF] PRD + feasibility |
| 4 | Account Resolver | Exact username lookup and zero/one/multiple match result | Mock repository account records | Structured account-resolution result | [INF] PRD requirement R-001 |
| 5 | Local RAG Retriever | Relevant non-sensitive account/schedule context | Structured query and mock data | Bounded knowledge context | [OBS] Existing chatbot implementation |
| 6 | AI Agent | Natural-language response generation from bounded context | Chat message and bounded context | Natural-language response text | [OBS] Existing chatbot implementation |
| 7 | Mock Repository | Local JSON records and read/write behavior | Validated service requests | Demo data state | [OBS] Existing JSON architecture |
| 8 | React Frontend | Chat interaction, demo warning, presentation state | API responses and access-state result | User commands and rendered feedback | [OBS] Existing frontend |
| 9 | Product Governance | Scope, acceptance, prototype boundary | PRD and architecture evidence | Approved decisions and gates | [OBS] Calin steering role |

### Negative boundaries

- `[OBS]` Identity & Access does not own schedules, exercises, chatbot prompts, or AI responses.
- `[OBS]` Schedule Management does not own passwords, refresh tokens, or chatbot authorization.
- `[INF]` Chat Orchestration does not decide account identity; it delegates to Account Resolver.
- `[INF]` Account Resolver does not issue JWTs or generate natural-language responses.
- `[OBS]` Local RAG Retriever does not authorize access or expose credential fields.
- `[OBS]` AI Agent does not select accounts, issue sessions, or become an authorization authority.
- `[OBS]` React Frontend does not read `mock-data.json` or hold the OpenAI API key.
- `[OBS]` Mock Repository does not authenticate users or apply ownership policy.

## 3. Upstream dependencies

| # | Dependency | Source | Type | Contract status | Evidence |
|---|---|---|---|---|---|
| 1 | Mock account records and username field | Mock Repository | Data | Exists | [OBS] Existing `mock-data.json` |
| 2 | Existing chat endpoint | Chat Orchestration | REST API | Exists | [OBS] Existing prototype |
| 3 | Existing RAG retriever/agent path | Chat Orchestration | Internal service | Exists | [OBS] Existing prototype |
| 4 | Normal JWT auth and schedule ownership | Identity & Access / Schedule | Internal auth context | Exists | [OBS] Existing HLD and implementation |
| 5 | Demo access token contract | Identity & Access / Chat | Internal API | Confirmed for implementation | [INF] DEC-008 |
| 6 | OpenAI Responses API | External provider | HTTPS API | PROVISIONAL | [ASM] Provider configuration can fail |
| 7 | `/api/v1` API convention | Platform | REST convention | Confirmed | [OBS] Existing HLD |

## 4. Platform conventions

| # | Convention | Source | Recommendation | Justification | Evidence |
|---|---|---|---|---|---|
| 1 | Modular monolith | Existing GYM_SCHEDULER HLD | Inherit | Existing prototype has one local API process and no scaling need. | [INF] Adjacent HLD |
| 2 | REST/JSON with `/api/v1` | Existing GYM_SCHEDULER HLD | Inherit | Preserves existing API conventions. | [OBS] Existing HLD |
| 3 | JSON repository behind interface | Existing GYM_SCHEDULER HLD | Inherit | Keeps the feature local and replaceable. | [OBS] Existing HLD |
| 4 | Typed frontend/API contracts | Existing GYM_SCHEDULER HLD | Inherit | Supports testable request and response behavior. | [INF] Adjacent HLD |
| 5 | No event bus for prototype | Existing GYM_SCHEDULER HLD | Inherit | No asynchronous integration requirement exists. | [OBS] Existing HLD |
| 6 | Existing JWT for normal protected access | Existing GYM_SCHEDULER HLD | Inherit with strict boundary | Demo access must not silently bypass normal auth. | [OBS] PRD and domain rules |

## 5. Open questions

| # | Question | Source | Impact | Blocking? | Proposed resolution | Evidence |
|---|---|---|---|---|---|---|
| 1 | What exact claims, expiry, issuer/audience, and guard behavior apply to `demo_access`? | PRD OQ-001 / DEC-008 | Prevents demo tokens from satisfying normal JWT guards. | No; implementation contract recorded | Use the DEC-008 contract and negative guard tests. | [INF] |
| 2 | Should duplicate usernames be rejected or treated as unsafe ambiguity? | PRD OQ-002 / DEC-011 | Determines repository validation behavior. | No; implementation contract recorded | Reject access on ambiguity and verify in resolver tests. | [INF] |
| 3 | What safe response envelope does the deterministic fallback return? | PRD OQ-005 / DEC-010 | Keeps provider failures predictable and credential-free. | No; implementation contract recorded | Use the DEC-010 envelope and contract tests. | [INF] |
| 4 | How is public chat protected if the app is shared? | Feasibility G-02 | Account enumeration and abuse risk. | Yes before external sharing | Keep local-only and document no public deployment. | [OBS] |
| 5 | What replaces username-only access before deployment? | PRD OQ-004 | Production security readiness. | Yes before deployment | Secure verified recovery or identity provider design. | [OBS] |

## 6. Boundary validation

- [x] Truth hierarchy covers all input artifacts.
- [x] Ownership matrix covers each PRD domain/component.
- [x] Negative boundaries are explicit.
- [x] Dependencies have contract status.
- [x] Provisional dependencies are tracked in the blocker register.
- [x] Platform conventions identify inherit/deviate decisions.
- [x] Open questions include impact and blocking status.
- [x] Claims use `[OBS]`, `[INF]`, or `[ASM]` labels.

## 7. Enrichment log

| Date | Change | Source |
|---|---|---|
| 2026-10-22 | Drafted ownership, dependencies, conventions, and open questions for the chatbot feature. | PRD, context, feasibility, domain mapping, existing HLD |

Last updated: 2026-10-22
