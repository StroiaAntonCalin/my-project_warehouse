# ADR-001: NestJS Modular Monolith

**Status**: Accepted  
**Date**: 2026-09-09  
**Decision Maker**: Calin  
**Accepted**: 2026-09-09  
**Affects**: HLD Section 5 (High-Level Architecture), Section 6 (Component Architecture)  
**Supersedes**: None

## Context

The prototype has two bounded contexts and no external integrations. A deployable structure must support fast local development without blurring ownership. [OBS]

## Decision

Use a NestJS modular monolith with separate Identity & Access, Schedule Management, REST API, and Repository modules. [OBS]

## Options Considered

### Option A: Modular monolith — Selected

- Pros: fastest setup, clear module boundaries, simple local operation.
- Cons: one deployable unit and shared runtime.
- Selected because: prototype scope does not justify distributed deployment.

### Option B: Separate services

- Pros: independent scaling and deployment.
- Cons: service discovery, integration, deployment, and testing overhead.
- Rejected because: no current integration or scale requirement.

## Consequences

### Positive

- Fast implementation and debugging.
- Domain boundaries remain visible in code.

### Negative

- Independent service scaling is deferred.
- A module failure can affect the single process.

### Risks

- Modules may become coupled; mitigate with explicit ports and DTO boundaries.

## Related Decisions

- DEC-007 in the decision log.
- HLD: [gym-scheduler-hld.md](../hlds/gym-scheduler-hld.md)
