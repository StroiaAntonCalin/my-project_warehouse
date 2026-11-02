# Pipeline Test Requirements

## Smoke Tests

GYM0008 adds no public endpoint. Resolver smoke coverage is exercised through the existing chat service/controller paths after integration.

| Endpoint | Method | Scenario | Expected |
|----------|--------|----------|----------|
| `/api/v1/chat/public` | POST | Ask for a known unique username/account | Safe response identifies only the resolved username; no credentials are present. |
| `/api/v1/chat/public` | POST | Ask for an unknown or ambiguous username | Safe non-authorizing response; no account is selected. |

## Fuzz Tests

- **Reference Data**: Seeded usernames, casing/whitespace variants, malformed email strings, empty strings, unknown values, and isolated duplicate-user fixtures.
- **Excluded Endpoints**: No new endpoint is fuzzed directly; normal login and schedule authorization remain outside resolver input handling.
- **Special Config**: Do not read or write production `.env` files. Do not persist fuzz fixtures. Assert that returned objects contain no password/passwordHash/token fields.

Negative inputs include null/undefined-like values at the service boundary, whitespace-only values, malformed email shapes, partial usernames, Unicode/encoded variants, unknown usernames, and duplicate normalized usernames.

## Integration Tests

| Scenario | Steps | Test Data | Expected |
|----------|-------|-----------|----------|
| Unique username to safe RAG context | Submit a chat question containing a seeded username; resolve; retrieve context | Unique seeded account | Retrieval uses the matching user/schedule and only safe fields. |
| Unique username to demo access boundary | Resolve username; pass result to DemoAccessService | Unique result | Downstream token service may issue demo access; resolver itself does not issue a token. |
| Unknown username | Submit question; resolve; pass result to orchestration | No matching account | No account context or access result is produced. |
| Ambiguous username | Add duplicate only to an in-memory fixture; submit question; resolve | Two normalized matches | `ambiguous` result; no account context or access result is produced. |
| Existing authentication regression | Run normal login and schedule tests after resolver registration | Seeded normal user | Normal JWT login and schedule ownership remain unchanged. |

No external provider, database, or browser-specific setup is required for this task. Playwright/axe coverage belongs to downstream account-access integration and is not duplicated here.
