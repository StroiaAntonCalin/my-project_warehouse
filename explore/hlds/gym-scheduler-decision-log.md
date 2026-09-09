# Architecture Decision Log: GYM_SCHEDULER

**HLD**: HLD · GYM_SCHEDULER  
**Slug**: `gym-scheduler`  
**Engagement start**: 2026-09-07  
**Last Updated**: 2026-09-09  
**Total decisions**: 10

**Architecture handoff**: Authorized by Calin on 2026-09-09; ADR-001 through ADR-004 accepted.

## Decision Index

| ID | Date | Step | Decision | Driver | Status | Evidence |
|---|---|---|---|---|---|---|
| DEC-001 | 2026-09-07 | B.1.1 | Scope ERC architecture engagement around Simple Weekly Board | Architect/Product Owner | Active | VALIDATED |
| DEC-002 | 2026-09-09 | B.1.2 | Use MongoDB locally and migrate to PostgreSQL before deployment | Product Owner | Superseded | VALIDATED; superseded by DEC-003 |
| DEC-003 | 2026-09-09 | B.1.2 | Use JSON mock data for the prototype; defer real persistence | Product Owner | Active | VALIDATED |
| DEC-004 | 2026-09-09 | B.1.2 | Use in-memory access JWTs and rotating HttpOnly refresh cookies | Product Owner | Active | VALIDATED |
| DEC-005 | 2026-09-09 | B.1.2 | Use minimal validated exercise contract and explicit order | Product Owner | Active | VALIDATED |
| DEC-006 | 2026-09-09 | B.1.2 | Use seeded demo users, current major browsers, `/api/v1`, and deferred production configuration | Product Owner | Active | VALIDATED |
| DEC-007 | 2026-09-09 | B.1.3 | Use a NestJS modular monolith | Architect/Product Owner | Active | VALIDATED |
| DEC-008 | 2026-09-09 | B.1.3 | Use a JSON repository behind an interface for the prototype | Architect/Product Owner | Active | VALIDATED |
| DEC-009 | 2026-09-09 | B.1.3 | Use a typed REST client with local React state | Architect/Product Owner | Active | VALIDATED |
| DEC-010 | 2026-09-09 | B.1.3 | Use in-memory access JWTs with rotating HttpOnly refresh cookies | Architect/Product Owner | Active | VALIDATED |
| DEC-011 | 2026-09-09 | B.4 | Apply simplification audit: no cache, queue, event bus, or production infrastructure in prototype | Architect/Product Owner | Active | VALIDATED |

## Decision Details

### DEC-001 — Architecture engagement scope

**Date**: 2026-09-07  
**Step**: B.1.1 Engagement Setup  
**Driver**: Architect/Product Owner — Calin

**What was decided**: Produce an ERC-depth architecture package for the GYM_SCHEDULER prototype, covering Identity & Access and Schedule Management, the approved PRD and Simple Weekly Board direction, and the security, accessibility, reliability, maintainability, and cost-simplicity priorities.

**Why this option was chosen**: The PRD and experience design are approved, the product is a greenfield prototype, and the remaining uncertainty is technical and implementation-oriented rather than a reason for a deep multi-domain architecture.

**Alternatives rejected**:

- Fast Lane — rejected because secure session handling, exercise data, and deployment questions still require architecture treatment.
- Diverge/Converge — rejected because there is no novel technology, major stakeholder disagreement, or complex integration landscape.

**Evidence level**: VALIDATED — approved scope and Explore Readiness Check classification.  
**Impact**: Sets the depth and deliverables for B.1–B.4 and downstream strategy/backlog work.  
**Timing**: NOW  
**Status**: Active

### DEC-004 — Secure prototype session strategy

**Date**: 2026-09-09  
**Step**: B.1.2 Boundary Mapping  
**Driver**: Product Owner — Calin

**What was decided**: Keep short-lived access JWTs in memory. Store rotating refresh tokens in Secure, HttpOnly, SameSite cookies. The backend owns refresh and logout.

