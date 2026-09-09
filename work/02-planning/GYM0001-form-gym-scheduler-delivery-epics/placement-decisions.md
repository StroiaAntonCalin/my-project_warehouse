# Capability Placement Decisions: GYM_SCHEDULER

No existing epics exist, so all capabilities create new epics. [OBS]

| Epic | Capabilities | Requirements | Rationale |
|---|---|---|---|
| EPIC-GYM-001 Authentication & Session | seeded login, access token, refresh, logout, protected identity | R-001, R-007, NFR-003, NFR-005 | One Identity & Access boundary |
| EPIC-GYM-002 Weekly Schedule Board | schedule retrieval, exactly seven cards, responsive board, status feedback | R-002, R-008, R-009, NFR-002, NFR-009 | One user-facing weekly-board capability |
| EPIC-GYM-003 Exercise Management | add/edit/remove, validation, ordering, confirmation, save commands | R-003–R-006, NFR-004, NFR-006, NFR-007 | One Schedule Management capability |
| EPIC-GYM-004 Prototype Quality Foundation | JSON repository, typed contracts, tests, accessibility automation, CI quality gates | NFR-001, NFR-010 and cross-cutting acceptance | Shared delivery foundation without creating a deployment epic |

## Placement Rationale

- New epics are required because the epic directory is empty.
- The four boundaries follow the HLD ownership matrix and keep each epic cohesive.
- Frontend/API work is placed with the user capability it enables; cross-cutting test/repository/CI work is grouped in the foundation epic.
- Production hosting and PostgreSQL migration are excluded and remain future work.
