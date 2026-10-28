# Sequencing and Scope

## Implementation Phases

### Phase 1: Foundation

- [ ] Confirm the GYM0008 resolver result contract: unique, unknown, or ambiguous.
- [ ] Add typed demo-access claims and central configuration for the feature flag, development gate, dedicated secret, issuer, audience, and 15-minute lifetime.
- [ ] Define the service and guard interfaces without changing normal route registration.

### Phase 2: Core Features

- [ ] Implement issuance only for a unique resolver result.
- [ ] Implement verification in `DemoAccessGuard` with exact claim and signature validation.
- [ ] Harden `JwtAuthGuard`/normal verification so demo tokens cannot cross into normal authentication.
- [ ] Keep demo access free of refresh and silent-renewal behavior.

### Phase 3: Integration & Polish

- [ ] Add unit, integration, and authorization-regression tests from the pipeline requirements.
- [ ] Validate feature-disabled and non-development configurations.
- [ ] Document explicit route opt-in requirements and local development configuration.
- [ ] Run the existing authentication suite and static checks.

## Parallel Work Opportunities

- [ ] Claims/configuration tests and guard rejection tests can be developed independently once the claim contract is fixed.
- [ ] Documentation and test fixtures can proceed in parallel with the resolver adapter, provided the typed resolver result remains stable.
- [ ] Normal authentication regression tests can run independently of the positive demo-flow tests.

## Blocked Dependencies

- **GYM0008** blocks safe issuance integration until unique/unknown/ambiguous resolver outcomes are available.
- **GYM0010–GYM0012** remain downstream; they should not add route access or frontend behavior until this contract is complete.

## Scope Validation

### Original Requirements

- [x] Issue a distinct, short-lived demo token with exact claims: Phase 1–2.
- [x] Require successful unique account resolution: Phase 2.
- [x] Keep demo and normal JWT guards isolated: Phase 2–3.
- [x] Enforce local development-only enablement: Phase 1–3.
- [x] Reject expired, malformed, missing, or invalid tokens: Phase 2–3.
- [x] Preserve normal authentication and add security regression coverage: Phase 3.

### Scope Creep Detected

- No new public route, UI flow, persistent store, remote AI/database integration, production recovery process, or deployment configuration is included. These remain outside GYM0009.

### Non-Goals Confirmed Excluded

- Replacing normal JWT login, refresh, or logout.
- Production password recovery, MFA, or identity verification.
- Global application of `DemoAccessGuard`.
- Database migration or event-bus integration.

## Task Tags

- **Complexity**: complex
- **Component**: cross-cutting
- **Type**: feature
- **Priority**: high
- **Risk**: high
