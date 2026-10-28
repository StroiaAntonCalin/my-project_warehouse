# Sequencing and Scope — GYM0010

## Implementation Phases

### Phase 1: Foundation

- [ ] Confirm GYM0008 resolver contract and account-specific lookup behavior.
- [ ] Define safe document, intent, resolution, provider, and response types.
- [ ] Add provider seam/stub and redaction test helpers.

### Phase 2: Core Features

- [ ] Remove credentials from retriever projections and bound account/schedule context.
- [ ] Refactor LocalRagService to orchestrate resolver -> retrieval -> agent.
- [ ] Normalize provider failures into DEC-010 fallback output.
- [ ] Preserve `answer`/`sources` and add safe optional metadata.

### Phase 3: Integration & Polish

- [ ] Add API integration tests for success, ambiguity, no-match, provider failures, and prompt injection.
- [ ] Verify GYM0011 frontend compatibility and GYM0012 regression coverage.
- [ ] Run lint, typecheck, build, unit, and integration gates; document safe logging behavior.

## Parallel Work Opportunities

- [ ] Safe projection unit tests can be written while resolver contract is finalized.
- [ ] Provider failure mapping tests can proceed with a stub independently of frontend work.
- [ ] Response contract fixtures can be shared with GYM0011 and GYM0012.

## Blocked Dependencies

- [ ] GYM0008 must define deterministic resolver outcomes before account-specific orchestration is finalized.
- [ ] GYM0009 owns demo-access issuance and must remain separate from this service.

## Scope Validation

### Original Requirements

- [x] Deterministic account resolution before AI: Phases 1–2.
- [x] Safe credential-free RAG context: Phase 2.
- [x] Provider-independent deterministic fallback: Phase 2.
- [x] Unknown/ambiguous/malformed/prompt-injection handling: Phases 2–3.
- [x] API compatibility and safe observability: Phase 3.

### Scope Creep Detected

- [ ] None. Remote database, vector database, event bus, new service, production auth recovery, and deployment remain excluded.

### Non-Goals Confirmed Excluded

- Normal JWT issuance or validation in chat orchestration.
- Password retrieval or credential disclosure.
- Live provider dependency in tests.

## Task Tags

- **Complexity**: complex
- **Component**: cross-cutting
- **Type**: refactor
- **Priority**: high
- **Risk**: high
