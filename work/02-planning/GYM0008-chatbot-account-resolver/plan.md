# Technical Implementation Plan — GYM0008

## Overview

Implement a deterministic backend Account Resolver for the username-only chatbot access flow. It is the authoritative account-selection boundary before RAG, AI wording, or temporary demo-access issuance. It reads local mock accounts through the existing JSON repository and returns only a safe typed result.

GYM0008 does not authenticate users, issue tokens, expose passwords, add an endpoint, or change normal login/schedule authorization.

## Product Flow and Goals

1. The user provides a username through the chatbot.
2. GYM0008 resolves it deterministically.
3. A unique result is passed to GYM0009 for temporary demo_access issuance.
4. Later orchestration/frontend work opens the selected mock schedule.
5. Unknown, malformed, or ambiguous input never selects an account.

Goals: exact unique resolution, safe non-authorizing failures, credential-free output, compatibility with GYM0009/GYM0010, and no normal JWT or schedule regression.

## Decisions and References

- DEC-002: reuse the existing User and Schedule model.
- DEC-004: keep Account Resolver separate from Identity, RAG, AI, repository, and frontend ownership.
- DEC-006: resolve usernames deterministically before AI.
- DEC-008: only the separate demo_access boundary may consume a unique result.
- DEC-011: zero or multiple matches are non-authorizing.
- Local JSON remains the only data source; no database, remote service, event bus, or new dependency.

References: working/03-problem.md, working/04-goals.md, working/05-research.md, working/07-technical-approach.md, working/08-pipeline-tests.md, working/09-architecture.md, working/10-acceptance-criteria.md, working/11-risks.md, working/12-sequencing.md, the chatbot PRD, decision log, JsonRepository, and DemoAccessService.

## Technical Contract

Export a discriminated union:

    type AccountResolution =
      | { status: 'unique'; userId: string; username: string }
      | { status: 'unknown'; username: string }
      | { status: 'ambiguous'; username: string };

Implement an injectable AccountResolver service with a method equivalent to resolve(username: string): AccountResolution.

Processing rules:

- Trim input and require a simple email-shaped username.
- Compare exact normalized usernames case-insensitively.
- Count every matching repository record.
- One match returns only its ID and canonical username.
- Zero matches return unknown.
- Multiple matches return ambiguous.
- Never return the User record, password, password hash, token, or unnecessary role data.
- Do not mutate or persist repository data.

## Components and Changes

- Add apps/api/src/chat/account-resolver.ts with result types and resolver logic.
- Register AccountResolver in the NestJS module.
- Reuse a read-only repository boundary; add a narrow repository method only if snapshot access is insufficient.
- Replace GYM0010 duplicate username resolution with this shared resolver.
- Pass only the unique projection to safe schedule retrieval or GYM0009.
- Do not modify normal AuthService, JwtAuthGuard, schedule guards, or login behavior.
- Do not issue demo_access in GYM0008.

## Architecture and Integration

    ChatController / LocalRagService
        -> extract username
        -> AccountResolver
        -> JsonRepository / local mock data
        -> unique projection OR unknown/ambiguous result
        -> safe RAG or DemoAccessService

No new public endpoint is required. A future access endpoint must require status=unique and use the dedicated demo guard.

## Error Handling

- Empty, whitespace-only, malformed, partial, display-name, encoded, or prompt-injection-style values: non-authorizing unknown result.
- Unknown username: unknown result with no selected account.
- Duplicate normalized username: ambiguous result with no selected account.
- Repository read failure: preserve as infrastructure failure; never silently convert it to a match.
- Logs and responses contain no credentials or raw repository records.

## Test Inventory

Unit coverage includes known unique users, case/whitespace normalization, empty/malformed input, unknown users, duplicate normalized users using isolated fixtures, credential-field absence, and non-mutation.

Integration/regression coverage includes chat -> resolver -> safe RAG context, unique resolver -> DemoAccessService handoff, rejection of unknown/ambiguous access, normal login, JWT guard, schedule ownership, exercise behavior, API typecheck, lint, build, and tests.

## Risks and Dependencies

No task blocks the resolver itself; the existing JsonRepository is available. GYM0009 token issuance, GYM0010 safe orchestration, and GYM0012 regression coverage depend on this contract. GYM0003 and GYM0004/GYM0006 provide related auth/schedule baselines.

Primary risk is turning username-only convenience into unintended authentication. Mitigations are exact matching, safe projection, explicit statuses, demo-token separation, and regression tests. Production deployment remains out of scope.

## Implementation Strategy

### Phase 1 — Foundation

Define the result contract, validation, normalization, and read-only repository boundary.

### Phase 2 — Core Resolver

Implement unique, unknown, and ambiguous outcomes with credential-free projection and unit tests.

### Phase 3 — Integration and Handoff

Register the service, delegate GYM0010 account selection to it, add API/regression tests, run quality gates, and document the contract.

## Developer Hints

- Follow existing NestJS injectable-service conventions.
- Keep the resolver read-only and do not expose full User objects.
- Use stable canonical usernames from repository records in unique results.
- Avoid partial matching and AI authorization.
- Run the existing API test, typecheck, lint, and build scripts.
