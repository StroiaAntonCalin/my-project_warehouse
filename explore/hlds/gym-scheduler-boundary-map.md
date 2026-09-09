# Boundary Map: HLD · GYM_SCHEDULER

**Date**: 2026-09-09  
**Status**: Validated  
**Architect**: Calin  
**Slug**: `gym-scheduler`

## 1. Truth Hierarchy

| # | Document | Type | Classification | Rationale | Evidence |
|---|---|---|---|---|---|
| 1 | PRD · GYM_SCHEDULER | PRD | Canonical | Authoritative for approved requirements, scope, and acceptance. | VALIDATED |
| 2 | Domain Analysis | Domain Analysis | Canonical | Authoritative for entities, rules, and domain relationships. | VALIDATED |
| 3 | Domain Glossary | Glossary | Canonical | Authoritative for architecture terminology. | VALIDATED |
| 4 | Architecture Context | Architecture Context | Canonical | Approved baseline, drivers, constraints, and open questions. | VALIDATED |
| 5 | Regulatory Compliance | Compliance | Canonical | Authoritative for prototype security, privacy, and accessibility baseline. | VALIDATED |
| 6 | Context | Scope Statement | Canonical | Approved business context, stakeholder authority, and boundaries. | VALIDATED |
| 7 | Technical Feasibility | Feasibility | Directional | Guides technical choices; may be refined by architecture evidence. | ASSUMED |
| 8 | Refined Concept | Ideation | Directional | Provides experience direction, not binding architecture. | ASSUMED |
| 9 | Decision Log | Architecture Record | Canonical for engagement decisions | Records approved architecture decisions made during this engagement. | VALIDATED |
| 10 | Blocker Register | Architecture Record | Canonical for blockers | Records active dependencies and implementation gaps. | VALIDATED |
| 11 | Domain Profile | Persistent Knowledge | Directional guidance | Reusable domain guidance; engagement-specific artifacts take precedence. | ASSUMED |
| 12 | HLD Template | Structural Reference | Directional | Defines format, not project truth. | OBSERVED |

## 2. Ownership Matrix

| # | Domain / Component | Owns | Consumes | Produces / Hands Off | Evidence |
|---|---|---|---|---|---|
| 1 | Identity & Access | User identity, credential metadata, authentication state, session authorization | Login credentials and account actions | Authenticated identity and authorization result | VALIDATED |
| 2 | Schedule Management | Schedule, seven Schedule Cards, Exercises, Exercise Assignments, ordering, ownership rules | Authenticated identity | Schedule API responses and persistence outcomes | VALIDATED |
| 3 | React Frontend | Presentation, form, navigation, and accessible interaction state | REST responses and auth outcomes | Login and schedule commands | VALIDATED |
| 4 | Mock Repository | Prototype JSON records and repository read/write behavior | Validated commands from backend services | Demo data state; future persistence seam | VALIDATED |
| 5 | Hosting and CI | Build/test execution and future runtime deployment configuration | Application artifacts and environment configuration | Build evidence and future deployments | ASSUMED |
| 6 | Product Governance | Scope, acceptance, and Membership Value decisions | Discovery, PRD, and validation evidence | Approved requirements and decisions | VALIDATED |

### Negative boundary statements

- Identity & Access does not own schedules, exercises, or workout content.
- Schedule Management does not own passwords, refresh tokens, or credential issuance.
- React does not access the JSON file directly.
- The Mock Repository does not authenticate users or decide product rules.
- Hosting and CI do not own domain data or requirements.

## 3. Upstream Dependencies

| # | Dependency | Source Domain | Type | Contract Status | Evidence |
|---|---|---|---|---|---|
| 1 | Authenticated user identity context | Identity & Access | Internal API/context | Needs Creation | ASSUMED |
| 2 | Login, refresh, logout API contract | Identity & Access | REST API | Needs Creation | ASSUMED |
| 3 | Schedule read/write API contract | Schedule Management | REST API | Needs Creation | ASSUMED |
| 4 | JSON repository contract | Mock Repository | Internal interface/data | Needs Creation | VALIDATED |
| 5 | Seeded demo-user dataset | Mock Repository | Data | Needs Creation | VALIDATED |
| 6 | `/api/v1` API base path | Platform convention | API convention | Confirmed | VALIDATED |
| 7 | Production provider configuration | Hosting | Runtime configuration | PROVISIONAL | ASSUMED |

No external business, fitness, calendar, device, payment, or identity-provider dependency exists in prototype scope.

## 4. Platform Conventions

| # | Convention | Adjacent HLD Source | Pattern | Recommendation | Justification | Evidence |
|---|---|---|---|---|---|---|
| 1 | Frontend/API communication | None available | REST/JSON over HTTPS | Inherit | Simple and sufficient for the approved flows. | VALIDATED |
| 2 | Application structure | Domain Profile | Modular monolith with domain-aligned modules | Inherit | Two bounded contexts do not justify microservices. | ASSUMED |
| 3 | Prototype storage | Product Owner decision | JSON mock data behind repository interface | Inherit | Fastest demo path with a future persistence seam. | VALIDATED |
| 4 | API versioning | Product Owner decision | `/api/v1` prefix | Inherit | Establishes a stable contract from first implementation. | VALIDATED |
| 5 | Eventing | Architecture Context | No event bus; milestone events only if later needed | Deviate from event-driven architecture | No current integration or event-driven requirement. | VALIDATED |

No adjacent HLD conventions were available to inherit.

## 5. Open Questions

| # | Question | Source | Impact | Blocking? | Proposed Resolution |
|---|---|---|---|---|---|
| 1 | Which production provider accounts, regions, and privacy configuration will be used? | PRD / BLK-003 | Affects deployment and public-launch compliance. | No for HLD; yes before deployment/public launch | Confirm later; keep production configuration out of prototype. |
| 2 | When should real PostgreSQL persistence replace the JSON repository? | DEC-003 | Affects future persistence integration and operational scale. | No for prototype | Defer to a later integration initiative. |
| 3 | How should JSON mock-data mutation behave across multiple processes? | DEC-003 | Affects prototype concurrency limits. | No | Declare single-process demo limitation; do not promise multi-process persistence. |

## 6. Enrichment Log

| Date | Change | Source | Updated By |
|---|---|---|---|
| 2026-09-09 | Boundary map assembled after truth hierarchy, ownership, dependencies, and conventions were confirmed. | Boundary Mapping interview | Explore Agent / Calin |
| 2026-09-09 | Prototype storage changed from MongoDB/PostgreSQL migration to JSON mock repository. | DEC-003 | Calin |

## 7. Document History

| Version | Date | Author | Changes |
|---|---|---|---|
| 0.1 | 2026-09-09 | Explore Agent | Initial validated boundary map. |
