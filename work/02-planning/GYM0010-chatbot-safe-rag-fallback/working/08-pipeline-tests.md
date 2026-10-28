# Pipeline Test Requirements — GYM0010

## Smoke Tests

| Endpoint | Method | Scenario | Expected |
|----------|--------|----------|----------|
| `/api/v1/chat/public` | POST | Known schedule/account question with provider available | `200`; grounded safe answer, bounded sources, no credentials |
| `/api/v1/chat/public` | POST | Provider key missing or provider unavailable | `200` safe local fallback envelope |
| `/api/v1/chat` | POST | Authenticated schedule question | `200`; user-scoped safe context and existing response compatibility |
| `/api/v1/chat` | POST | Empty message | `400 Message is required` |

## Fuzz Tests

- **Reference Data**: Empty/whitespace messages, malformed emails, unknown usernames, duplicate usernames, prompt-injection instructions, unsupported questions, oversized text, and provider error fixtures.
- **Excluded Endpoints**: No direct repository endpoint, provider endpoint, token issuance endpoint, or production/public environment.
- **Special Config**: Run with no OpenAI key, stubbed 401/429/network/timeout/malformed responses, and recursive assertions that output/logs omit passwords, hashes, tokens, prompts, and secrets.

## Integration Tests

| Scenario | Steps | Test Data | Expected |
|----------|-------|-----------|----------|
| Grounded schedule answer | POST chat -> resolve user/account -> retrieve day documents -> agent/fallback | Known account and schedule with legpress | Answer references the correct day/exercise and safe sources |
| Unknown account | POST account-specific question -> resolver returns none | Unknown username | Safe no-match response; no agent authorization and no token |
| Ambiguous account | POST account-specific question -> resolver returns multiple | Duplicate username fixture | Safe rejection; no account selected |
| Provider fallback | POST question -> provider stub returns 401/429/network/missing-key | Safe retrieved documents | DEC-010 response with `source=local`, no raw error details |
| Credential redaction | Retrieve account question -> inspect agent input, response, and logs | Account fixture containing credential fields | No password/passwordHash/token/prompt/provider secret appears |
| Prompt injection | POST malicious instruction mixed with account request | Synthetic prompt-injection messages | Model cannot select account or disclose credentials; safe grounded answer |
| Frontend compatibility | API returns optional metadata -> existing UI consumes `answer` | Typed response fixtures | GYM0011 can render safe states without breaking current answer handling |
