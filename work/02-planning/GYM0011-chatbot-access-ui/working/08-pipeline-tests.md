# Pipeline Test Requirements — GYM0011

## Smoke Tests

This task does not add API endpoints. It consumes existing chat endpoints and validates the UI response handling.

| Endpoint | Method | Scenario | Expected |
|----------|--------|----------|----------|
| `/api/v1/chat/public` | POST | Known account question returns safe metadata | Chat renders answer and demo-only warning without credentials |
| `/api/v1/chat/public` | POST | Provider fallback or safe rejection | Chat renders understandable fallback/rejection status |
| `/api/v1/chat` | POST | Authenticated schedule question | Existing chat response renders without changing schedule state |

## Fuzz Tests

- **Reference Data**: Empty input, long input, prompt-injection text, unknown/ambiguous account metadata, malformed optional response fields, and API 4xx/5xx payloads.
- **Excluded Endpoints**: No new endpoint; no direct browser access to JSON or provider services.
- **Special Config**: Mock responses must include and omit optional metadata; the UI must whitelist fields and ignore unknown sensitive fields.

## Integration Tests

| Scenario | Steps | Test Data | Expected |
|----------|-------|-----------|----------|
| Public success | Open login page -> expand chat -> submit question -> receive API response | Safe response with `demoOnly=true`, `accountUsername` | Answer and prototype warning render; input remains usable |
| Safe rejection | Submit unknown/ambiguous request | `mode=error` or safe rejection response | No password/account leakage; alert/status is understandable |
| Fallback | Submit while provider returns local fallback | `source=local`, `mode=fallback` | Local fallback label renders and no raw provider error appears |
| Authenticated chat | Login -> open schedule chat -> ask question | Existing authenticated response | Chat works and schedule/login state remains unchanged |
| Accessibility | Keyboard through toggle, input, submit, and collapse controls | Rendered panel states | Focus, labels, `aria-expanded`, live status, and alerts are valid |
