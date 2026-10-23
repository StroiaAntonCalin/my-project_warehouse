# Context Documentation: Chatbot Account Access

- Signal: [Chatbot account access without password](../../signal/signals/20261022-chatbot-account-access.md)
- Phase: SP1 - Explore Discovery
- Created: 20261022
- Status: Draft for steering review
- Evidence labels: `[FACT]` observed or explicitly provided; `[ASSUMPTION]` not yet validated; `[OPINION]` working recommendation.

## 1. Problem statement

### Reframe

`[FACT]` The current prototype requires a user to enter a password through the normal login form. `[FACT]` The requested convenience feature is for a user who knows an account username but does not remember its password to obtain access through the chatbot.

`[ASSUMPTION]` Password recall is a meaningful source of friction for demo users. This has not been measured.

### Root cause

`[FACT]` The prototype has no password-recovery flow. Its account data is local mock data, and the chatbot already retrieves account and schedule information before generating an answer.

### Impact

`[ASSUMPTION]` A forgotten password can interrupt a demo or make a user abandon the intended schedule experience. The proposed shortcut also creates a direct account-takeover risk if it is treated as real authentication.

### Desired outcome

`[FACT]` Demonstrate a username-driven account-access interaction in the local prototype, with the non-production boundary visible and explicit. `[OPINION]` The feature should be implemented as a clearly labelled demo simulation until a secure recovery or delegated-access design is approved.

## 2. Scope and boundaries

### In scope

- `[FACT]` Local React frontend chatbot entry point available to all users of the prototype.
- `[FACT]` NestJS API orchestration for chat retrieval and response generation.
- `[FACT]` Resolution of a username against `data/mock-data.json`.
- `[FACT]` Mock account and schedule data only; one schedule with seven days per user remains the current domain rule.
- `[OPINION]` A deterministic response contract for account lookup, unknown usernames, and ambiguous requests.
- `[OPINION]` A clearly labelled demo-only access result, rather than silently implying production authentication.

### Out of scope

- Real user accounts, production credentials, or public deployment.
- Password recovery, email verification, MFA, identity proofing, or delegated authorization for real accounts.
- Remote database integration or migration from the JSON repository.
- A standalone security/privacy review in this Fast Lane bundle.
- User research, market validation, regulatory analysis, or production compliance sign-off.

### Boundary conditions

- `[FACT]` No real personal data or production accounts may be used.
- `[FACT]` The OpenAI API key, if used, remains server-side in environment configuration.
- `[FACT]` The current prototype stores local account credentials in the mock repository in plaintext by explicit prototype decision; this is not acceptable for deployment.
- `[ASSUMPTION]` The feature will be tested only on the local development environment until a future security decision changes the boundary.

## 3. Domain model

| Entity | Purpose | Key relationships |
|---|---|---|
| User Account | Demo identity with username, role, and prototype credential fields | Owns one Schedule; may receive a demo session |
| Schedule | Personal weekly plan | Belongs to one User Account; contains exactly seven Workout Days |
| Workout Day | One day card in the weekly schedule | Belongs to one Schedule; contains ordered Exercises |
| Exercise | Exercise entry shown on a Workout Day | Belongs to one Workout Day; has a numeric order |
| Chat Message | User question or assistant response | Belongs to a chat interaction; may reference retrieved context |
| Knowledge Context | Relevant records retrieved from the mock repository | Supplied to the AI Agent as bounded context |
| Demo Session | Prototype access state returned after an approved demo lookup | Must not be interpreted as production authentication |
| AI Agent | Generates a natural-language answer from retrieved context | Consumes Chat Message plus Knowledge Context |

Relationships:

```text
User Account 1 ---- 1 Schedule 1 ---- 7 Workout Days 1 ---- * Exercises
Chat Message 1 ---- * Knowledge Context ----> AI Agent ----> Chat response
User Account 1 ---- 0..1 Demo Session (prototype only)
```

## 4. System map

| Component | Responsibility | Source/status |
|---|---|---|
| React frontend | Login, schedule UI, and collapsible public chatbot | `[FACT]` Existing prototype |
| NestJS API | HTTP endpoints, auth, chat orchestration | `[FACT]` Existing prototype |
| LocalRagService | Coordinates retrieval then response generation | `[FACT]` Existing prototype |
| LocalRagRetriever | Loads and keyword-matches account/schedule records | `[FACT]` Existing prototype |
| JsonRepository | Reads and writes local JSON mock data | `[FACT]` Existing prototype |
| `data/mock-data.json` | Demo accounts, schedules, and exercises | `[FACT]` Local-only source of truth |
| OpenAI Responses API | Optional external generation dependency for chatbot answers | `[FACT]` Configured through server environment variables |

Data flow:

```text
Browser -> NestJS chat endpoint -> LocalRagService
       -> LocalRagRetriever -> JsonRepository -> mock-data.json
       -> bounded Knowledge Context -> OpenAI Responses API
       -> chatbot response -> Browser
```

`[OPINION]` Any future demo-access action should branch after exact account resolution and before AI generation; the model should not be trusted to choose an account or issue access.

## 5. Technical constraints

