# Pipeline Test Requirements — GYM0012

## Smoke Tests

This task does not add an endpoint, but it validates the chatbot endpoint and existing protected routes.

| Endpoint | Method | Scenario | Expected |
|----------|--------|----------|----------|
| `/api/v1/chat` | POST | Known unique username with demo access enabled | `200`; safe response and demo metadata; no credential fields |
| `/api/v1/chat` | POST | Unknown or duplicate username | Safe rejection; no access issued |
| `/api/v1/chat` | POST | Provider unavailable | Deterministic local fallback envelope |
| Existing schedule route | GET/POST | Existing normal JWT session | Existing login-to-schedule behavior remains successful |

## Fuzz Tests

- **Reference Data**: Synthetic usernames, empty strings, whitespace, malformed input, duplicate records, prompt-injection text, expired/wrong-type tokens, and provider error fixtures.
- **Excluded Endpoints**: No production or public endpoints; no live OpenAI calls; no real credential inputs.
- **Special Config**: Run with `CHATBOT_DEMO_ACCESS_ENABLED=false` and with development-only enablement. Assert safe errors and absence of passwords, hashes, tokens, prompts, and provider secrets in output/log captures.

## Integration Tests

| Scenario | Steps | Test Data | Expected |
|----------|-------|-----------|----------|
| Known demo access | POST chat with unique username -> resolver -> safe projection -> provider stub -> response | Unique synthetic account and schedule | Correct account selection, safe context, deterministic access metadata |
| Ambiguous access | POST chat with duplicate username -> resolver | Two synthetic records with same username | No account/token issued; no model authorization call |
| Provider fallback | POST chat -> provider stub returns 401/429/network/missing-key | Safe account and failure fixture | DEC-010 envelope; no provider internals exposed |
| Demo-token isolation | Obtain demo token -> call explicit demo route and normal schedule route | Valid, expired, malformed, wrong-type tokens | Dedicated guard behavior works; normal JWT guard rejects demo token |
| Existing auth regression | Login -> load schedule -> refresh/reload -> logout -> retry protected route | Existing seeded demo account | Normal auth remains functional and protected route rejects logged-out access |
| Frontend access state | Open chatbot -> submit known/unknown/fallback cases | API stubs and accessible selectors | Warning, status, focus, keyboard behavior, and safe messages render correctly |
