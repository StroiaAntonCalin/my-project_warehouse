# Risks and Dependencies

## Risk Assessment

| Risk | Category | Likelihood | Impact | Mitigation |
|------|----------|------------|--------|------------|
| Demo token is accepted by a normal authenticated route | Security | Medium | High | Use a dedicated signing secret, exact issuer/audience/type checks, explicit `DemoAccessGuard`, and regression tests against `JwtAuthGuard`. |
| Username resolution issues a token for an unknown or ambiguous account | Security / Data exposure | Medium | High | Make unique resolver success a hard prerequisite; reject zero or multiple matches without returning account details. |
| Prototype feature is enabled outside local development | Operations / Security | Medium | High | Default the flag to false and require `NODE_ENV=development` in both issuance and verification paths. |
| Demo token leaks or is treated as a refreshable session | Security | Medium | High | Keep the token short-lived, do not add refresh support, and reject it on refresh/logout session paths. |
| Existing JWT behavior regresses while guard validation is hardened | Compatibility | Low | High | Preserve normal claims and add focused normal login/refresh/route regression tests. |
| Resolver contract changes or is incomplete when implementation begins | Dependencies | Medium | Medium | Depend on GYM0008's unique/unknown/ambiguous result contract and isolate the token service behind a typed interface. |
| Configuration differs between test and local runtime | Operations | Low | Medium | Centralize environment parsing, document safe development defaults, and test enabled/disabled/non-development combinations. |
| Performance impact from token verification | Performance | Low | Low | Use stateless local JWT verification; no new data store or network call is introduced. |
| Persistence schema or UI behavior changes | Data model / UX | Low | Low | No persistence, schema, or UI change is in scope for GYM0009. |

## Dependencies

### Blocking (must complete first)

- [ ] **GYM0008**: Account Resolver contract must distinguish unique, unknown, and ambiguous results before issuance can be safely wired.
- [ ] **GYM0003**: Existing authentication/configuration baseline must remain available for normal JWT regression coverage.

### Dependent (depends on this task)

- [ ] **GYM0010**: Chatbot access-token integration depends on the isolated issuance and guard contract.
- [ ] **GYM0011**: Account-access conversation behavior depends on a safe demo session boundary.
- [ ] **GYM0012**: Frontend/account access flow depends on the backend demo-access contract.

### Related (shared context)

- [ ] **EPIC-GYM-005**: Parent chatbot account-access epic and acceptance criteria.
- [ ] **GYM0009**: This task's PRD, design sketch, decision log, and ADR-004 define the security boundary.

## Validation Against Research

- [x] No conflicts with existing decisions: the design preserves normal JWT sessions and uses an isolated demo token.
- [x] Dependencies align with related tasks: resolver precedes issuance; chatbot and frontend integration follow the token boundary.
- [x] No untracked remote-service, database, or production-deployment dependency was introduced.

### Conflicts/Gaps Found

| Issue | Description | Resolution |
|-------|-------------|------------|
| Existing normal guard is permissive | Current validation does not explicitly enforce demo-token separation. | Harden normal validation and add a negative demo-token regression test. |
| No route is currently approved for demo access | Applying the demo guard globally would create an unsafe implicit boundary. | Keep route opt-in out of this task; later integration tasks must name the route explicitly. |
| Production account recovery is unresolved | Prototype convenience flow is not a production recovery mechanism. | Keep the feature local/development-only and record production recovery/MFA as a deployment blocker. |
