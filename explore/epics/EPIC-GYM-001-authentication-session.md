+++
[metadata]
epic_id = "EPIC-GYM-001"
last_updated = "2026-09-09"
[epochs]
  [epochs.0]
  name = "Secure Login Foundation"
  started = "2026-09-09"
  jira_key = ""
+++

# EPIC-GYM-001 — Authentication & Session

**Domain**: GYM_SCHEDULER  
**Owner**: Calin  
**Status**: Draft

## Objective

Enable seeded gym members to sign in, maintain a protected session, refresh access, and log out so personal schedules remain private.

## Scope & Boundaries

In scope: seeded users/roles, login, short-lived in-memory access JWTs, rotating Secure/HttpOnly/SameSite refresh cookies, logout, protected route behavior, and safe auth errors.

Out of scope: registration, password recovery, MFA, social login, membership administration, and production identity providers.

## Key Behaviors

1. Valid seeded credentials authenticate the user.
2. Invalid, expired, or revoked sessions cannot access schedules.
3. Refresh rotates the refresh token; logout revokes the refresh session.

## Acceptance Criteria

- [ ] R-001 and R-007 pass.
- [ ] NFR-003 and NFR-005 pass; passwords and tokens are never logged or stored in browser storage.
- [ ] Auth unit, API, negative authorization, and Playwright login/logout tests pass.
- [ ] Safe errors and loading states are accessible.

## Data & Events

Data: seeded User and Refresh Session records. Consumes no external events and emits no events.

## Dependencies

- JSON repository and shared API contracts — non-blocking design dependency.
- EPIC-GYM-002 and EPIC-GYM-003 consume authenticated identity.

## Technical Considerations

- Backend owns refresh and logout.
- Schedule routes require authenticated user context.
- Local cookie/CORS configuration must be documented and tested.

## Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Token/session exposure | High | Secure cookie strategy, redaction, security tests |
| Missing ownership context | High | Central auth guard and negative API tests |

## Non-Functional Requirements

Security: NFR-003, NFR-005. Latency: NFR-001. Observability: auth success/failure and revocation logs without secrets.

## Task Breakdown Strategy

Foundation → auth module and seed data → refresh/logout → protected route tests → accessible login demo.

## Related Epics

- EPIC-GYM-002 consumes authenticated identity.
- EPIC-GYM-003 consumes authenticated identity.

## Links & References

- PRD: [gym-scheduler-prd.md](../prds/gym-scheduler-prd.md)
- HLD: [gym-scheduler-hld.md](../hlds/gym-scheduler-hld.md)
- ADR: [secure session](../decisions/gym-scheduler-adr-004-secure-session.md)

## Secure Login Foundation

Deliver seeded login, protected session handling, refresh rotation, logout, and security tests so a member can safely enter the product.
