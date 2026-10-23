# Acceptance Criteria — GYM0012

## Epic Link

Addresses Epic AC: EPIC-GYM-005 AC1–AC7 and NFR-001–NFR-007.

## Happy Path Criteria

- [ ] **AC1**: A unique known username resolves to the expected synthetic account and produces a safe demo-access result.
- [ ] **AC2**: A successful provider response preserves the safe response contract and excludes credential fields.
- [ ] **AC3**: Existing normal login loads the user’s schedule and remains compatible with the seven-day schedule behavior.

## Error Handling Criteria

- [ ] **AC4**: Unknown, empty, malformed, and duplicate usernames return safe non-authorizing results.
- [ ] **AC5**: OpenAI 401, 429, network, missing-key, and malformed-response cases return the deterministic local fallback envelope.
- [ ] **AC6**: Disabled or non-development demo access returns a feature-disabled result and issues no demo token.
- [ ] **AC7**: Invalid, missing, expired, wrong-audience, wrong-issuer, and wrong-type demo tokens are rejected by the dedicated guard.

## Edge Case Criteria

- [ ] **AC8**: A `demo_access` token is rejected by normal JWT-protected schedule routes.
- [ ] **AC9**: Prompt-injection text cannot cause account selection, credential disclosure, or authorization decisions.
- [ ] **AC10**: Test logs, API responses, model context, and fallback messages contain no password, password hash, raw token, provider secret, or full prompt.

## Integration Criteria

- [ ] **AC11**: Every chatbot integration boundary has at least one success, failure, and edge test.
- [ ] **AC12**: The three critical Playwright journeys pass: successful demo access, safe rejection, and existing login-to-schedule regression.
- [ ] **AC13**: Chatbot UI states meet keyboard, focus, accessible-label, and announced-status checks where tooling exists.
- [ ] **AC14**: Changed business logic meets at least 90% line and 85% branch coverage, with public-interface coverage measured where supported.
- [ ] **AC15**: Tests use only synthetic local fixtures and provider stubs; no live API key or real credential is required.
