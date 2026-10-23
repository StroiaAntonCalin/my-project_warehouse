# Goals and Constraints — GYM0012

## Measurable Goals

- [ ] **G1 — Resolver safety:** Cover known, unknown, empty, malformed, and duplicate usernames; ambiguous or unknown inputs issue no access result.
- [ ] **G2 — Token isolation:** Prove `demo_access` claims, expiry, feature flag, and guard behavior, including rejection by normal JWT guards.
- [ ] **G3 — Credential protection:** Prove passwords, password hashes, raw tokens, prompts, and provider error details never enter model context, API responses, or logs.
- [ ] **G4 — Provider resilience:** Cover OpenAI success, 401, 429, network failure, missing-key, and deterministic fallback paths.
- [ ] **G5 — User regression:** Preserve login-to-schedule behavior and validate chatbot success, rejection, fallback, keyboard, focus, and accessible status journeys.
- [ ] **G6 — Coverage evidence:** Meet the approved 90% line and 85% branch business-logic floors, with explicit negative security cases recorded in test output.

## Constraints

- **Timeline**: No fixed deadline; optimize for a simple prototype delivery.
- **Resources**: Local React and NestJS project; no dedicated staging environment or external QA service.
- **Technical**: JSON mock repository only; one local backend process; latest major Chrome, Edge, Firefox, and Safari versions; OpenAI calls must be stubbed in automated tests.
- **Security**: Feature is local-only. `demo_access` is not normal authentication and must not be accepted by normal JWT-protected schedule routes.
- **Compliance**: No production or public-deployment approval is implied; no real accounts or credentials may be used.

## Non-Goals

- Production authentication, password recovery, MFA, identity proofing, or remote persistence.
- Live OpenAI requests in automated tests or dependence on a configured API key.
- Performance/load testing for production-scale data.
- DevOps, staging, deployment, or monitoring implementation.
- Replacing the existing login, refresh/logout, seven-day schedule, or exercise behavior.

## Assumptions

| Assumption | Risk | Validation |
|------------|------|------------|
| Existing unit/API/frontend test tooling is available in the repository | Medium | Inspect package scripts and run the canonical commands in planning |
| OpenAI integration can be injected or mocked at the provider boundary | High | Add a deterministic provider stub and failure fixtures |
| The mock JSON fixture is stable enough for named test cases | Medium | Use isolated fixture builders or reset data per test |
| Existing login E2E selectors and routes remain available | Medium | Execute the current login-to-schedule regression before feature tests |
| Local-only configuration can be set per test environment | High | Test both `CHATBOT_DEMO_ACCESS_ENABLED=false` and development-enabled paths |
