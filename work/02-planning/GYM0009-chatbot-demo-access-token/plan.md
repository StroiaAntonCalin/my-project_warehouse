# Technical Implementation Plan

## Overview

Implement the isolated DEC-008 `demo_access` token contract for the prototype chatbot account-access flow. A token may be issued only after the Account Resolver returns exactly one credential-free identity. It is accepted only by an explicitly opted-in DemoAccessGuard; existing normal JWT routes remain normal-session-only.

This is a server-side security boundary. It adds no public endpoint, schedule UI change, normal login/refresh/logout replacement, or remote persistence.

## Problem and Goals

The chatbot needs temporary access after a deterministic username match, but username-only convenience must not become an authentication bypass. The implementation provides:

- an exact short-lived demo token contract;
- resolver-gated issuance for unique matches only;
- strict separation between demo and normal JWT guards;
- a local-development-only feature gate;
- fail-closed handling for unknown, ambiguous, malformed, expired, disabled, and wrong-context requests;
- no regression to normal authentication, refresh rotation, logout, or schedule ownership.

Non-goals are production account recovery, MFA/identity proofing, non-development enablement, a new database/event bus, and exposing passwords, hashes, or raw tokens.

## Decisions and Findings

- ADR-004 remains authoritative for normal access JWTs and rotating refresh cookies.
- DEC-005/008 define a separate short-lived demo token with exact claims and guard behavior.
- DEC-009 requires CHATBOT_DEMO_ACCESS_ENABLED to default false and work only in development.
- DEC-011 makes unknown and ambiguous usernames non-authorizing.
- AuthService signs normal tokens with JWT_SECRET; JwtAuthGuard is the normal route boundary.
- jsonwebtoken is already available; no new JWT library is required.
- GYM0008 supplies the unique/unknown/ambiguous resolver result.

References: working/03-problem.md, working/04-goals.md, working/05-research.md, working/07-technical-approach.md, working/09-architecture.md, working/10-acceptance-criteria.md, working/11-risks.md, working/12-sequencing.md.

## Token Contract

Use a dedicated DEMO_ACCESS_SECRET rather than JWT_SECRET. A development-only fallback may support local setup, but production-like environments must require explicit configuration.

Required signed values:

- header typ=demo_access;
- iss=gym-scheduler-demo;
- aud=gym-scheduler-demo-access;
- demo=true;
- role=demo_member;
- resolved sub and username;
- iat and exp, with a 15-minute lifetime.

There is no refresh or silent-renewal path. Issuance receives only a unique resolver result, never a raw password or credential-bearing record.

## Guard and Route Behavior

DemoAccessService.issue() validates the environment gate and resolver result, signs the contract, and returns the token. DemoAccessGuard extracts a bearer token and verifies the dedicated secret, algorithm, exact type, issuer, audience, marker, role, subject, username, and expiry. It attaches only safe identity needed by the opted-in route.

JwtAuthGuard and normal schedule routes remain the default. They explicitly reject demo tokens. A normal access token is not accepted by DemoAccessGuard. No schedule route is implicitly changed; a later task must explicitly opt in a named route.

## Local Configuration

- CHATBOT_DEMO_ACCESS_ENABLED defaults to false.
- True is effective only when NODE_ENV=development.
- Issuance and verification enforce the same gate.
- Non-development environments reject or disable demo access.
- Tests use fake timers and test-only secrets; no real secrets are committed.

## Components and Files

- apps/api/src/auth/demo-access.service.ts: typed claims/result, issuance, verification, configuration, resolver gate.
- apps/api/src/auth/demo-access.guard.ts: bearer extraction, strict verification, environment gate, safe identity attachment.
- apps/api/src/auth/jwt-auth.guard.ts and/or normal verification: explicit demo-token rejection.
- Auth module registration: injectable service/guard, never global demo-guard application.
- apps/api/test/auth.spec.ts plus focused demo-access tests: claims, expiry, flags, isolation, resolver outcomes, regressions.
- Environment documentation: local-only enablement without secret values.

## Integration Points

There is no new public endpoint in GYM0009:

chat orchestration -> Account Resolver -> DemoAccessService -> demo_access token
                                         -> DemoAccessGuard on explicit route
normal login -> AuthService -> normal JWT -> JwtAuthGuard -> normal schedule route

The resolver distinguishes exactly one match from zero and multiple matches. Unknown and ambiguous outcomes produce no token. Future chatbot/UI tasks consume access metadata without treating demo access as a normal session.

## Error Behavior

Missing, malformed, expired, invalid-signature, wrong-type, wrong-issuer, wrong-audience, wrong-role, invalid-subject, disabled, non-development, unknown, and ambiguous cases fail closed with safe unauthorized/feature-disabled behavior. Responses and logs disclose no passwords, hashes, raw tokens, or enumeration details.

## Test Inventory

Unit tests cover exact claims, 15-minute expiry, dedicated secret, identity mapping, resolver outcomes, feature configuration, malformed inputs, invalid signatures, expiry, and wrong claims.

Integration/regression tests cover unique resolver -> issue -> DemoAccessGuard verification, demo token -> normal guard rejection, normal token -> normal route success and demo guard rejection, no demo refresh, and existing login/refresh/logout/schedule ownership behavior.

Pipeline fuzz tests cover malformed bearer inputs, claim permutations, expired tokens, flag/environment combinations, and unknown/ambiguous resolver results. Smoke coverage is deferred to a later explicitly opted-in route.

## Risks and Dependencies

Blocking dependencies are GYM0008's resolver contract and GYM0003's normal authentication baseline. GYM0010, GYM0011, and GYM0012 depend on this boundary. The primary risk is token-boundary confusion; mitigation is a dedicated secret, exact validation, explicit guard opt-in, and negative authorization tests. Production recovery remains a deployment blocker.

## Implementation Strategy

1. Confirm resolver result type and define claims/configuration.
2. Implement service and local-only gate.
3. Implement dedicated guard and normal-guard isolation.
4. Register components without changing route behavior globally.
5. Add unit, integration, and regression tests.
6. Document local configuration and run checks.

Claim/config tests, guard rejection tests, normal-auth regressions, and documentation can proceed in parallel after the contract is fixed. No persistence or remote service is required.

## Developer Hints

- Follow existing NestJS/configuration conventions and jsonwebtoken usage.
- Centralize typed token verification; do not duplicate validation across routes.
- Treat demo access as a capability for one explicitly selected prototype route, not a replacement session.
- Use deterministic clocks in expiry tests and generic API errors.
