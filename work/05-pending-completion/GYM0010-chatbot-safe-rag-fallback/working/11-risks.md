# Risks and Dependencies — GYM0010

## Risk Assessment

| Risk | Category | Likelihood | Impact | Mitigation |
|------|----------|------------|--------|------------|
| Credentials remain in model context or sources | Security | High | Critical | Replace plaintext account documents, whitelist fields, and add recursive redaction tests. |
| Model selects an account or acts as an auth authority | Security | Medium | Critical | Resolve account deterministically before AI; reject unknown/ambiguous matches. |
| Provider failure makes the demo unusable | Dependencies/Operations | Medium | Medium | Normalize provider errors to deterministic local fallback. |
| Fallback invents or broadens facts | Security/Data | Medium | High | Generate only from bounded safe documents and explicit intent; test no-match behavior. |
| API response change breaks frontend | Dependencies/UX | Medium | Medium | Preserve `answer`/`sources`; add optional safe metadata and contract tests. |
| Prompt injection bypasses instructions | Security | Medium | High | Keep authority outside the model and add malicious-input regression cases. |
| JSON repository is unavailable or malformed | Data Model/Operations | Low | Medium | Return safe no-match/internal error and test unreadable/empty fixture cases. |
| Provider latency increases local response time | Performance | Medium | Low | Keep local fallback and provider timeout/error mapping; no production-scale target. |
| No schema migration required | Data Model | Low | Low | Keep transport types in memory; do not add persistence. |

## Dependencies

### Blocking (must complete first)

- [ ] **GYM0008**: Deterministic account resolver contract must be available for pre-agent selection.
- [ ] **GYM0009**: Demo-access metadata/guard boundary must be available without this service issuing normal JWTs.
- [ ] Existing `JsonRepository`: Safe user/schedule reads and isolated fixtures are required.

### Dependent (depends on this task)

- [ ] **GYM0011**: Frontend consumes safe optional response metadata and fallback state.
- [ ] **GYM0012**: Quality task verifies redaction, provider failures, prompt injection, and regression behavior.
- [ ] **EPIC-GYM-005**: Epic acceptance depends on safe orchestration/fallback completion.

### Related (shared context)

- [ ] **GYM0003**: Normal JWT/session behavior must remain unchanged.
- [ ] **GYM0004**: Schedule ownership and seven-day retrieval behavior.
- [ ] **GYM0005**: Exercise data shape and ordering.

## Validation Against Research

- [x] Current plaintext credential projection is explicitly identified for removal.
- [x] Current provider exception behavior is explicitly identified for normalization.
- [x] Decisions DEC-006 through DEC-011 are reflected.
- [x] API/frontend compatibility is preserved in the proposed response contract.
- [x] No new database, event bus, or public deployment scope is introduced.

### Conflicts/Gaps Found

| Issue | Description | Resolution |
|-------|-------------|------------|
| Existing password tests | Current tests assert password answers, conflicting with the approved credential-free boundary. | Replace with redaction, safe refusal, and demo-access metadata assertions. |
| Token issuance ownership | User-facing access is a separate capability, but this task could accidentally duplicate it. | Keep token/guard issuance in GYM0009; return only `accessIssued` metadata. |
| Provider client construction | Current client is initialized from environment at service construction. | Add an injectable provider seam or test stub without changing server-side key ownership. |
