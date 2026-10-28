# Pipeline Test Requirements

## Smoke Tests

This task does not add a public API endpoint. It adds an isolated token service and guard that will be consumed by an explicitly opted-in route. Smoke coverage should therefore validate the existing route paths after the implementation is wired:

| Endpoint | Method | Scenario | Expected |
|----------|--------|----------|----------|
| Explicit demo-access route (when enabled) | Existing route method | Unique resolver result issues a valid `demo_access` token and the route accepts it through `DemoAccessGuard` | Successful response with demo identity |
| Existing schedule/authenticated route | Existing route method | A valid `demo_access` token is presented to the normal JWT guard | `401 Unauthorized`; demo token is never treated as a normal session |
| Explicit demo-access route (when enabled) | Existing route method | A valid normal access token is presented to the demo guard | `401 Unauthorized` |
| Explicit demo-access route | Existing route method | Feature disabled or running outside development | Safe rejection; no demo access is granted |

No new public endpoint is in scope for GYM0009. A route-level smoke test must be added only where a later task explicitly opts a route into `DemoAccessGuard`.

## Fuzz Tests

- **Reference Data**: Valid demo claims, valid normal JWT claims, unique/unknown/ambiguous resolver outcomes, development and non-development environment configurations, and controlled clock values.
- **Excluded Endpoints**: No endpoint should be fuzzed as a demo-access endpoint unless it explicitly opts into `DemoAccessGuard`. Normal schedule routes remain normal-JWT-only.
- **Special Config**: Use fake timers and test-only secrets. Never use real API keys, passwords, refresh tokens, or production secrets.

Required negative cases:

- Missing or malformed `Authorization` header.
- Invalid signature, expired token, malformed token, and unsupported algorithm.
- Wrong `typ`, issuer, audience, role, `demo` flag, or missing/invalid `sub`.
- A demo token sent to the normal JWT guard and a normal token sent to the demo guard.
- Unknown or ambiguous account resolver result.
- `CHATBOT_DEMO_ACCESS_ENABLED=false` and enabled flag outside `NODE_ENV=development`.
- Attempts to use a demo token for refresh or silent renewal.

## Integration Tests

The feature has a short multi-step flow even though it introduces no new endpoint, so integration coverage is required at the service/guard boundary.

| Scenario | Steps | Test Data | Expected |
|----------|-------|-----------|----------|
| Unique account demo access | Resolve username; issue token; verify token with `DemoAccessGuard` | Unique account and development flag enabled | Token contains the approved claims and guard attaches only safe identity data |
| Unknown account | Resolve username; attempt issuance | No matching account | No token is issued; failure is safe and non-sensitive |
| Ambiguous account | Resolve username; attempt issuance | Multiple matching accounts | No token is issued; ambiguity is not resolved by guessing |
| Demo/normal isolation | Issue demo token; send it through normal guard/schedule path | Valid demo token | Normal guard rejects it with `401` |
| Existing normal authentication regression | Login with normal credentials; access normal route | Valid normal access token | Existing normal flow remains successful |
| Environment gate | Repeat issuance/verification with disabled flag and non-development `NODE_ENV` | Same account and token fixtures | Demo capability is rejected; normal JWT behavior is unchanged |
| Expiry | Issue token with controlled clock; advance beyond 15 minutes; verify | Fake timers | Demo guard rejects expired token |

Refresh-token rotation, logout, and normal access-token expiry remain covered by the existing authentication suite and must continue to pass.
