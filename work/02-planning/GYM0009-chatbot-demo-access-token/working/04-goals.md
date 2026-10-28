# Goals and Constraints — GYM0009

## Measurable Goals

- [ ] **G1 — Explicit token contract:** Every issued token has `typ=demo_access`, `iss=gym-scheduler-demo`, `aud=gym-scheduler-demo-access`, `demo=true`, `role=demo_member`, resolved `sub`/`username`, `iat`, and 15-minute `exp`.
- [ ] **G2 — Resolver gate:** Only a unique successful resolver result can issue a demo token.
- [ ] **G3 — Guard isolation:** Normal JWT guards reject demo tokens; only explicitly decorated/opted-in demo routes can accept them.
- [ ] **G4 — Local-only enablement:** `CHATBOT_DEMO_ACCESS_ENABLED` defaults false and is accepted as true only in development.
- [ ] **G5 — Failure safety:** Missing, malformed, expired, wrong-type, wrong-issuer, wrong-audience, disabled, unknown, and ambiguous cases never authorize access.
- [ ] **G6 — Regression:** Existing login, refresh/logout, schedule ownership, and normal JWT behavior remain unchanged.

## Constraints

- **Timeline**: No fixed deadline; simple local prototype.
- **Resources**: Existing NestJS auth module, JSON repository, one local API process, no staging.
- **Technical**: Use the project’s existing JWT signing/validation library/pattern, but a distinct secret or explicit token type boundary; no new persistence.
- **Security**: Demo token is not normal authentication and must not be accepted by existing schedule routes by default.
- **Compliance**: No real accounts, production credentials, public deployment, password recovery, or identity proofing.

## Non-Goals

- Replacing normal JWT login, refresh, logout, or session storage.
- Production authentication recovery, MFA, email verification, or identity verification.
- Enabling demo tokens in non-development environments.
- Adding a remote database, event bus, or deployment configuration.
- Exposing raw tokens, passwords, or hashes through chatbot text or logs.

## Assumptions

| Assumption | Risk | Validation |
|------------|------|------------|
| Existing JWT library supports distinct issuer/audience/type validation | Medium | Inspect auth module and add guard unit tests |
| Environment configuration can distinguish development from other environments | High | Add startup/config tests for flag and `NODE_ENV` combinations |
| A dedicated demo guard can coexist with the normal JWT guard | High | Add positive demo-guard and negative normal-guard integration tests |
| Token issuance can receive a credential-free resolver result | Medium | Integrate with GYM0008 result type, never raw user record |
