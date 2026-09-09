+++
[metadata]
epic_id = "EPIC-GYM-002"
last_updated = "2026-09-09"
[epochs]
  [epochs.0]
  name = "Seven-Day Board"
  started = "2026-09-09"
  jira_key = ""
+++

# EPIC-GYM-002 — Weekly Schedule Board

**Domain**: GYM_SCHEDULER  
**Owner**: Calin  
**Status**: Draft

## Objective

Give an authenticated member a clear weekly board with exactly seven editable weekday cards in Monday–Sunday order.

## Scope & Boundaries

In scope: schedule retrieval, seven-card rendering, day titles/order, responsive layout, empty/loading/saved/error states, and accessible board navigation.

Out of scope: exercise business rules, authentication policy, public schedules, calendars, notifications, and trainer/admin views.

## Key Behaviors

1. Only the authenticated owner’s schedule is shown.
2. Exactly seven cards render consistently across supported browsers and widths.
3. The board communicates loading, unsaved, saved, and recoverable error states.

## Acceptance Criteria

- [ ] R-002, R-008, and R-009 pass.
- [ ] NFR-002 and NFR-009 pass.
- [ ] Keyboard navigation, labels, focus, responsive stacking, and status announcements pass accessibility checks.
- [ ] Playwright verifies login-to-seven-card journey.

## Data & Events

Consumes Weekly Schedule and Schedule Card API responses. Emits no events.

## Dependencies

- EPIC-GYM-001 authenticated identity.
- EPIC-GYM-003 exercise content.

## Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Seven cards are hard to use on narrow screens | Medium | Responsive stacking and browser/viewport tests |
| Wrong owner data displayed | High | API ownership tests and UI fixture coverage |

## Non-Functional Requirements

Performance: NFR-002. Accessibility/responsive: NFR-008, NFR-009. API response target: NFR-001.

## Task Breakdown Strategy

Frontend shell → schedule API client → seven-card board → states and responsive styling → accessibility/E2E demo.

## Related Epics

- EPIC-GYM-001 provides session identity.
- EPIC-GYM-003 provides exercises rendered inside cards.
- EPIC-GYM-004 provides test and CI gates.

## Links & References

- PRD: [gym-scheduler-prd.md](../prds/gym-scheduler-prd.md)
- HLD: [gym-scheduler-hld.md](../hlds/gym-scheduler-hld.md)
- Accessibility: [accessibility-gym-scheduler.md](../design/accessibility-gym-scheduler.md)

## Seven-Day Board

Deliver the responsive, accessible Monday–Sunday board with loading, saved, unsaved, and error states.
