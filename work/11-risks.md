# Risks and Dependencies — GYM0012

## Risk Assessment

| Risk | Category | Likelihood | Impact | Mitigation |
|------|----------|------------|--------|------------|
| Security-negative cases are omitted or weakened | Security | Medium | High | Make token isolation, redaction, ambiguity rejection, and prompt-injection cases mandatory acceptance criteria. |
| Tests pass only because provider calls are mocked incorrectly | Dependencies | Medium | High | Test the provider seam with explicit success and failure fixtures; add API-level assertions for fallback mapping. |
| Shared JSON fixture creates order-dependent tests | Data Model | Medium | Medium | Use builders and temporary per-test fixture copies; reset state after each integration test. |
| Existing login/schedule behavior regresses | Security/UX | Low | High | Preserve the completed GYM0003/GYM0004 regression journeys in Playwright/API coverage. |
| Browser tests become flaky | UX/Operations | Medium | Medium | Use semantic selectors, condition-based waits, isolated startup, and a <1% flaky-rate target. |
| Coverage thresholds slow prototype feedback | Operations | Low | Low | Apply floors to changed business logic and keep E2E scope to three critical journeys. |
| No scale/performance evidence exists | Performance | High | Low | Keep performance/load testing out of scope; retain only the local resolver smoke target. |
| No schema migration is required | Data Model | Low | Low | Use synthetic JSON fixtures and document remote persistence as out of scope. |

## Dependencies

### Blocking (must complete first)

- [ ] **GYM0008**: Resolver behavior and test seam must exist for account-resolution cases.
- [ ] **GYM0009**: Demo token and guard contract must exist for isolation tests.
- [ ] **GYM0010**: Safe RAG projection and fallback envelope must exist for provider/redaction tests.
- [ ] **GYM0011**: Frontend states and selectors must exist for UI/E2E/accessibility tests.
- [ ] Existing test tooling: package scripts and local test fixtures must be confirmed during implementation.

### Dependent (depends on this task)

- [ ] Epic completion/handoff for EPIC-GYM-005 depends on this quality evidence.
- [ ] Promotion of GYM0008–GYM0011 to completion depends on the relevant regression gates passing.

### Related (shared context)

- [ ] **GYM0003**: Existing authentication/session regression baseline.
- [ ] **GYM0004**: Existing schedule ownership regression baseline.
- [ ] **GYM0005**: Existing exercise behavior regression baseline.
- [ ] **GYM0007**: Epic-forming and traceability context.

## Validation Against Research

- [x] No conflicts with accepted normal JWT/session decisions.
- [x] Dependencies align with the chatbot test strategy and task graph.
- [x] Credential and provider boundaries match DEC-008 through DEC-012.
- [x] Local-only and no-live-provider constraints are preserved.

### Conflicts/Gaps Found

| Issue | Description | Resolution |
|-------|-------------|------------|
| Formal task sequencing | Quality tests are planned before implementation tasks even though their execution depends on those tasks. | Define the cross-cutting test contract now; execute tests after GYM0008–GYM0011 expose the planned seams. |
| Playwright package status | The strategy requires Playwright when available, but package presence is not yet verified. | Verify package scripts during implementation; do not add a dependency without explicit approval. |
| Feature architecture context | A feature-specific architecture-context file is absent. | Accepted Fast Lane limitation; use the validated feature HLD and decision log. |
