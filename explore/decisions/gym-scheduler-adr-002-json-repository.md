# ADR-002: JSON Repository for Prototype Storage

**Status**: Accepted  
**Date**: 2026-09-09  
**Decision Maker**: Calin  
**Accepted**: 2026-09-09  
**Affects**: HLD Section 4 (Technology Stack), Section 8 (Data & Domain Model), Section 10 (Operational Concerns)  
**Supersedes**: None

## Context

The product owner explicitly removed MongoDB and PostgreSQL from prototype runtime scope. The demo needs restart-visible mock data without database setup. [OBS]

## Decision

Use a version-controlled JSON mock-data file behind a repository interface. Real PostgreSQL persistence is deferred. [OBS]

## Options Considered

### Option A: JSON repository adapter — Selected

- Pros: fastest setup, restart-visible data, future persistence seam.
- Cons: single-process and unsuitable for production concurrency.
- Selected because: it meets the prototype need with minimal infrastructure.

### Option B: PostgreSQL

- Pros: durable, concurrent, production-like.
- Cons: setup and operational complexity before persistence is required.
- Rejected because: it adds avoidable prototype risk.

### Option C: In-memory storage

- Pros: minimal code.
- Cons: all changes disappear on restart.
- Rejected because: refresh/re-login persistence is an acceptance requirement.

## Consequences

### Positive

- No database installation or provider is needed.
- Repository replacement can happen without changing domain services.

### Negative

- Concurrent writes are unsupported.
- File corruption and production durability are not addressed.

### Risks

- Prototype limitations may be mistaken for production capability; document the blocker and defer deployment.

## Related Decisions

- DEC-003 and DEC-008 in the decision log.
- HLD: [gym-scheduler-hld.md](../hlds/gym-scheduler-hld.md)
