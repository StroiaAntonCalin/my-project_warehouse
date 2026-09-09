# Truth Hierarchy: GYM_SCHEDULER

**Status**: Validated  
**Created**: 2026-09-09  
**Last Validated**: 2026-09-09  
**Validated By**: Calin  
**Domain**: Personal gym workout scheduling

## Authority Map

| # | Authority | Scope | Consumers | Constraints | Evidence |
|---|---|---|---|---|---|
| 1 | Product Owner — Calin | Product scope, acceptance, business value, and implementation trade-offs | Delivery team, architecture, PRD | Approved prototype boundaries | VALIDATED |
| 2 | Identity & Access | User identity, credentials, session authorization | Schedule Management, frontend | Secure token handling and logout | VALIDATED |
| 3 | Schedule Management | Schedule and exercise-assignment state | Frontend, repository | One schedule, seven cards, ownership | VALIDATED |
| 4 | Mock Repository | Prototype JSON data state after confirmed writes | Schedule Management | Single-process demo limitation | VALIDATED |
| 5 | Domain Glossary / Analysis | Terminology, entities, and invariants | PRD and architecture artifacts | Canonical naming and domain rules | VALIDATED |
| 6 | Regulatory Baseline | Security, privacy, data minimization, accessibility | All components | WCAG 2.2 AA target; no sensitive data expansion | VALIDATED |

## Document Classification

| # | Document | Type | Classification | Rationale |
|---|---|---|---|---|
| 1 | PRD · GYM_SCHEDULER | PRD | Canonical | Approved product contract. |
| 2 | Domain Analysis | Domain Analysis | Canonical | Approved domain rules and model. |
| 3 | Architecture Context | Architecture Context | Canonical | Approved discovery architecture baseline. |
| 4 | Context | Scope Statement | Canonical | Approved business and stakeholder context. |
| 5 | Technical Feasibility | Feasibility | Directional | Technical input that architecture may refine. |
| 6 | Refined Concept | Ideation | Directional | Experience direction, not binding design. |
| 7 | Domain Profile | Persistent Knowledge | Directional | Reusable guidance subordinate to engagement decisions. |
| 8 | Decision Log | Architecture Record | Canonical for decisions | Current engagement decisions override earlier assumptions. |
| 9 | Blocker Register | Architecture Record | Canonical for blockers | Current state of unresolved dependencies. |

## Authority Conflicts

| # | Conflict | Domain A Claims | Domain B Claims | Resolution | Status |
|---|---|---|---|---|---|
| 1 | Prototype persistence | Earlier feasibility artifacts proposed PostgreSQL/Prisma. | DEC-003 selects JSON mock data and defers real persistence. | DEC-003 supersedes the earlier persistence assumption for the prototype. | Resolved |

## Re-validation History

| Date | Trigger | Changes | Approved By |
|---|---|---|---|
| 2026-09-09 | Boundary Mapping | Confirmed document authority and resolved persistence conflict through DEC-003. | Calin |

## Enrichment Log

| Date | Change | Source | Updated By |
|---|---|---|---|
| 2026-09-09 | Initial truth hierarchy created for HLD engagement. | Boundary Mapping | Explore Agent |

## Document History

| Version | Date | Author | Changes |
|---|---|---|---|
| 0.1 | 2026-09-09 | Explore Agent | Initial validated hierarchy. |
