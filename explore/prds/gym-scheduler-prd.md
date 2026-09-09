---
domain: GYM_SCHEDULER
slug: gym-scheduler
source: explore/explore-gym-scheduler/domain-analysis.md
glossary_version: 2026-09-07
validated_by: Calin
explore_type: Explore Readiness Check
evidence_label: OBS
---

# PRD · GYM_SCHEDULER

**Status**: Reviewed  
**Priority**: Medium  
**Stakeholder Appetite**: Moderate  
**Created**: 2026-09-07  
**Last Updated**: 2026-09-07

## Related Documents

- [Signal](../../signal/signals/20260907-gym-scheduler.md)
- [Hypothesis](../explore-gym-scheduler/hypothesis.md)
- [Context](../explore-gym-scheduler/context.md)
- [Domain Analysis](../explore-gym-scheduler/domain-analysis.md)
- [Technical Feasibility](../explore-gym-scheduler/technical-feasibility.md)
- [Architecture Context](../explore-gym-scheduler/architecture-context.md)
- [Regulatory Compliance](../explore-gym-scheduler/regulatory-compliance.md)
- [Refined Concept](../explore-gym-scheduler/ideation/gym-scheduler-refined-concepts.md)
- [Personas](../domain/personas-gym-scheduler.md)
- [Journey Map](../domain/journey-gym-scheduler.md)
- [Risk Register](../explore-gym-scheduler/risks.md)
- User Flows: `../domain/flows-gym-scheduler.md` — to be produced in Experience Design
- HLD: `../hlds/gym-scheduler-hld.md` — to be produced in Architecture, Strategy & Backlog
- Epics: `../epics/` — to be extracted in Govern preparation

## Problem Statement

**User Need**: Gym members need a simple way to organize planned exercises across a week and keep their plan current. Without a focused personal scheduler, users may find it harder to maintain a clear workout plan. The opportunity is to provide a useful digital benefit that may increase perceived gym membership value.

**Background**: This is a greenfield demo requested for general individual gym users. The approved concept is a Simple Weekly Board: one authenticated user schedule with exactly seven editable weekday cards. Existing alternatives and user research have not been assessed.

## Goals

1. **Make weekly planning clear**: At least 4 of 5 prototype testers identify the correct day for adding an exercise without help.
2. **Make schedule maintenance simple**: At least 4 of 5 prototype testers complete add, edit, remove, and save tasks.
3. **Assess membership value**: At least 3 of 5 prototype testers report that the scheduler helps organize their workouts.

## Success Metrics & KPIs

| Metric | Baseline | Target | Measurement Method | Timeline |
|---|---|---|---|---|
| Weekly-board comprehension | No baseline | 4 of 5 testers identify the correct day without help | Usability task observation | Prototype validation |
| Core task completion | No baseline | 4 of 5 testers complete add/edit/remove/save tasks | Usability test | Prototype validation |
| Schedule persistence | No existing system | 100% of successful saves remain after refresh/re-login | Integration and E2E tests | Before acceptance |
| Authorization protection | No existing system | 100% of cross-user access attempts are denied | Automated API tests | Before acceptance |
| Perceived usefulness | No baseline | 3 of 5 testers say the scheduler helps organize workouts | Lightweight feedback question | After prototype use |

**Primary KPI**: Core task completion.  
**Secondary KPIs**: Weekly-board comprehension, persistence, authorization protection, and perceived usefulness.

## Target Users

### Primary Users

- **Individual Gym Member**: Needs a quick, clear way to see the week and update exercises for each day.

### Secondary Users

- **Calin / Product Owner**: Needs evidence that the prototype offers a useful digital membership benefit and is feasible to build.

No additional user segments are defined for this prototype.

## User Flows & Scenarios

### Primary User Flow — F-001: Manage weekly schedule

1. User opens the login page.
2. User submits email and password.
3. Backend authenticates the user.
4. User sees exactly seven weekday cards.
5. User adds, edits, or removes an exercise.
6. User selects Save.
7. Backend validates ownership and persists the change.
8. UI shows Saved or a recoverable error.

### Alternative Flows

- **F-002 Empty schedule**: User sees seven empty cards and adds an exercise to any day.
- **F-003 Invalid credentials**: Login fails with safe, actionable feedback.
- **F-004 Expired session**: User is returned to login; schedule data remains protected.

### Edge Cases

- Failed saves preserve entered values and allow retry.
- Removing an exercise requires confirmation.
- Invalid exercise input is identified inline.
- Requests for another user’s schedule are rejected.
- A refreshed or renewed session retrieves the confirmed schedule.

## Functional Requirements

### Core Features

