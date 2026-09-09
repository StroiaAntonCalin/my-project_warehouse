+++
[metadata]
epic_id = "EPIC-GYM-003"
last_updated = "2026-09-09"
[epochs]
  [epochs.0]
  name = "Exercise CRUD"
  started = "2026-09-09"
  jira_key = ""
+++

# EPIC-GYM-003 — Exercise Management

**Domain**: GYM_SCHEDULER  
**Owner**: Calin  
**Status**: Draft

## Objective

Let a member add, edit, reorder, remove, validate, and save exercises on any weekday card.

## Scope & Boundaries

In scope: required exercise name, optional validated fields, explicit numeric order, add/edit/remove confirmation, save, retry, ownership, and persistence after refresh/re-login.

Out of scope: curated exercise catalog, recommendations, medical advice, workout analytics, sharing, and multi-user collaboration.

## Key Behaviors

1. Exercise name is mandatory; optional fields validate when provided.
2. Add, edit, remove, and ordering changes remain visible before explicit save.
3. Failed saves preserve entered values and permit retry.

## Acceptance Criteria

- [ ] R-003 through R-006 pass.
- [ ] NFR-004, NFR-006, and NFR-007 pass.
- [ ] Foreign-user reads/writes are denied.
- [ ] Unit, API, repository, and E2E CRUD tests pass.

## Data & Events

Owns Schedule Cards and ordered Exercise records through Schedule Management. Emits no events.

## Dependencies

- EPIC-GYM-001 authenticated identity.
- EPIC-GYM-002 board/card presentation.
- EPIC-GYM-004 repository and quality foundation.

## Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Invalid or incomplete exercise data | Medium | DTO/domain validation and inline errors |
| Failed save loses input | Medium | Client state preservation and retry tests |
| Cross-user access | High | Central ownership check and negative tests |

## Non-Functional Requirements

Response target NFR-001; ownership NFR-004; persistence NFR-006; recoverability NFR-007.

## Task Breakdown Strategy

Domain contract → API endpoints → repository mutations → frontend forms → save/error recovery → CRUD E2E demo.

## Related Epics

- EPIC-GYM-001 provides identity.
- EPIC-GYM-002 provides card context.
- EPIC-GYM-004 provides fixtures and CI.

## Links & References

- PRD: [gym-scheduler-prd.md](../prds/gym-scheduler-prd.md)
- HLD: [gym-scheduler-hld.md](../hlds/gym-scheduler-hld.md)
- ADR: [JSON repository](../decisions/gym-scheduler-adr-002-json-repository.md)

## Exercise CRUD

Deliver validated exercise add/edit/remove/order/save flows with ownership protection and recoverable failures.
