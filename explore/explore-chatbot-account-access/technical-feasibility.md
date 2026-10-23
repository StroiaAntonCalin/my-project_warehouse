# Technical Feasibility: Chatbot Account Access

- Signal: [Chatbot account access without password](../../signal/signals/20261022-chatbot-account-access.md)
- Related context: [context.md](context.md)
- Phase: SP1 - Explore Discovery
- Created: 20261022
- Status: Draft for steering review
- Evidence labels: `[FACT]`, `[ASSUMPTION]`, `[OPINION]`.

## 1. System context

`[FACT]` The prototype runs locally with a React + TypeScript frontend and a NestJS + TypeScript backend. Account, schedule, and exercise data are stored in a local JSON repository. The chatbot is available from the start page and is not restricted to authenticated users.

Current integration path:

```text
React Chat UI
  -> NestJS chat controller
  -> LocalRagService
  -> LocalRagRetriever
  -> JsonRepository / data/mock-data.json
  -> bounded context
  -> OpenAI Responses API (server-side, optional)
  -> response to browser
```

`[FACT]` Existing normal authentication uses JWT-based login. `[OPINION]` Chatbot account access should not silently reuse or bypass that path until a session contract is approved.

## 2. Data realities

| Area | Reality | UX/engineering implication |
|---|---|---|
| Availability | `[FACT]` Data is local mock JSON loaded by the API repository. | No external database setup is needed for the prototype. |
| Ownership | `[FACT]` Calin owns the demo product decisions; the repository is the implementation source. | Changes can be reviewed locally and deterministically. |
| Quality | `[FACT]` Records are seeded demo records; account usernames are expected to be unique. | Exact-match lookup is feasible; unknown usernames need a clear response. |
| Credentials | `[FACT]` Prototype account credentials are currently stored as plaintext by explicit instruction. | Never reuse this shape for real accounts; redact credentials from AI context and UI unless explicitly required by a demo test. |
| Freshness | `[FACT]` JSON can change during local development and is not a shared concurrent store. | Restart or repository reload behavior must be understood by tests and demo instructions. |
| Latency | `[FACT]` Local retrieval is fast; OpenAI response time and availability are variable. | UI needs loading and provider-error states. |
| Privacy | `[FACT]` Chat is public to prototype users. | Account enumeration and credential disclosure must be treated as intentionally unsafe demo behavior, not a default. |

## 3. Technical constraints

### MUST

- Remain local, prototype-only, and unavailable for public deployment.
- Keep API keys and provider configuration on the backend; never expose them to React.
- Resolve usernames deterministically in the backend before any AI response or access action.
- Use exact or explicitly normalized username matching and handle zero/multiple matches safely.
- Keep the seven-day schedule and one-schedule-per-user rule intact.
- Prevent the language model from choosing an account, inventing credentials, or issuing a session by free-form text.
- Keep the current JWT authentication contract separate until a demo-access session contract is approved.

### SHOULD

- Return structured lookup results to the agent rather than raw JSON.
- Redact password fields from general retrieval context and never place them in model prompts by default.
- Add unit and API tests for exact username lookup, unknown user, duplicate user, prompt injection, and provider failure.
- Make the demo-only status visible in the chat UI and API response.
- Limit context size and log only safe metadata.

### COULD

- Add a deterministic local fallback response when no provider key is configured.
- Add a dedicated demo-access endpoint behind a feature flag.
- Replace the JSON repository with a real database and secure recovery flow later.
- Add audit events for demo access attempts once the prototype needs richer evaluation.

## 4. Technical opportunities

| Opportunity | Feasibility | Relative effort | Dependencies |
|---|---|---|---|
| Deterministic username resolver before RAG | High | Small | Mock schema and lookup tests |
| Structured account/schedule context for the AI agent | High | Small | Existing LocalRagService and retriever |
| Natural-language schedule questions | High | Small/medium | OpenAI key/model availability; prompt and regression tests |
| Explicit demo-access simulation | Medium | Medium | Session contract and UI state design |
| Future secure password recovery | Medium | Large | Identity provider or email service, real persistence, security review |

`[OPINION]` The safest prototype increment is deterministic lookup plus a simulated access confirmation, not automatic issuance of a normal production JWT from an AI response.

## 5. Technical risks and unknowns

| Risk/unknown | Impact | Current treatment |
|---|---|---|
| Username-only access enables account takeover if exposed beyond the demo | Critical | Keep local-only, label demo behavior, block production deployment. |
| Model hallucinates an account or obeys prompt injection | High | Backend owns lookup and access decisions; model receives bounded context. |
| Passwords enter retrieval context or responses | Critical | Redact credential fields by default and add tests. |
| Public chat enables account enumeration | High | Define safe response shape and consider rate limiting. |
| OpenAI 401, 429, billing, model, or network error | Medium | Show provider error and preserve a deterministic local fallback where appropriate. |
| JSON writes race or become stale across processes | Medium | Keep one local API process; defer concurrency and persistence decisions. |
| Demo session semantics are undefined | High | Resolve in Architecture Confirmation before implementation. |

## 6. Design constraints and guardrails

### Interaction

- The chat must show that account access is a local demo capability, not secure login.
- The user must receive a specific result for unknown or ambiguous usernames.
- The UI must not display passwords in normal chatbot responses.
- Loading, provider failure, and local fallback states must be understandable.

### Data and AI

- The retriever may identify relevant account/schedule records, but the agent must not be the authorization authority.
- Account identity must be resolved by backend code using structured fields.
- Prompt context must be bounded and credential fields excluded unless an explicitly approved local test requires them.
- AI output must not be treated as a command to issue a session.

### Security boundary

- This feature is forbidden for real accounts and public deployment under the current design.
- Any migration beyond local mock data requires secure password hashing, verified recovery, authorization review, and a new approval gate.
- `OPENAI_API_KEY` remains a server-only environment variable.

## 7. Questions for engineering

1. Should the prototype show a simulated logged-in state, or issue a separately named short-lived demo token?
2. Can the normal JWT guard and any demo-access state be made structurally distinct so the feature cannot accidentally become production auth?
3. What exact safe response should the public chatbot return for an existing username, a missing username, and duplicate usernames?
4. Should account lookup be a dedicated deterministic tool/service called before the AI agent, rather than part of generic RAG retrieval?
5. What context redaction test proves password fields cannot reach the model or browser response?
6. What rate limit or request cap is enough for local demo stability without implying production readiness?
7. What feature flag or environment guard prevents startup when the demo-access behavior is enabled outside local development?
8. What secure password-recovery or identity-provider design replaces this shortcut before deployment?

## 8. Validation checklist

- [x] System context and integration points mapped.
- [x] Data availability, quality, ownership, freshness, and latency documented.
- [x] Constraints classified as MUST, SHOULD, or COULD.
- [x] Opportunities paired with effort and dependencies.
- [x] Risks and unknowns include security, AI, provider, and persistence concerns.
- [x] Design guardrails are explicit for interaction, data, AI, and deployment boundary.
- [x] Engineering questions are actionable and tied to unresolved decisions.

## 9. Footer

Last updated: 20261022  
Updated by: Explore Agent with Calin's confirmed assumptions
