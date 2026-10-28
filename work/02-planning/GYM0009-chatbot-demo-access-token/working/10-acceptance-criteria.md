# Acceptance Criteria

## Epic Link

Addresses Epic AC: EPIC-GYM-005 AC1, AC2, AC3, AC4, and AC5.

## Happy Path Criteria

- [ ] **AC1**: Given the feature is enabled in development and the resolver returns exactly one account, the system issues a `demo_access` token containing the required demo type, issuer, audience, demo marker, role, subject, username, issued-at time, and a 15-minute expiry.
- [ ] **AC2**: A valid `demo_access` token is accepted by an explicitly opted-in demo route and exposes only the resolved demo identity required by that route.
- [ ] **AC3**: A valid normal access token continues to authenticate existing normal routes without changing current login, refresh, or logout behavior.

## Error Handling Criteria

- [ ] **AC4**: If the resolver returns no account or more than one account, no demo token is issued and the response does not disclose sensitive account data.
- [ ] **AC5**: If the feature flag is disabled, or the environment is not development, demo token issuance and verification are rejected with the existing safe unauthorized/feature-disabled behavior.
- [ ] **AC6**: Missing, malformed, expired, incorrectly signed, or incorrectly structured demo tokens are rejected by `DemoAccessGuard`.

## Edge Case Criteria

- [ ] **AC7**: A token with the wrong type, issuer, audience, role, `demo` marker, or invalid/missing subject is rejected by `DemoAccessGuard`.
- [ ] **AC8**: A `demo_access` token presented to the normal JWT guard or a normal access token presented to the demo guard is rejected; neither token type crosses the other guard boundary.
- [ ] **AC9**: A demo token cannot be refreshed or silently renewed as a normal session token and expires after the configured 15-minute lifetime.

## Integration Criteria

- [ ] **AC10**: The resolver-to-issuance-to-guard flow works for a unique account using test-only configuration and local JSON-backed data.
- [ ] **AC11**: Existing authentication regression tests remain green, including normal access-token validation and refresh-token rotation.
- [ ] **AC12**: Automated tests cover both enabled development configuration and disabled/non-development configuration without using real secrets or external services.