| Constraint | Status | Impact | Notes |
|---|---|---|---|
| Local JSON storage only | Confirmed | High | No remote persistence or cross-process consistency. |
| Prototype-only / no public deployment | Confirmed | Critical | Limits acceptable controls for the demo, but does not make unsafe behavior suitable for production. |
| Seven-day schedule per user | Confirmed | Medium | Keeps schedule retrieval and account-to-schedule resolution simple. |
| Server-side API key | Confirmed | Critical | Browser must never receive `OPENAI_API_KEY`. |
| Plaintext mock credentials | Confirmed prototype exception | Critical | Must be removed before any real deployment or real data. |
| Username-only access request | Proposed | Critical | Must be labelled as simulation/demo behavior and isolated from production auth. |
| Latest major Chrome, Edge, Firefox, Safari | Confirmed | Medium | Applies to the existing frontend prototype. |
| No event bus or staging environment | Confirmed | Low | Single local backend process is sufficient for the demo. |

## 6. Stakeholder map and RACI

| Stakeholder | Interest | Responsibility |
|---|---|---|
| Calin | Product outcome and acceptance | Product Owner, Architect, Lead Engineer, final approver |
| Demo user | Convenience and understandable feedback | Uses the chatbot; provides usability observations |
| Future security reviewer | Safe production boundary | Not participating in this Fast Lane; required before deployment |

| Decision | Calin | Demo user | Future security reviewer |
|---|---|---|
| Prototype scope | A/R | C | I |
| Technical feasibility | A/R | C | C |
| Demo-only boundary | A/R | I | C |
| Production readiness | A/R | I | C/R before launch |

R = Responsible, A = Accountable, C = Consulted, I = Informed.

## 7. Governance framework

- Decision authority: `[FACT]` Calin is the Product Owner and confirmed the current assumptions.
- Current gate: `[FACT]` Explore Discovery, Fast Lane.
- Next gate: `[OPINION]` Architecture Confirmation and Lightweight PRD must explicitly reject production use of username-only access unless a secure design replaces it.
- Production gate: `[FACT]` No public deployment is in scope. Any future deployment requires a new security/privacy decision, real authentication design, and data-storage decision.

## 8. Assumptions catalogue

| ID | Assumption | Owner | Validation method | Closes in |
|---|---|---|---|---|
| A-01 | The feature remains local and demo-only. | Calin | Confirm before implementation and before any deployment | Architecture Confirmation |
| A-02 | Username is an exact, unique identifier in mock data. | Lead Engineer | Inspect repository schema and add lookup tests | Technical implementation |
| A-03 | A chatbot request may identify an account, but the model must not select one without deterministic backend validation. | Lead Engineer | Contract tests and adversarial prompt tests | Architecture Confirmation |
| A-04 | Demo users understand that the access result is not real authentication. | Calin | UI copy review and prototype walkthrough | Lightweight PRD |
| A-05 | Existing JWT login can remain separate from the demo-access simulation. | Architect | Review endpoint and session boundaries | Architecture Confirmation |

## 9. Gaps catalogue

| Gap | Why it matters | Question for stakeholder/engineering |
|---|---|---|
| G-01 | No approved session contract for chatbot-triggered access | Could accidentally bypass or corrupt JWT authentication | Should the prototype show a simulated logged-in state, or issue a short-lived demo token? |
| G-02 | No abuse boundary for public chatbot requests | Public access increases account-enumeration and prompt-abuse risk | What rate limit and response redaction are acceptable for the demo? |
| G-03 | No production recovery model | Username-only access cannot be carried forward safely | Which verified recovery mechanism should replace the shortcut later? |
| G-04 | No evidence that forgotten passwords are a measured problem | Product value is currently assumed | What user observation or demo feedback would justify keeping this feature? |
| G-05 | Existing AI dependency may fail due to key, billing, model, or network issues | Chat UX can become unavailable | What deterministic local fallback is required for demo reliability? |

## 10. Context summary

This is a local GYM_SCHEDULER prototype. It already uses a React frontend, a NestJS API, a JSON repository, and an optional OpenAI-backed retrieval-and-generation chatbot. The proposed feature asks the chatbot to help a user access a demo account using only a username. The request is technically approachable within mock data, but it is a critical security boundary: it must remain visibly demo-only, must use deterministic account resolution, and must not be treated as a production authentication or password-recovery pattern. The principal next decisions are the demo session behavior, response redaction, and the replacement production recovery design.

## 11. Enrichment log

| Date | Update | Source |
|---|---|---|
| 20261022 | Initial context baseline created from the validated Signal and approved Explore Bundle. | Signal and Bundle |
| 20261022 | Confirmed Fast Lane scope: context documentation and technical feasibility only. | Explore Bundle |

## 12. Validation checklist

- [x] Problem statement describes user friction and risk, not only a solution.
- [x] System context identifies actors, components, data source, and integration boundary.
- [x] Domain entities and relationships are explicit.
- [x] Constraints include status, impact, and rationale.
- [x] Assumptions include owners and validation plans.
- [x] Out-of-scope items and prototype boundary are explicit.
- [x] RACI is assigned for key decisions.

## 13. Footer

Last updated: 20261022  
Updated by: Explore Agent with Calin's confirmed assumptions
