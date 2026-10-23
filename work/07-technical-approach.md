# Technical Approach — GYM0012

## High-Level Strategy

Build a layered quality suite around the chatbot account-access boundaries. Unit tests validate pure resolver, projection, token, guard, fallback, DTO, and UI state behavior. API integration tests validate NestJS controller/service boundaries using isolated JSON fixtures and a stubbed provider. Playwright tests validate only the three critical user journeys: successful demo access, safe rejection, and existing normal login-to-schedule behavior.

## Architecture Decisions

### Test framework alignment

- **Choice**: Jest for NestJS/API tests, Vitest + React Testing Library for frontend tests, Supertest for API HTTP integration, Playwright for E2E, and axe-based accessibility checks where the existing tooling supports them.
- **Rationale**: Matches the approved GYM_SCHEDULER test strategy and completed authentication/schedule work.
- **Alternative rejected**: Introducing a new unified test framework would add prototype complexity and reduce consistency.

### Provider isolation

- **Choice**: Inject the OpenAI provider behind the existing chat service boundary and replace it with a deterministic stub in tests. The stub supports success, 401, 429, network, missing-key, and malformed-response cases.
- **Rationale**: Tests must not require billing, network access, or a developer API key.
- **Alternative rejected**: Live provider calls, because they are nondeterministic and risk secret exposure.

### Fixture isolation

- **Choice**: Unit tests use builders; API/repository tests copy the synthetic JSON fixture to a temporary test path and reset it per test; E2E uses seeded local accounts.
- **Rationale**: Prevents shared mutable state and makes duplicate/ambiguous account cases explicit.
- **Alternative rejected**: Mutating the checked-in `mock-data.json` during tests.

### Security assertions

- **Choice**: Assert both positive and negative behavior: safe fields are present, credential fields are absent, `demo_access` is accepted only by its dedicated guard, and normal JWT guards reject it.
- **Rationale**: The primary risk is boundary regression, not only happy-path functionality.
- **Alternative rejected**: Snapshot-only response testing, which can miss sensitive-field leakage and authorization bypasses.

## Component Changes

### Backend/API

- [ ] Add resolver unit cases for normalized, known, unknown, malformed, and duplicate usernames.
- [ ] Add token/guard unit cases for claims, issuer/audience, 15-minute expiry, feature flag, missing/malformed/expired tokens, and normal-JWT rejection.
- [ ] Add RAG projection and log/response redaction assertions.
- [ ] Add fallback contract cases for each provider failure class.
- [ ] Add Supertest boundary cases for resolver, access, chat, and normal schedule authorization.

### Frontend/App

- [ ] Add component tests for loading, success, rejected, ambiguous, provider-failure, and fallback states.
- [ ] Add assertions for visible demo-only wording, keyboard interaction, focus, labels, and announced status.
- [ ] Add Playwright journeys for successful demo access, safe rejection, and existing login-to-schedule behavior.

### Quality tooling

- [ ] Keep changed-business-logic coverage at least 90% line and 85% branch, with 95% public-interface function coverage where supported.
- [ ] Ensure lint, typecheck, unit, integration, and selected E2E commands are discoverable from package scripts.
- [ ] Record test evidence and any unavailable tooling in the task completion summary.

## Data Model Changes

No production data model changes. Tests add only synthetic builders/fixtures for:

- unique, unknown, and duplicate accounts;
- schedules containing a known exercise/day relationship;
- valid, expired, malformed, and wrong-type token payloads;
- safe fallback response envelopes.

## Integration Points

1. React chatbot -> NestJS chat endpoint: typed response assertions.
2. Chat controller -> deterministic resolver: known/unknown/ambiguous result assertions.
3. Resolver -> JSON repository: isolated fixture and unreadable/empty edge cases.
4. Chat orchestration -> RAG/agent: credential-free context and provider stub assertions.
5. Demo guard -> normal JWT guard: positive dedicated-route and negative schedule-route assertions.
6. Existing auth -> schedule: login, refresh/reload, logout, and ownership regression.

## Configuration

- `CHATBOT_DEMO_ACCESS_ENABLED=false` by default in test setup.
- Explicit development-enabled tests set `NODE_ENV=development` and the flag to `true`.
- Provider key is absent in fallback tests and replaced by a stub in provider tests.
- Test repository path points to a temporary fixture copy.
- No test reads or writes production `.env` files.

## Dev Hints

- Prefer Arrange-Act-Assert and descriptive behavior names.
- Use stable `data-testid` or accessible-role selectors for Playwright only where semantic selectors are insufficient.
- Assert absence of `password`, `passwordHash`, `token`, and provider-secret fields recursively in API/model payloads.
- Avoid fixed browser sleeps; wait on visible status or completed network state.
- Keep E2E scope narrow; put edge-case coverage in unit/API layers.
