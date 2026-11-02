# Sequencing and Scope

## Implementation Phases

### Phase 1: Foundation

- [ ] Add the typed `AccountResolution` contract and resolver service.
- [ ] Define normalization and email-shaped validation rules.
- [ ] Establish a read-only repository projection boundary.

### Phase 2: Core Features

- [ ] Resolve one normalized exact match to `{ userId, username }`.
- [ ] Return `unknown` for invalid/no-match input and `ambiguous` for duplicate matches.
- [ ] Ensure no credential-bearing fields cross the resolver boundary.

### Phase 3: Integration & Polish

- [ ] Register the resolver in the NestJS module without changing normal auth routes.
- [ ] Replace duplicate account-selection logic in chatbot orchestration with the shared resolver.
- [ ] Add unit/API regression tests and run API typecheck, lint, build, and tests.

## Parallel Work Opportunities

- [ ] Unit fixtures for unique/unknown/ambiguous cases can be prepared independently from service registration.
- [ ] Redaction assertions and normal-auth regression tests can run in parallel with resolver implementation.
- [ ] GYM0009 integration can consume the stable result contract after Phase 2.

## Blocked Dependencies

- GYM0009 and GYM0010 depend on the resolver result contract and unique-match behavior.
- No task blocks the resolver implementation itself because the JSON repository already exists.

## Scope Validation

### Original Requirements

- [x] Resolve a known unique username: Phase 2.
- [x] Reject unknown, empty, malformed, and duplicate usernames: Phase 2.
- [x] Return credential-free structured output: Phase 1–2.
- [x] Preserve User/Schedule ownership and normal JWT behavior: Phase 3.
- [x] Cover success, failure, and edge cases with tests: Phase 3.

### Scope Creep Detected

- No new public endpoint, token issuance, password recovery, AI provider behavior, frontend change, database, or remote service is included.
- Username-only account connection is the product flow, but access issuance remains explicitly owned by GYM0009.

### Non-Goals Confirmed Excluded

- Normal login or JWT issuance.
- Demo-token creation or refresh.
- Returning passwords, hashes, or full user records.
- Fuzzy matching or AI authorization.
- Persistent account mutation.

## Task Tags

- **Complexity**: simple
- **Component**: server
- **Type**: feature
- **Priority**: high
- **Risk**: high
