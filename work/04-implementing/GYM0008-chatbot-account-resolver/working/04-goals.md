# Goals and Constraints

## Measurable Goals

- [ ] **G1**: A valid username matching exactly one local account returns a credential-free `unique` result containing only the approved user ID and username.
- [ ] **G2**: Empty, malformed, and unknown usernames return non-authorizing results and never select an account.
- [ ] **G3**: Duplicate usernames return `ambiguous` and never select an account.
- [ ] **G4**: Resolver results contain no password, password hash, refresh token, access token, or full user record.
- [ ] **G5**: The result can be consumed by GYM0009 to issue temporary `demo_access`, enabling the later chatbot-to-schedule flow without using the normal password login path.
- [ ] **G6**: Existing normal login, schedule ownership, and JSON repository behavior remain unchanged.

## Constraints

- **Timeline**: Local prototype; no fixed deadline.
- **Resources**: Existing NestJS API, local JSON repository, and current Jest test harness.
- **Technical**: No new dependency, database, remote service, or AI-driven account selection.
- **Security**: Username-only access is temporary demo access only; the resolver never authenticates a user as a normal session and never returns credentials.
- **Integration**: GYM0009 owns token issuance; GYM0010 owns orchestration; a later integration route/frontend flow will consume the result.
- **Compliance**: Not a production password-recovery or identity-verification mechanism.

## Non-Goals

- Issuing or refreshing JWTs or `demo_access` tokens inside GYM0008.
- Returning, displaying, or storing passwords or password hashes.
- Letting the AI model choose an account or authorize access.
- Changing normal login, schedule guards, or user ownership rules.
- Adding persistence, account mutation, or remote identity services.

## Assumptions

| Assumption | Risk | Validation |
|------------|------|------------|
| Usernames are the stable lookup key in the local mock repository. | Medium | Validate against the contracts and mock-data fixture. |
| Exact normalized username matching is sufficient for the prototype. | Medium | Unit-test casing, whitespace, malformed, and empty values. |
| Duplicate fixtures can be isolated in memory for tests. | Low | Clone or temporarily extend repository fixture data without persisting it. |
| GYM0009 will consume only the `unique` result before issuing demo access. | High | Add resolver-to-token integration regression coverage in GYM0012. |
