# Acceptance Criteria — GYM0010

## Epic Link

Addresses Epic AC: EPIC-GYM-005 AC1–AC7 and NFR-001, NFR-002, NFR-003, NFR-004, NFR-005, and NFR-007.

## Happy Path Criteria

- [ ] **AC1**: A known unique account/schedule question is resolved deterministically before agent generation.
- [ ] **AC2**: The agent receives only bounded credential-free context and returns a grounded answer with safe sources.
- [ ] **AC3**: A provider-available response preserves `answer` and `sources` and includes safe optional metadata.

## Error Handling Criteria

- [ ] **AC4**: Empty messages continue to return the existing safe `400 Message is required` response.
- [ ] **AC5**: Unknown and ambiguous account references return a safe non-authorizing result without model account selection.
- [ ] **AC6**: OpenAI 401, 429, network, timeout, missing-key, and malformed-response failures return DEC-010 deterministic local fallback output.
- [ ] **AC7**: Unexpected internal failures do not expose provider status bodies, prompts, secrets, or stack details.

## Edge Case Criteria

- [ ] **AC8**: Passwords, password hashes, refresh tokens, access tokens, provider secrets, and full prompts are absent from context, sources, responses, and logs.
- [ ] **AC9**: Prompt-injection instructions cannot select an account, authorize access, or disclose credentials.
- [ ] **AC10**: Unsupported questions and empty retrieval results return a deterministic no-match response with no invented facts.
- [ ] **AC11**: Account-specific schedule questions retrieve the correct user/day/exercise context rather than broad unrelated accounts.

## Integration Criteria

- [ ] **AC12**: `/api/v1/chat` and `/api/v1/chat/public` retain request compatibility and return the typed safe response.
- [ ] **AC13**: Normal JWT and separate demo-access behavior remain distinct; this service does not issue or validate normal auth tokens.
- [ ] **AC14**: Existing frontend can render the preserved `answer` field and GYM0011 can consume optional metadata.
- [ ] **AC15**: API tests cover provider success/failure, safe projection, resolver outcomes, fallback contract, and existing authenticated schedule behavior.
