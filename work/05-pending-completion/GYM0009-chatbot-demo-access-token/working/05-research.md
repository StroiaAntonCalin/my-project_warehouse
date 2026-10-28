# Research Findings — GYM0009

## Search Terms

- `demo_access` JWT claims, issuer, audience, and type
- NestJS guard isolation and normal JWT rejection
- local-only environment feature flag
- resolver-gated token issuance
- expired/malformed token and auth regression testing

## Decision Inventory

| Decision | Status | Key Requirement | Link |
|----------|--------|-----------------|------|
| ADR-004 | Accepted | Normal access JWTs are short-lived and refresh tokens are backend-owned HttpOnly cookies. | [Secure session ADR](../../../../explore/decisions/gym-scheduler-adr-004-secure-session.md) |
| DEC-005 | Active | Use a separate short-lived `demo_access` token, never normal JWT issuance. | [Chatbot decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-008 | Active | Exact token claims, 15-minute expiry, issuer/audience, and dedicated guard contract. | [Chatbot decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-009 | Active | `CHATBOT_DEMO_ACCESS_ENABLED` defaults false and is only accepted in development. | [Chatbot decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-011 | Active | Unknown/duplicate usernames are non-authorizing outcomes. | [Chatbot decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |

## Current Implementation Findings

- `AuthService` currently signs normal access tokens with `JWT_SECRET`, claims only `sub`/`role`, and validates them through `JwtAuthGuard`.
- `JwtAuthGuard` currently accepts any valid token signed with the normal secret; it does not enforce token type, issuer, or audience.
- Auth tests cover normal login and refresh rotation but do not cover demo token isolation, claims, expiry, feature flags, or route opt-in.
- Configuration currently loads `.env` and exposes OpenAI status; a local demo-access flag and secret should be read through the same environment boundary without exposing values.
- The repository already uses `jsonwebtoken`, so no new JWT library is required.
- GYM0008 must provide a credential-free unique resolver result before this task issues a token.

## Related Tasks

| Task | Status | Relationship | Link |
|------|--------|--------------|------|
| GYM0003 | Completed | Existing normal auth/session behavior and regression baseline. | [Authentication task](../../../../work/06-completed/GYM0003-implement-gym-scheduler-seeded-authentication-and/task.md) |
| GYM0008 | Pending planning | Upstream resolver gate for issuance. | [Resolver task](../../GYM0008-chatbot-account-resolver/task.md) |
| GYM0010 | Pending implementation | Orchestrates safe chat response and consumes access metadata. | [RAG/fallback task](../../GYM0010-chatbot-safe-rag-fallback/task.md) |
| GYM0011 | Pending implementation | Presents demo-only access status in React. | [UI task](../../GYM0011-chatbot-access-ui/task.md) |
| GYM0012 | Pending implementation | Tests token isolation, feature flag, expiry, and auth regressions. | [Quality task](../../GYM0012-chatbot-access-quality-tests/task.md) |

## Documentation References

| Document | Relevance | Link |
|----------|-----------|------|
| Chatbot PRD | Local-only convenience scope and security exclusions. | [PRD](../../../../explore/prds/chatbot-account-access-prd.md) |
| Chatbot HLD | Identity boundary and separate demo-access direction. | [HLD](../../../../explore/hlds/chatbot-account-access-hld.md) |
| Existing auth service | Current signing, refresh, and normal token behavior. | [auth.service.ts](../../../../apps/api/src/auth/auth.service.ts) |
| Existing JWT guard | Current normal guard behavior to preserve and harden. | [jwt-auth.guard.ts](../../../../apps/api/src/auth/jwt-auth.guard.ts) |
| Existing auth tests | Baseline regression expectations. | [auth.spec.ts](../../../../apps/api/test/auth.spec.ts) |

## Conflicts and Gaps

| Gap | Description | Resolution |
|-----|-------------|------------|
| Shared JWT library | Normal and demo tokens use the same library today; type-only separation would be weaker. | Use a dedicated demo secret/config plus explicit header type, issuer, audience, and guard checks. |
| Route scope | No existing route is approved to treat demo access as normal schedule authentication. | Keep existing JWT-protected schedule routes normal-JWT-only; expose the demo guard for explicitly opted-in prototype routes only. |
| Environment defaults | Local prototype needs simple setup but must not silently enable outside development. | Default flag false; startup/config validation rejects or disables true outside `NODE_ENV=development`. |
