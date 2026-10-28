# Risks and Dependencies

## Risk Assessment

| Risk | Category | Likelihood | Impact | Mitigation |
|------|----------|------------|--------|------------|
| Username-only resolution is mistaken for normal authentication | Security | Medium | High | Return a resolver result only; keep token issuance in GYM0009 and normal JWT guards unchanged. |
| Duplicate usernames select the wrong account | Security / Data exposure | Medium | High | Count normalized exact matches and return `ambiguous` for more than one. |
| Credentials leak through the result or logs | Security | Medium | High | Return only user ID and username; assert forbidden fields in tests and avoid logging raw records. |
| Case/whitespace behavior creates inconsistent matches | Data quality | Medium | Medium | Normalize once at the resolver boundary and test variants. |
| Repository changes break existing login behavior | Compatibility | Low | High | Prefer a read-only resolver service over changing `findUser()` semantics; run auth/schedule regressions. |
| Malformed or adversarial input triggers fuzzy selection | Security / UX | Medium | Medium | Require email-shaped input and exact normalized equality; never use partial or AI matching. |
| Repository read failure is hidden as unknown | Operations | Low | Medium | Preserve infrastructure errors separately from expected non-match results. |
| Large user lists make linear lookup slow | Performance | Low | Low | Current prototype JSON is small; keep the interface isolated for future indexed storage. |
| No schema or UI changes are needed | Data model / UX | Low | Low | Keep the task limited to a typed service and tests. |

## Dependencies

### Blocking (must complete first)

- [ ] None for the resolver itself; it can read the existing JSON repository.

### Dependent (depends on this task)

- [ ] **GYM0009**: Requires the `unique` result before issuing temporary `demo_access`.
- [ ] **GYM0010**: Must consume this resolver before RAG/AI account-specific retrieval.
- [ ] **GYM0012**: Validates the resolver and downstream security boundary.

### Related (shared context)

- [ ] **GYM0003**: Existing User/authentication contract and regression baseline.
- [ ] **GYM0004/GYM0006**: Schedule and exercise ownership behavior that must remain unchanged.
- [ ] **EPIC-GYM-005**: Parent chatbot account-access epic.

## Validation Against Research

- [x] No conflicts with active decisions; deterministic resolution and duplicate rejection align with DEC-006 and DEC-011.
- [x] Dependencies align with related tasks; resolver precedes token issuance and safe orchestration.
- [x] No new persistence, remote provider, or deployment dependency introduced.

### Conflicts/Gaps Found

| Issue | Description | Resolution |
|-------|-------------|------------|
| Existing `findUser()` returns a full record | Direct use would expose credentials to callers. | Keep the resolver projection boundary and do not return the repository record. |
| GYM0010 currently has local lookup logic | Duplicate selection logic could drift. | Replace or delegate its username resolution to the shared resolver during integration. |
| Production recovery remains unresolved | Username-only access is unsafe outside the prototype. | Retain local-only/demo-only constraints and block deployment until a production design exists. |
