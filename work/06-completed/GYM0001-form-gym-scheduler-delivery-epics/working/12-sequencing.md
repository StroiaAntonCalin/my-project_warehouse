# Sequencing and Scope

## Implementation Phases

### Phase 1: Foundation

- [ ] EPIC-GYM-004 foundation slice: create the React/NestJS workspace, scripts, TypeScript contracts, JSON repository, seed data, test setup, and local CI checks.
- [ ] EPIC-GYM-001: implement seeded login, access JWT validation, refresh rotation, logout, cookie/CORS configuration, and protected-route tests.
- [ ] Create the shared schedule and exercise domain contracts required by both frontend and backend.

### Phase 2: Core Features

- [ ] EPIC-GYM-002: implement authenticated schedule retrieval and the seven-card weekly board.
- [ ] EPIC-GYM-003: implement exercise add, edit, remove, validation, explicit ordering, persistence, and UI forms.

### Phase 3: Integration & Polish

- [ ] Complete React-to-NestJS integration for loading, saving, unauthorized, validation, and server-error states.
- [ ] Add Playwright critical-path coverage, axe checks, keyboard/responsive review, and coverage enforcement.
- [ ] Verify restart-visible JSON persistence, refresh behavior, and local setup documentation.
- [ ] Record deferred production deployment and database decisions before any migration or hosting work.

## Parallel Work Opportunities

- [ ] Frontend login/board visual shell and backend DTO/domain contract tests can proceed in parallel after shared contracts are agreed.
- [ ] Unit tests for domain validation and repository adapter can proceed in parallel with controller wiring.
- [ ] Accessibility test scaffolding and CI script setup can proceed alongside feature implementation.

## Blocked Dependencies

- Schedule board is blocked by the authenticated identity contract and schedule retrieval endpoint.
- Exercise UI mutations are blocked by schedule/day retrieval and exercise API contracts.
- Browser E2E is blocked until frontend and backend local start commands are stable.
- Production deployment is blocked by BLK-003 and is outside the prototype.

## Scope Validation

### Original Requirements

- [ ] Seeded login and protected access: Phase 1.
- [ ] Exactly one seven-day schedule: Phase 1 contracts and Phase 2 schedule feature.
- [ ] Editable day cards and exercise CRUD: Phase 2.
- [ ] Local React/NestJS app with JSON mock data: Phase 1.
- [ ] Testing and quality foundation: Phase 1 and Phase 3.

### Scope Creep Detected

- No scope creep detected. Registration, durable database, deployment, sharing, notifications, payments, and advanced analytics remain excluded.

### Non-Goals Confirmed Excluded

- Production PostgreSQL integration.
- Staging or production hosting.
- Registration and social authentication.
- Multiple schedules, collaboration, and coach administration.
- Workout completion analytics implementation.

## Task Tags

- **Complexity**: moderate
- **Component**: cross-cutting
- **Type**: feature
- **Priority**: high
- **Risk**: medium

