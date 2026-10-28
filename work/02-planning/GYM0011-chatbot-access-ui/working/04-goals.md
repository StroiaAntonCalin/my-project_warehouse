# Goals and Constraints — GYM0011

## Measurable Goals

- [ ] **G1 — State clarity:** Render distinct loading, success, unknown, ambiguous, provider-failure, fallback, and feature-disabled states.
- [ ] **G2 — Demo boundary:** Display “Demo access only — local prototype; do not use real accounts.” whenever demo access is shown.
- [ ] **G3 — Safe presentation:** Never render passwords, password hashes, raw tokens, provider secrets, or unrelated account data.
- [ ] **G4 — Accessibility:** Support keyboard submission, visible focus, labels, and announced status/error updates.
- [ ] **G5 — Regression:** Preserve existing login, schedule navigation, and seven-day board behavior.
- [ ] **G6 — Responsive compatibility:** Verify the experience on current Chrome, Edge, Firefox, and Safari targets.

## Constraints

- **Timeline**: No fixed deadline; keep the prototype implementation simple.
- **Resources**: Existing React app and typed API client; no new design system or staging environment.
- **Technical**: Backend returns typed response metadata; frontend does not read JSON or hold the OpenAI key.
- **Security**: Demo access remains local-only and is not normal authentication.
- **Compliance**: No real accounts, credentials, public deployment, or production recovery claims.

## Non-Goals

- Implementing backend resolver, demo token, RAG, or fallback logic.
- Changing normal login, JWT refresh/logout, schedule ownership, or exercise behavior.
- Storing provider keys, normal credentials, or raw tokens in browser storage.
- Production authentication recovery, MFA, remote persistence, or DevOps/deployment work.

## Assumptions

| Assumption | Risk | Validation |
|------------|------|------------|
| Existing chatbot component can be extended without replacing the page shell | Medium | Inspect current React component tree during research |
| API response envelope can carry `demoOnly`, `accessIssued`, `intent`, and safe message fields | High | Confirm typed client/DTO contract with GYM0010 planning |
| Existing frontend test harness supports component and accessibility assertions | Medium | Inspect package scripts and current tests |
| Semantic selectors can cover the chat interaction without adding brittle test IDs | Low | Implement role/label-based tests and add IDs only where necessary |
