---
domain: GYM_SCHEDULER
source: ../explore-chatbot-account-access/domain-analysis.md
validated_by: Calin
explore_type: Fast Lane
evidence_label: OBS
---

# Design Sketch: HLD - GYM_SCHEDULER Chatbot Account Access

- Date: 2026-10-22
- Status: Direction Approved
- Iteration: 1
- Related PRD: [chatbot-account-access-prd.md](../prds/chatbot-account-access-prd.md)
- Boundary map: [chatbot-account-access-boundary-map.md](chatbot-account-access-boundary-map.md)
- Truth hierarchy: [chatbot-account-access-truth-hierarchy.md](chatbot-account-access-truth-hierarchy.md)

## 1. Service boundary

`[OBS]` The feature is a module inside the existing NestJS modular monolith. It covers chatbot request handling, deterministic username resolution, safe RAG context preparation, AI response generation, and a separately scoped prototype access state.

It does not own normal JWT authentication, schedules, exercises, credential storage, browser authorization, or production recovery.

## 2. Module map

| Module | Responsibility | Owns | Consumes | Produces | Evidence |
|---|---|---|---|---|---|
| Chat Controller | Validate and receive chat requests | HTTP contract | User message | Chat command | [OBS] Existing API |
| Account Resolver | Resolve username deterministically | Match result | Mock accounts | Structured resolution | [INF] PRD R-001 |
| RAG Retriever | Retrieve safe relevant context | Knowledge context | Structured query/data | Bounded context | [OBS] Existing chatbot |
| AI Agent | Generate natural-language wording | Response text only | Message/context | Chat response | [OBS] Existing chatbot |
| Demo Access State | Represent prototype access | `demo_access` state | Successful resolution | Short-lived demo token/state | [OBS] DEC-005 |
| Identity & Access | Normal JWT authentication | JWT/session authorization | Credentials/auth requests | Authenticated identity | [OBS] Existing HLD |
| Schedule Management | Own schedule rules and data | Schedule model | Authenticated identity | Schedule responses | [OBS] Existing HLD |
| JSON Repository | Read local mock records | Mock data | Service requests | Account/schedule data | [OBS] Existing architecture |
| React Chat UI | Render chat and status | Presentation state | API responses | Chat requests | [OBS] Existing frontend |

## 3. Runtime trigger

`[OBS]` The process starts when the React chatbot sends `POST /api/v1/chat`. The synchronous flow is:

```text
React Chat UI
  -> Chat Controller
  -> Account Resolver
  -> RAG Retriever
  -> AI Agent
  -> Demo Access State when explicitly requested
  -> Chat response
```

## 4. Data model sketch

| Entity | Key fields | Authoritative source | Relationship | Evidence |
|---|---|---|---|---|
| User | `id`, `username`, `role`, credential metadata | JSON Repository / Identity | Owns one schedule | [OBS] Domain |
| Schedule | `id`, `userId` | JSON Repository / Schedule | Contains seven days | [OBS] Domain |
| Schedule Day | `id`, `scheduleId`, `day`, `order` | JSON Repository / Schedule | Contains exercises | [OBS] Domain |
| Exercise Assignment | `id`, `dayId`, `name`, optional fields, `order` | JSON Repository / Schedule | Belongs to one day | [OBS] Domain |
| Chat Message | `message`, timestamp | Chat Controller | Starts interaction | [OBS] Existing chatbot |
| Account Resolution | normalized username, status, user ID | Account Resolver | References User | [INF] PRD |
| Knowledge Context | safe account/schedule facts | RAG Retriever | Supplied to Agent | [OBS] Existing chatbot |
| Demo Access State | token/state, user ID, expiry | Demo Access State module | References resolved User | [OBS] DEC-005 |

Password fields are excluded from general knowledge context and normal responses. [OBS]

## 5. Event and API map

No asynchronous events or event bus are introduced. [OBS]

| Contract | Direction | Purpose | Status | Evidence |
|---|---|---|---|---|
| `POST /api/v1/chat` | React -> API | Submit chatbot question | Exists | [OBS] Existing prototype |
| Account Resolver interface | Chat -> Resolver | Resolve username | Needs implementation | [INF] DEC-006 |
| JSON Repository interface | Services -> Repository | Read mock records | Exists | [OBS] Existing architecture |
| RAG Retriever interface | Chat -> Retriever | Retrieve safe context | Exists | [OBS] Existing chatbot |
| OpenAI Responses API | Agent -> Provider | Generate wording | Provisional | [ASM] Provider dependency |
| `demo_access` token contract | API -> React/API guards | Carry prototype access state | Defined in DEC-008; implementation pending | [INF] DEC-008 |
| Local-only enablement | API startup/feature guard | Prevent public or non-development use | Defined in DEC-009; implementation pending | [INF] DEC-009 |
| Fallback response envelope | API -> React | Stable safe response when provider fails | Defined in DEC-010; implementation pending | [INF] DEC-010 |

