# Acceptance Criteria

## Epic Link

Addresses Epic AC: EPIC-GYM-005 AC1, AC2, AC3, and AC5.

## Happy Path Criteria

- [ ] **AC1**: A known username that matches exactly one local account resolves to `unique` with the correct user ID and normalized username.
- [ ] **AC2**: Username matching is deterministic and case/outer-whitespace tolerant while remaining exact rather than fuzzy or partial.

## Error Handling Criteria

- [ ] **AC3**: An unknown username returns `unknown` and no account is selected.
- [ ] **AC4**: Empty, whitespace-only, or malformed username input returns a non-authorizing result without a repository match.
- [ ] **AC5**: A repository read failure is surfaced as an infrastructure failure and is never converted into a false `unique` result.

## Edge Case Criteria

- [ ] **AC6**: Two or more users whose normalized usernames match return `ambiguous` and no account is selected.
- [ ] **AC7**: The result contains no password, password hash, token, role-bearing full user object, or other credential-bearing field.
- [ ] **AC8**: Encoded, partial, display-name, or prompt-injection-style input cannot select a different account from the exact normalized username.

## Integration Criteria

- [ ] **AC9**: GYM0010 can consume a `unique` result to scope safe account/schedule retrieval without duplicating account selection logic.
- [ ] **AC10**: GYM0009 can consume only a `unique` result for temporary username-only `demo_access`; `unknown` and `ambiguous` results cannot issue access.
- [ ] **AC11**: Existing normal login, JWT authorization, and schedule ownership behavior remain unchanged.
- [ ] **AC12**: Unit and API-level tests cover unique, unknown, malformed, duplicate, redaction, and integration outcomes using non-persistent fixtures.
