# Decision Log: Chatbot Account Access

- HLD: HLD - GYM_SCHEDULER Chatbot Account Access
- Slug: chatbot-account-access
- Engagement start: 2026-10-22
- Last updated: 2026-10-22
- Status: Active

## Decision index

| ID | Date | Step | Decision | Driver | Status | Evidence |
|---|---|---|---|---|---|---|
| DEC-001 | 2026-10-22 | B.1.1 | Use Fast Lane architecture confirmation | Explore Bundle / Calin | Active | [OBS] |
| DEC-002 | 2026-10-22 | B.1.1 | Reuse validated GYM_SCHEDULER domain model | Calin | Active | [OBS] |
| DEC-003 | 2026-10-22 | B.1.1 | Use individual Explore artifacts because feature architecture context is absent | Agent recommendation | Active | [ASM] |
| DEC-004 | 2026-10-22 | B.1.2 | Preserve existing GYM_SCHEDULER ownership boundaries and platform conventions | Agent recommendation | Active | [INF] |
| DEC-005 | 2026-10-22 | B.1.3 | Use a separate short-lived `demo_access` token | Calin | Active | [OBS] |
| DEC-006 | 2026-10-22 | B.1.3 | Resolve usernames deterministically before AI generation | Calin | Active | [OBS] |
| DEC-007 | 2026-10-22 | B.1.3 | Use a deterministic local fallback for provider failure | Calin | Active | [OBS] |
| DEC-008 | 2026-10-23 | Govern readiness | Define the isolated `demo_access` token contract | Agent recommendation for approved prototype direction | Active | [INF] |
| DEC-009 | 2026-10-23 | Govern readiness | Enforce local-only demo feature enablement | Agent recommendation for approved prototype direction | Active | [INF] |
| DEC-010 | 2026-10-23 | Govern readiness | Define the deterministic fallback response envelope | Agent recommendation for approved prototype direction | Active | [INF] |
| DEC-011 | 2026-10-23 | Govern readiness | Reject duplicate usernames as ambiguous | Agent recommendation for approved prototype direction | Active | [INF] |
| DEC-012 | 2026-10-23 | Govern readiness | Use explicit local-prototype demo wording | Agent recommendation for approved prototype direction | Active | [INF] |

## Decision details

### DEC-001 - Fast Lane confirmation depth

- What: Use confirmation-level architecture work for this prototype feature.
- Why: `[OBS]` The Explore Bundle selected Fast Lane and the feature is local-only with no public deployment.
- Alternatives rejected: Full HLD engagement - disproportionate to the approved prototype scope; no architecture work - would leave boundaries undocumented.
- Driver: Explore Bundle and Calin's approved scope.
- Impact: Produce boundary, truth, design sketch, decisions, and blockers; do not create a new full platform HLD.
- Status: Active.

### DEC-002 - Reuse GYM_SCHEDULER domain

- What: Treat User, Schedule, Schedule Card, Exercise Assignment, and JWT as the canonical domain vocabulary.
- Why: `[OBS]` The existing domain model is validated and the feature remains within GYM_SCHEDULER.
- Alternatives rejected: Create a separate account-access domain - would duplicate ownership and terminology.
- Driver: Calin's selection to reuse the existing domain model.
- Impact: Feature-specific concepts remain supporting boundary objects.
- Status: Active.

### DEC-003 - Fallback architecture context

- What: Use context, feasibility, domain mapping, PRD, and risks directly until a feature-specific architecture context exists.
- Why: `[ASM]` No `architecture-context.md` exists in the feature folder.
- Alternatives rejected: Stop architecture work - unnecessary because the workflow explicitly permits fallback; invent consolidated findings - would reduce evidence quality.
- Driver: Agent recommendation.
- Impact: Claims must retain evidence labels and architecture-context absence remains a tracked caveat.
- Status: Proposed pending ARCH-B1a confirmation.

### DEC-004 - Preserve existing ownership and platform boundaries

- What: Keep Identity & Access, Schedule Management, Chat Orchestration, Account Resolver, RAG, AI Agent, repository, and frontend responsibilities separate.
- Why: `[INF]` Existing GYM_SCHEDULER HLD and the approved PRD require normal JWT and schedule ownership behavior to remain intact.
- Alternatives rejected: Let the AI agent authorize access - rejected because it violates deterministic authorization and creates prompt-injection risk; create a new service deployment - rejected because no prototype workload justifies additional infrastructure.
- Driver: Agent recommendation grounded in existing HLD and feasibility guardrails.
- Impact: The design sketch will use modules within one NestJS process and a separate deterministic resolver.
- Status: Proposed pending ARCH-B1b validation.