## 6. Quality attribute constraints

| Attribute | Target | Design response | Trade-off | Evidence |
|---|---|---|---|---|
| Performance | Local lookup under 500 ms | In-process lookup over small JSON data | Not suited to large datasets | [OBS] NFR-001 |
| Security boundary | Local-only | Environment/deployment guard and explicit demo label | No real-user support | [OBS] NFR-002 |
| Credential protection | Zero password fields in AI context/response | Safe projections and redaction tests | Less context available | [OBS] NFR-003 |
| Reliability | Safe invalid/provider failure responses | Explicit statuses and deterministic fallback | More branches to test | [OBS] NFR-004 |
| Maintainability | Resolver isolated from prompting | Dedicated backend module/interface | More code than inline lookup | [OBS] NFR-005 |
| Usability | Demo status always visible | Response metadata and UI warning | Adds visual friction | [OBS] NFR-006 |

## 7. Negative boundary statements

- Identity & Access does not own chatbot prompts or schedules.
- Schedule Management does not own credentials or AI decisions.
- Account Resolver does not issue JWTs or generate text.
- RAG Retriever does not authorize or expose passwords.
- AI Agent does not select an account or issue a session.
- Demo Access State does not satisfy normal JWT authorization.
- JSON Repository does not apply authentication or business rules.
- React does not read JSON or hold provider secrets.

## 8. Architectural decision points and selections

### Decision 1: Demo access state

- Option A: frontend-only simulation.
- Option B: separate short-lived `demo_access` token - selected by Calin.
- Option C: normal JWT - rejected as an authentication bypass.

### Decision 2: Account resolution

- Option A: deterministic resolver before AI - selected by Calin.
- Option B: AI-called backend tool - deferred as unnecessary orchestration complexity.
- Option C: raw account data in prompt - rejected for safety and determinism.

### Decision 3: Provider failure

- Option A: provider error only.
- Option B: deterministic local fallback - selected by Calin.
- Option C: cached response - rejected because stale data may be misleading.

## 9. Open questions

| Question | Impact | Blocking | Owner | Evidence |
|---|---|---|---|---|
| What production recovery replaces username-only demo access? | Production readiness | Yes for deployment | Calin | [OBS] |
| Should duplicate usernames be rejected in mock data? | Affects safe matching | No | Calin | [INF] |
| What exact wording identifies demo access? | Affects user understanding | No | Calin | [ASM] |
| What secure recovery replaces this before deployment? | Production readiness | Yes for deployment | Calin | [OBS] |

## 10. Assumptions register

| Assumption | Evidence level | Risk if wrong |
|---|---|---|
| `demo_access` cannot satisfy normal JWT guards | [INF] | Access boundary could be bypassed |
| Ambiguous usernames are rejected | [INF] | Wrong account could be selected |
| JSON remains small and local | [OBS] | Performance and persistence limits change |
| Fallback uses the DEC-010 safe response envelope | [INF] | Credentials or inaccurate data could leak |
| Feature remains local-only and disabled outside development | [INF] | Security risk becomes unacceptable |

## 11. Evaluation criteria log

| Iteration | Feedback type | Change | Impact |
|---|---|---|---|
| 1 | No feedback requiring recalibration | Confirmed existing boundaries, selected three decision options | Direction remains consistent with PRD and feasibility |

## 12. Validation

- [x] Service boundary proposed with justification.
- [x] Modules have non-overlapping responsibilities.
- [x] Runtime trigger identified.
- [x] Data model and authoritative sources mapped.
- [x] API contracts and absence of asynchronous events documented.
- [x] Quality attributes mapped to NFRs.
- [x] Negative boundaries present for every component.
- [x] Decision points presented with trade-offs and selections recorded.
- [x] Existing modular-monolith and repository patterns referenced.
- [x] Open questions include impact and blocking status.
- [x] Assumptions carry evidence labels.
- [x] Calibration log is present.

Validation: 12 of 12 applicable checks passed. B.1 direction is ready for human approval.

Last updated: 2026-10-22
