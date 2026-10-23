# Sequencing and Scope — GYM0012

## Implementation Phases

### Phase 1: Foundation

- [ ] **GYM0008**: Implement deterministic resolver and safe account projection.
- [ ] **GYM0009**: Implement isolated demo token, guard, and local-only gate.
- [ ] Confirm Jest/Vitest/Supertest test scripts, fixture seam, clock control, and provider injection.

### Phase 2: Core Features

- [ ] **GYM0010**: Implement safe RAG orchestration and deterministic fallback.
- [ ] **GYM0011**: Implement frontend access states, warning, and accessible status behavior.
- [ ] Add unit and API integration tests as each boundary becomes available.

### Phase 3: Integration & Polish

- [ ] Add Playwright journeys for successful access, safe rejection, and normal login-to-schedule regression.
- [ ] Add axe/keyboard checks and coverage evidence.
- [ ] Run lint, typecheck, unit, integration, build, and selected E2E gates.
- [ ] Complete task traceability and handoff evidence.

## Parallel Work Opportunities

- [ ] Resolver unit tests and provider-stub contract tests can be prepared independently after the test seams are agreed.
- [ ] Frontend component tests can proceed in parallel with backend fallback implementation using typed response fixtures.
- [ ] Accessibility assertions can be authored independently from live provider behavior.

## Blocked Dependencies

- [ ] GYM0012 execution is blocked until GYM0008–GYM0011 expose their planned boundaries; planning this quality contract is not blocked.
- [ ] E2E execution is blocked until local frontend/API startup scripts are confirmed.

## Scope Validation

### Original Requirements

- [x] Security-negative coverage for demo token, credentials, ambiguity, and prompt injection: Phases 1–3.
- [x] Provider-failure fallback coverage: Phase 2.
- [x] Existing login/schedule regression: Phase 3.
- [x] Accessibility and browser validation: Phase 3.
- [x] Local-only synthetic data and no external secrets: All phases.

### Scope Creep Detected

- [ ] No scope creep identified. Production penetration testing, load testing, remote persistence, DevOps, and public deployment remain excluded.

### Non-Goals Confirmed Excluded

- Production authentication recovery and MFA.
- Live OpenAI requests in automated tests.
- Remote database, event bus, staging, and deployment work.

## Task Tags

- **Complexity**: complex
- **Component**: cross-cutting
- **Type**: enhancement
- **Priority**: high
- **Risk**: high