**Alternatives rejected**: Browser local/session storage — rejected because token exposure risk conflicts with the security baseline.  
**Evidence level**: VALIDATED.  
**Impact**: Defines Identity & Access API/session responsibilities.  
**Timing**: NOW.  
**Status**: Active

### DEC-005 — Minimal exercise contract

**Date**: 2026-09-09  
**Step**: B.1.2 Boundary Mapping  
**Driver**: Product Owner — Calin

**What was decided**: Exercise name is mandatory. Muscle group, sets, repetitions, rest time, difficulty, and instructions are optional but validated when supplied. Workout days and assignments use explicit numeric `order`.

**Alternatives rejected**: Richer mandatory exercise model — rejected to keep the prototype simple.  
**Evidence level**: VALIDATED.  
**Impact**: Defines the Schedule Management contract and validation scope.  
**Timing**: NOW.  
**Status**: Active

### DEC-006 — Prototype account, browser, API, and deployment scope

**Date**: 2026-09-09  
**Step**: B.1.2 Boundary Mapping  
**Driver**: Product Owner — Calin

**What was decided**: Use seeded demo users with predefined roles; exclude registration. Support latest major Chrome, Edge, Firefox, and Safari. Use `/api/v1` API versioning. Keep production provider accounts, regions, and privacy configuration deferred.

**Alternatives rejected**: Registration and broad browser/version support — deferred as unnecessary prototype scope.  
**Evidence level**: VALIDATED.  
**Impact**: Narrows Identity & Access, compatibility testing, API contracts, and deployment scope.  
**Timing**: NOW/SOON.  
**Status**: Active

### DEC-003 — JSON mock data for prototype storage

**Date**: 2026-09-09  
**Step**: B.1.2 Boundary Mapping  
**Driver**: Product Owner — Calin

**What was decided**: The prototype will not use MongoDB or PostgreSQL for runtime storage. It will use a version-controlled JSON mock-data file behind a repository interface. Real persistence integration is deferred to a later phase.

**Why this option was chosen**: It is the simplest path for a demo and avoids database setup and migration risk during the initial prototype.

**Alternatives rejected**:

- MongoDB locally and PostgreSQL before deployment — superseded because migration adds avoidable prototype risk.
- PostgreSQL + Prisma from the start — deferred until real persistence is required.

**Evidence level**: VALIDATED decision; mock-file mutation and multi-user persistence behavior remain implementation assumptions.  
**Impact**: HLD must define a storage adapter boundary, mock-data limitations, and a future persistence seam.  
**Timing**: NOW  
**Status**: Active

### Decision Reversal — DEC-003 supersedes DEC-002

DEC-002 is superseded because the Product Owner selected a JSON mock-data file instead of MongoDB-to-PostgreSQL migration.

DEC-002 status: Superseded (see DEC-003)

### DEC-002 — Local MongoDB, deployment PostgreSQL

**Date**: 2026-09-09  
**Step**: B.1.2 Boundary Mapping  
**Driver**: Product Owner — Calin

**What was decided**: The prototype will run locally with MongoDB, while deployment will use PostgreSQL. The migration must be completed and validated before deployment.

**Why this option was chosen**: The Product Owner explicitly selected this path to support local prototype development while retaining the planned PostgreSQL deployment target.

**Alternatives rejected**:

- PostgreSQL locally and in deployment — rejected by the Product Owner for this prototype path.
- MongoDB locally and in deployment — rejected because the planned deployment baseline remains PostgreSQL.

**Evidence level**: VALIDATED decision; implementation portability remains an ASSUMPTION.  
**Impact**: Requires persistence abstraction, migration mapping, compatibility tests, and a deployment migration checkpoint.  
**Timing**: NOW for architecture; SOON before implementation completion.  
**Status**: Active

## Summary

Total decisions: 10  
Active: 9 | Reversed: 0 | Superseded: 1  
Architect-driven: 0 | Agent-recommended: 0  
Assumption-based decisions: 1
