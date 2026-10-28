# Risks and Dependencies — GYM0011

## Risk Assessment

| Risk | Category | Likelihood | Impact | Mitigation |
|------|----------|------------|--------|------------|
| UI renders sensitive or untrusted response fields | Security | Medium | High | Whitelist response metadata and test recursive absence of credentials/tokens. |
| Users mistake demo access for normal authentication | Security/UX | Medium | High | Always show the exact local-prototype warning near access state. |
| Backend response envelope changes during parallel planning | Dependencies | Medium | Medium | Preserve `answer` compatibility and coordinate optional fields with GYM0010. |
| Chat state breaks login or schedule state | UX | Low | High | Keep panel state local and cover authenticated schedule regression. |
| Accordion is not keyboard accessible | UX | Medium | Medium | Use real buttons, `aria-expanded`, `aria-controls`, focus, and keyboard tests. |
| Provider errors expose raw details | Security | Medium | High | Map all failures to concise safe UI messages; never render raw errors. |
| Browser layout fails on narrow screens | UX/Performance | Medium | Medium | Reuse responsive CSS and verify supported browser widths. |
| New test dependency is unavailable | Dependencies/Operations | Medium | Low | Inspect existing scripts first; do not add dependencies without approval. |
| No data model change | Data Model | Low | Low | Keep all state in the existing React component/request flow. |

## Dependencies

### Blocking (must complete first)

- [ ] **GYM0010**: Provides the safe optional response metadata and fallback contract consumed by the UI.
- [ ] Existing API client and chat endpoint: Request shape and `answer` compatibility must remain available.
- [ ] Existing React/Vitest tooling: Component test harness must be confirmed.

### Dependent (depends on this task)

- [ ] **GYM0012**: Uses UI states and selectors in component, accessibility, and E2E regression coverage.
- [ ] **EPIC-GYM-005**: Depends on the demo-access experience meeting warning and safe-presentation acceptance criteria.

### Related (shared context)

- [ ] **GYM0004**: Existing authenticated schedule UI and navigation baseline.
- [ ] **GYM0009**: Demo token/guard metadata and local-only boundary.

## Validation Against Research

- [x] Existing ChatPanel and API flows were inspected.
- [x] Decisions DEC-009, DEC-010, and DEC-012 are reflected.
- [x] Accessibility requirements align with existing guidance.
- [x] No new endpoint, persistence, provider key, or production auth behavior is introduced.

### Conflicts/Gaps Found

| Issue | Description | Resolution |
|-------|-------------|------------|
| Optional response fields | Current UI only uses `answer`; backend metadata is still implemented by GYM0010. | Keep `answer` required for compatibility and render optional fields defensively. |
| Browser E2E tooling | Playwright is specified but not present in the web package. | Verify shared tooling during implementation; do not add dependencies without approval. |