| ID | Requirement | User Story | Acceptance Criteria | Priority |
|---|---|---|---|---|
| R-001 | Account authentication | As an Individual Gym Member, I want to log in so that I can access my schedule. | [ ] Valid credentials grant access.<br>[ ] Invalid credentials show safe feedback.<br>[ ] Unauthenticated users cannot access schedule data. | High |
| R-002 | Personal schedule retrieval | As an Individual Gym Member, I want to see my schedule after login so that I can understand my week. | [ ] Only the owner’s schedule is returned.<br>[ ] Exactly seven weekday cards are displayed.<br>[ ] Cards use consistent Monday–Sunday order. | High |
| R-003 | Add an exercise | As an Individual Gym Member, I want to add an exercise to a day so that I can plan my workout. | [ ] Exercise name is required.<br>[ ] Optional workout details may be entered.<br>[ ] The exercise appears in the selected card before saving. | High |
| R-004 | Edit an exercise | As an Individual Gym Member, I want to edit an exercise so that my plan stays current. | [ ] Existing values are editable.<br>[ ] Invalid input is identified.<br>[ ] Changes remain visible until saved or cancelled. | High |
| R-005 | Remove an exercise | As an Individual Gym Member, I want to remove an exercise so that I can correct my plan. | [ ] Removal requires confirmation.<br>[ ] Confirmed removal is reflected in the card.<br>[ ] Cancelled removal leaves the assignment unchanged. | High |
| R-006 | Save schedule changes | As an Individual Gym Member, I want to save my changes so that they persist after I leave. | [ ] Save validates authenticated ownership.<br>[ ] Successful saves show confirmation.<br>[ ] Failed saves preserve entered values and allow retry. | High |
| R-007 | Logout | As an Individual Gym Member, I want to log out so that my schedule is no longer accessible from the active session. | [ ] Logout clears the active session.<br>[ ] Protected pages require authentication again. | Medium |

### Supporting Features

| ID | Requirement | User Story | Acceptance Criteria | Priority |
|---|---|---|---|---|
| R-008 | Responsive schedule presentation | As an Individual Gym Member, I want the board to work on my device so that I can maintain my plan wherever I use the web app. | [ ] Cards stack on small screens.<br>[ ] Core actions work without horizontal scrolling.<br>[ ] Hover is not required for any action. | Medium |
| R-009 | Accessible status feedback | As an Individual Gym Member, I want clear save and error feedback so that I know what happened. | [ ] Loading, saved, unsaved, and error states are visible.<br>[ ] Dynamic status changes are available to assistive technology. | High |

## Non-Functional Requirements

| ID | Requirement | Related requirements | Acceptance criteria |
|---|---|---|---|
| NFR-001 | Typical API actions respond within 2 seconds under demo conditions. | R-002, R-003, R-006 | [ ] Measured actions meet the target in demo testing. |
| NFR-002 | Initial page readiness targets 3 seconds on a typical connection. | R-001, R-002 | [ ] Page readiness is measured before acceptance. |
| NFR-003 | Passwords use strong salted hashing and HTTPS protects traffic. | R-001 | [ ] No plaintext passwords exist.<br>[ ] Secrets are not logged. |
| NFR-004 | Schedule operations enforce ownership. | R-002–R-006 | [ ] Cross-user read/write attempts are denied.<br>[ ] Authorization tests pass. |
| NFR-005 | Invalid and expired tokens are rejected. | R-001, R-007 | [ ] Protected requests without valid authentication are rejected. |
| NFR-006 | Successful saves remain available after refresh or renewed login. | R-006 | [ ] Persistence tests pass. |
| NFR-007 | Failed saves preserve recoverable user input. | R-003–R-006 | [ ] Simulated failures preserve values and allow retry. |
| NFR-008 | Login and scheduling target WCAG 2.2 AA. | R-001–R-009 | [ ] Keyboard-only flow works.<br>[ ] Labels and visible focus exist.<br>[ ] Automated checks pass. |
| NFR-009 | The interface supports approximately 320px mobile width and common desktop sizes. | R-002–R-009 | [ ] Core actions work without horizontal scrolling. |
| NFR-010 | The application uses TypeScript, linting, formatting, and automated tests. | All | [ ] CI lint, test, and build checks pass. |

## Quality Gates

### Definition of Ready

A requirement is ready for implementation when its user story and acceptance criteria are clear, its priority is assigned, its terminology matches the glossary, dependencies and open questions are identified, and security/accessibility impacts and testing expectations are understood.

### Definition of Done

A requirement is complete when implementation is reviewed and merged, acceptance criteria pass, applicable unit/API/E2E tests pass, authorization and accessibility behavior is checked, loading/empty/success/error states are handled, documentation and environment configuration are updated, and CI lint, test, and build checks pass.