### DEC-005 - Separate demo access token

- What: Use a short-lived token explicitly named and scoped as `demo_access`, separate from normal JWT authentication.
- Why: `[OBS]` Calin selected option B to provide a usable prototype access state without converting username-only lookup into normal authentication.
- Alternatives rejected: Frontend-only simulation - less useful for navigating API-backed schedule screens; normal JWT issuance - rejected as an authentication bypass.
- Driver: Calin, architecture decision point 1.
- Impact: Requires a separate guard/claim and explicit expiry; must never satisfy normal JWT authorization accidentally.
- Status: Active.

### DEC-006 - Deterministic resolver before AI

- What: Resolve the username in backend code before invoking the AI agent.
- Why: `[OBS]` Calin selected option A to make account choice testable and prevent model authorization.
- Alternatives rejected: AI tool-driven resolution - more orchestration risk; raw prompt data - unsafe and non-deterministic.
- Driver: Calin, architecture decision point 2.
- Impact: Chat orchestration must pass a structured result into RAG/agent processing.
- Status: Active.

### DEC-007 - Deterministic local fallback

- What: Return a deterministic local response when the OpenAI provider fails or is unavailable.
- Why: `[OBS]` Calin selected option B to preserve local demo usability.
- Alternatives rejected: Provider error only - less reliable for demonstrations; cached responses - can be stale or incorrect.
- Driver: Calin, architecture decision point 3.
- Impact: Fallback must use safe structured data and must not expose credentials.
- Status: Active.

### DEC-008 - Isolated `demo_access` token contract

- What: Issue a separately signed short-lived JWT with header `typ=demo_access`; claims are `sub` (resolved mock-user id), `username`, `role=demo_member`, `demo=true`, `iss=gym-scheduler-demo`, `aud=gym-scheduler-demo-access`, `iat`, and `exp`.
- Expiry: 15 minutes; no refresh token and no silent renewal.
- Guard behavior: `DemoAccessGuard` requires the type, issuer, audience, `demo=true`, and expiry. The normal JWT guard rejects `typ=demo_access`; schedule routes remain normal-JWT-only unless a route explicitly opts into the demo guard.
- Why: Preserves the selected separate-token direction while making the security boundary testable.
- Status: Active for prototype implementation; not a production authentication design.

### DEC-009 - Local-only feature enablement

- What: Gate the feature with `CHATBOT_DEMO_ACCESS_ENABLED`, defaulting to `false`. It may be `true` only when `NODE_ENV=development`; startup validation disables/rejects the feature for any other environment. Controllers and guards return a safe feature-disabled response when the flag is off.
- Why: The username-only convenience is explicitly a local prototype capability.
- Status: Active for prototype implementation; public deployment remains out of scope.

### DEC-010 - Deterministic fallback response envelope

- What: Provider-independent fallback responses use `{ source: "local", mode: "fallback", message, intent, accountUsername?: string, accessIssued: boolean, demoOnly: true }`. `message` is generated only from safe projections. Passwords, password hashes, raw tokens, prompts, and provider errors are excluded. Unknown/ambiguous users use `accessIssued: false`; successful resolution may set it to true only after the separate token is issued by the deterministic access path.
- Why: Gives frontend and API tests a stable contract without making the model or natural-language response an authorization authority.
- Status: Active for prototype implementation.

### DEC-011 - Duplicate username handling

- What: Treat zero matches and multiple matches as non-authorizing resolver outcomes; never issue `demo_access` for an ambiguous username.
- Why: A username-only convenience flow must not guess an account.
- Status: Active for prototype implementation.

### DEC-012 - Demo-only UI wording

- What: Show “Demo access only — local prototype; do not use real accounts.” wherever the chatbot presents demo access state.
- Why: Makes the local-only boundary visible at the point of use.
- Status: Active for prototype implementation.

## Validation

- Every decision includes rationale, alternatives, driver, evidence, and status.
- No production authentication decision is implied by this log.

Last updated: 2026-10-23
