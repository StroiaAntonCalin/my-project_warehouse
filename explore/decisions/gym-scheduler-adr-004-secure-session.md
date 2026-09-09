# ADR-004: Secure Prototype Session Strategy

**Status**: Accepted  
**Date**: 2026-09-09  
**Decision Maker**: Calin  
**Accepted**: 2026-09-09  
**Affects**: HLD Section 3 (Architecture Principles), Section 6 (Component Architecture), Section 7 (Runtime View), Section 9 (Quality Attributes)  
**Supersedes**: None

## Context

Schedule data is protected and the prototype needs login, refresh, and logout without registration. The approved baseline prioritizes avoiding persistent browser token exposure. [OBS]

## Decision

Keep short-lived access JWTs in memory. Store rotating refresh tokens in Secure, HttpOnly, SameSite cookies. Backend services own refresh and logout. [OBS]

## Options Considered

### Option A: In-memory access JWT plus rotating refresh cookie — Selected

- Pros: limits browser token exposure and supports refresh/logout.
- Cons: requires refresh handling and cookie configuration.
- Selected because: it matches the approved security direction and NFR-003/NFR-005.

### Option B: Long-lived token in local storage

- Pros: simple client implementation.
- Cons: greater exposure if client-side script is compromised.
- Rejected because: it conflicts with the security baseline.

### Option C: Server-side session cookie only

- Pros: straightforward browser session model.
- Cons: changes the approved token/API direction.
- Rejected because: it is not the selected contract for this prototype.

## Consequences

### Positive

- Refresh credentials are protected from normal JavaScript access.
- Backend can revoke refresh sessions on logout.

### Negative

- Access token is lost on page reload and must be refreshed.
- Cookie flags and CORS configuration require careful local setup.

### Risks

- Misconfigured local cookie behavior can block refresh; mitigate with API and browser integration tests.

## Related Decisions

- DEC-004 and DEC-010 in the decision log.
- HLD: [gym-scheduler-hld.md](../hlds/gym-scheduler-hld.md)
