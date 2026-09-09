# ADR-003: Typed REST Client with Local React State

**Status**: Accepted  
**Date**: 2026-09-09  
**Decision Maker**: Calin  
**Accepted**: 2026-09-09  
**Affects**: HLD Section 4 (Technology Stack), Section 6 (Component Architecture), Section 7 (Runtime View)  
**Supersedes**: None

## Context

The React prototype needs to call the real NestJS API while keeping dependencies and state machinery small. [OBS]

## Decision

Use a typed REST client and local React state for authentication, schedule, form, loading, saved, and error states. [OBS]

## Options Considered

### Option A: Typed REST client with local state — Selected

- Pros: explicit, lightweight, easy to test.
- Cons: request-state handling is hand-written.
- Selected because: the prototype has a small number of screens and flows.

### Option B: TanStack Query

- Pros: caching and request lifecycle are standardized.
- Cons: additional dependency and concepts.
- Rejected because: caching complexity is not needed for one schedule.

### Option C: Frontend-only mock data

- Pros: fastest visual iteration.
- Cons: bypasses backend integration and persistence tests.
- Rejected because: API integration is part of the prototype objective.

## Consequences

### Positive

- Frontend and backend contracts are exercised early.
- No extra data-fetching framework is required.

### Negative

- Developers must consistently handle request state.
- Cache invalidation is manual if the app grows.

### Risks

- Duplicate request logic; mitigate with a shared typed client module.

## Related Decisions

- DEC-009 in the decision log.
- HLD: [gym-scheduler-hld.md](../hlds/gym-scheduler-hld.md)