### Testing Strategy

- Frontend unit/component tests use Vitest and React Testing Library.
- Backend unit/API tests use Jest and Supertest.
- Playwright covers login, schedule retrieval, exercise editing, saving, and logout.
- Security tests cover invalid credentials, expired tokens, cross-user access, and secret/log review.
- Accessibility testing combines automated checks with keyboard review.
- Test data uses isolated users and schedules; no real personal data is used.

### DevOps & Deployment Strategy

- GitHub Actions runs lint, tests, and builds on pull requests.
- The prototype uses a JSON mock-data file behind a repository interface; real PostgreSQL persistence is deferred.
- Secrets remain in GitHub/provider secret stores and are separated by environment.
- Provider logs and structured application logs provide initial monitoring.
- Rollback uses the previous successful deployment.
- A staging environment is recommended but remains an open prototype decision.

## Constraints

**Technical Constraints**

- React + TypeScript frontend — `[ASSUMPTION]` from tooling decision.
- NestJS + TypeScript backend — `[ASSUMPTION]` from tooling decision.
- JSON mock-data file behind a repository interface — `[CONFIRMED]` for the prototype; real persistence is deferred.
- Explicit Save is preferred over autosave — `[ASSUMPTION]` from technical feasibility.
- Offline editing and live synchronization are not required — `[CONFIRMED]` prototype scope.

**Business Constraints**

- This is a demo prototype — `[CONFIRMED]`.
- Each user has one schedule — `[CONFIRMED]`.
- Each schedule has exactly seven weekday cards — `[CONFIRMED]`.
- No fixed deadline or special delivery constraint — `[CONFIRMED]`.

**Regulatory Constraints**

- Strong password hashing and HTTPS — `[CONFIRMED]` baseline.
- Users access only their own data — `[CONFIRMED]` baseline.
- WCAG 2.2 AA is the accessibility target — `[CONFIRMED]` baseline.
- Target market and jurisdiction-specific review remain undefined — `[ASSUMPTION]` before public launch.

**Resource Constraints**

- **Timeline**: No fixed deadline — `[CONFIRMED]`.
- **Budget**: Not defined for the prototype — `[ASSUMPTION]`.
- **Team**: Calin currently covers Product Manager, Architect, and Lead Engineer — `[CONFIRMED]`.

## Out of Scope

- Payments and membership billing — not required for the demo.
- Trainer or gym-admin workflows — no requirement identified.
- Social sharing or public schedules — schedules are personal.
- Native mobile applications — web prototype only.
- Calendar, device, wearable, or external gym integrations — no integrations planned.
- Social login, MFA, and password recovery — excluded to keep authentication simple.
- Advanced analytics or personalization — defer until success measures are established.
- Offline editing and real-time multi-device synchronization — unnecessary prototype complexity.

**Future Considerations**: Export/deletion workflows, richer exercise metadata, curated exercise catalog, usage analytics, and additional account lifecycle features.

## Open Questions

| ID | Question | Owner | Priority | Target Resolution |
|---|---|---|---|---|
| Q-001 | Are registration and logout included, or will demo users be seeded? | Calin | High | Before implementation |
| Q-002 | What secure JWT storage and refresh strategy will be used? | Calin / Delivery team | High | Before implementation |
| Q-003 | Which exercise fields are mandatory? | Calin | High | Before implementation |
| Q-004 | Do users need exercise reorder, copy, or move actions? | Calin | Medium | Before implementation |
| Q-005 | Are the performance targets acceptable? | Calin | Medium | Before acceptance |
| Q-006 | Which browsers and viewport sizes must be supported? | Calin | Medium | Before testing |
| Q-007 | Is a staging environment required before the demo? | Calin | Medium | Before deployment |
| Q-008 | What metric best represents increased membership value? | Calin | Medium | Before product evaluation |
| Q-009 | Which target market and provider regions apply before public launch? | Calin | Medium | Before public launch |

**Assumptions converted to questions**: H-1 through H-4 and context assumptions 1–7 are represented by Q-001 through Q-009 or are documented as constraints with validation plans.

## Technical Architecture

**Summary**: React + TypeScript communicates over HTTPS with a NestJS + TypeScript REST API. The API owns authentication, authorization, validation, and schedule operations. The prototype reads and writes through a repository interface backed by a JSON mock-data file. Real PostgreSQL persistence is deferred until a later integration. GitHub Actions runs lint, tests, and builds.

**Key Components**

