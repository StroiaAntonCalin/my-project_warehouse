# Technical Approach — GYM0009

## High-Level Strategy

Add a dedicated prototype-only demo-access service and guard alongside, but separate from, the existing normal JWT service. The service accepts only a credential-free unique resolver result, signs a 15-minute token with explicit type/issuer/audience claims, and verifies it only when a route explicitly opts into `DemoAccessGuard`. The existing `JwtAuthGuard` and schedule routes remain normal-JWT-only.

## Architecture Decisions

### Separate signing and explicit claims

- **Choice**: Sign a JWT with a dedicated `DEMO_ACCESS_SECRET` (development fallback allowed only for local use), header `typ=demo_access`, issuer `gym-scheduler-demo`, audience `gym-scheduler-demo-access`, and payload `sub`, `username`, `role=demo_member`, `demo=true`, `iat`, and `exp`.
- **Rationale**: A separate secret plus type/issuer/audience prevents accidental acceptance by normal validation and makes the boundary testable.
- **Alternative rejected**: Reusing the normal JWT issuance path or relying on a frontend-only flag.

### Resolver-gated issuance

- **Choice**: `DemoAccessService.issue()` accepts only a unique resolver result containing safe `userId`, `username`, and role data. Unknown/ambiguous results are rejected before signing.
- **Rationale**: The service must not receive raw repository records or choose accounts itself.
- **Alternative rejected**: Issuing from a username string or model-generated answer.

### Dedicated guard and route opt-in

- **Choice**: `DemoAccessGuard` verifies the dedicated secret, header type, issuer, audience, `demo=true`, role, subject, and expiry. Existing `JwtAuthGuard` explicitly rejects demo tokens through type/issuer/audience checks. No existing schedule route opts into the demo guard by default.
- **Rationale**: Keeps normal authenticated schedule ownership unchanged.
- **Alternative rejected**: Making the normal guard accept both token types.

### Local-only configuration

- **Choice**: `CHATBOT_DEMO_ACCESS_ENABLED` defaults false; true is valid only when `NODE_ENV=development`. Startup/config validation disables or rejects the feature otherwise. The guard and issuance service both enforce the flag.
- **Rationale**: Defense in depth for the explicitly local prototype feature.
- **Alternative rejected**: Relying only on deployment convention or frontend visibility.

## Component Changes

### `apps/api/src/auth/demo-access.service.ts`

- [ ] Add typed `DemoAccessClaims` and `UniqueAccountResolution` inputs.
- [ ] Implement feature flag validation, issue, verify, and safe failure mapping.
- [ ] Use `DEMO_ACCESS_SECRET` and fixed issuer/audience/type constants.
- [ ] Set 15-minute expiry with no refresh token or silent renewal.

### `apps/api/src/auth/demo-access.guard.ts`

- [ ] Read bearer token and call dedicated verification.
- [ ] Attach only safe `sub`, `username`, and `role` identity to the request.
- [ ] Reject missing, malformed, disabled, expired, wrong-type, wrong-issuer, wrong-audience, and invalid-subject tokens.

### Existing auth integration

- [ ] Keep normal `AuthService` login/refresh/logout behavior unchanged.
- [ ] Harden normal JWT verification so `typ=demo_access`, demo issuer/audience, or demo claims cannot pass normal guards.
- [ ] Register the demo service/guard in the NestJS module without applying it globally.
- [ ] Expose only explicit opt-in capability for future/prototype demo routes; do not change existing schedule decorators.

### Tests

- [ ] Add service unit tests for exact claims, 15-minute expiry, unique resolver gating, disabled environments, and safe errors.
- [ ] Add guard tests for positive dedicated verification and all negative claim/type/config cases.
- [ ] Add integration tests proving normal schedule/JWT routes reject demo tokens.
- [ ] Preserve existing auth login, refresh rotation, and logout tests.

## Data Model Changes

No persistence changes. Define transport-only types:

```ts
type DemoAccessClaims = {
  sub: string;
  username: string;
  role: 'demo_member';
  demo: true;
  iat: number;
  exp: number;
  iss: 'gym-scheduler-demo';
  aud: 'gym-scheduler-demo-access';
};
```

The `typ=demo_access` value is a JWT header, not a persisted field. No password, hash, refresh token, or normal access token is included.

## Integration Points

1. GYM0008 resolver -> `DemoAccessService.issue(uniqueResolution)`.
2. GYM0010 chat orchestration -> service metadata (`accessIssued`, safe username); no natural-language token exposure.
3. `DemoAccessGuard` -> explicitly opted-in route only.
4. Existing `JwtAuthGuard` -> normal JWT routes; demo tokens rejected.
5. Environment/config -> local-only flag and dedicated secret without exposing either value.

## Error Handling

- Feature disabled/non-development: safe unauthorized/feature-disabled result; no token.
- Unknown/ambiguous resolver result: no token; caller receives non-authorizing outcome.
- Missing/malformed/expired/wrong-type/wrong-issuer/wrong-audience token: `401` with generic safe message.
- Invalid subject/role/demo claim: `401` and no request user context.
- Never include signing secrets, decoded token payloads, or raw JWTs in logs or responses.

## Configuration

- `CHATBOT_DEMO_ACCESS_ENABLED=false` by default.
- `NODE_ENV=development` required for enablement.
- `DEMO_ACCESS_SECRET` is server-only; use a local development fallback only in development.
- Issuer, audience, type, and TTL are fixed constants rather than user-configurable.
- No refresh token, cookie, local storage, or database record is created for demo access.

## Dev Hints

- Reuse `jsonwebtoken`; do not add a second JWT library.
- Verify JWT header `typ` separately from payload claims.
- Use fake timers for expiry tests and isolated environment setup/restore.
- Test normal guard rejection with a token signed by both the demo secret and normal secret where applicable.
- Keep demo identity type distinct from normal `Request.user` assumptions.