- React frontend: login and seven-card weekly board.
- NestJS API: authentication, authorization, validation, and schedule endpoints.
- JSON mock-data repository: prototype User, Schedule, Schedule Card, Exercise, and Exercise Assignment data.
- GitHub Actions: continuous validation and deployment trigger.

**Integrations**

- Frontend to API: REST/JSON over HTTPS.
- API to mock repository: JSON file access behind a replaceable persistence interface.
- CI to hosting: provider deployment after passing checks.

**Data Model**: A User owns exactly one Schedule. A Schedule contains exactly seven Schedule Cards. A Schedule Card contains Exercise Assignments, each referencing an Exercise. All schedule operations are scoped to the authenticated owner.

**Reference**: Architecture solutioning will produce the HLD; the current input is [architecture-context.md](../explore-gym-scheduler/architecture-context.md).

## Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation Strategy | Owner |
|---|---|---|---|---|
| Missing ownership check exposes another user’s schedule. | Medium | High | Centralized authorization guards and negative API tests. | Calin / Delivery team |
| Insecure password or JWT handling compromises accounts. | Low | High | Strong hashing, HTTPS, secure session strategy, and review. | Calin / Delivery team |
| Seven cards are difficult to use on small screens. | Medium | Medium | Responsive stacking, compact summaries, and mobile testing. | Delivery team |
| Failed save loses entered exercises. | Medium | Medium | Preserve input, show error, and support intentional retry. | Delivery team |
| Exercise fields are too limited or complex. | Medium | Medium | Require only name initially; validate with testers. | Calin |
| Prototype does not demonstrate membership value. | Medium | Medium | Measure task completion and lightweight usefulness feedback. | Calin |

**Reference**: [risks.md](../explore-gym-scheduler/risks.md)

## Dependencies

**Upstream Dependencies**

- Approved Signal, discovery artifacts, and ideation concept — complete.
- Authentication lifecycle and exercise-field decisions — open.

**Downstream Dependencies**

- Experience design and user flows depend on this PRD.
- HLD, ADRs, test strategy, DevOps strategy, epics, and implementation tasks depend on this PRD.

**External Dependencies**

- Vercel, Render, Neon, and GitHub Actions are planned providers.
- No external business or fitness integrations are required.

## Epic Extraction

**Status**: Not Started

**Proposed epics**:

- **E-001 Authentication**: R-001, R-007
- **E-002 Weekly Schedule Board**: R-002, R-008, R-009
- **E-003 Exercise Management**: R-003, R-004, R-005
- **E-004 Mock Persistence and Quality**: R-006, NFR-001–NFR-010

Epic files will be created during Govern preparation using the approved PRD.

## Implementation Notes

**Phasing**

- **Phase 1**: Set up frontend, API, mock JSON repository, authentication, and one-schedule/seven-card model.
- **Phase 2**: Build the weekly board and exercise add/edit/remove/save flow.
- **Phase 3**: Complete security, accessibility, automated testing, deployment, and prototype validation.

**Technical Considerations**

- Enforce one schedule and seven cards at the API/repository boundary.
- Keep the JSON repository behind an interface so real persistence can be integrated later without changing domain use cases.
- Decide secure JWT/session handling before implementation.
- Avoid blind retries for writes to prevent duplicate assignments.
- Keep private schedule data out of logs and unnecessary client storage.

**Design Considerations**

- Use a single weekly board with fixed Monday–Sunday order.
- Stack cards responsively on small screens.
- Provide clear empty, unsaved, saving, saved, and error states.
- Use semantic controls, visible focus, accessible labels, and keyboard alternatives.

## Approval & Sign-Off

| Role | Name | Date | Status |
|---|---|---|---|
| Product Manager | Calin | 2026-09-07 | Approved |
| Tech Lead | Calin | 2026-09-07 | Approved |
| UX Lead | Not assigned; prototype UX reviewed by Calin | 2026-09-07 | Accepted for prototype |
| Stakeholder | Calin | 2026-09-07 | Approved |

## Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-09-07 | Explore Agent | Initial PRD assembled from approved Groups 1–4. |

## Related Documentation

- [Context](../explore-gym-scheduler/context.md)
- [Hypothesis](../explore-gym-scheduler/hypothesis.md)
- [Discovery Index](../explore-gym-scheduler/discovery.md)
- [Domain Model](../domain/gym-scheduler-domain.md)
- [Personas](../domain/personas-gym-scheduler.md)
- [Journey Map](../domain/journey-gym-scheduler.md)
- [Risk Register](../explore-gym-scheduler/risks.md)

**Slug**: gym-scheduler  
**Domain**: GYM_SCHEDULER  
**Last Updated**: 2026-09-07  
**Status**: Reviewed
