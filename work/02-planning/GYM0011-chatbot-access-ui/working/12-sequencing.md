# Sequencing and Scope — GYM0011

## Implementation Phases

### Phase 1: Foundation

- [ ] Confirm API response compatibility with GYM0010 and existing `answer` field.
- [ ] Define frontend response/message types and local panel state transitions.
- [ ] Confirm existing Vitest/RTL scripts and selectors.

### Phase 2: Core Features

- [ ] Refactor `ChatPanel` accordion controls and accessible status regions.
- [ ] Render success, demo warning, account metadata, fallback, rejection, and error states.
- [ ] Preserve public/authenticated requests, loading behavior, and schedule/login state.
- [ ] Add component tests for all response states.

### Phase 3: Integration & Polish

- [ ] Add keyboard/focus/axe checks and responsive styling validation.
- [ ] Add selected browser journeys when shared Playwright tooling is available.
- [ ] Run lint, typecheck, build, component tests, and selected E2E gates.
- [ ] Link UI evidence to GYM0012 and EPIC-GYM-005.

## Parallel Work Opportunities

- [ ] Component state tests can be written in parallel with CSS refinements.
- [ ] Accessibility tests can be prepared with mocked response fixtures while GYM0010 finalizes backend integration.
- [ ] Public and authenticated panel test cases can share the same component harness.

## Blocked Dependencies

- [ ] GYM0010 must expose the optional safe response metadata before final integration.
- [ ] Browser E2E execution depends on existing or approved Playwright tooling.

## Scope Validation

### Original Requirements

- [x] Clear demo-only warning: Phase 2.
- [x] Success, unknown, ambiguous, provider-failure, and fallback states: Phase 2.
- [x] Preserve login/schedule behavior: Phases 2–3.
- [x] Keyboard, focus, labels, and announcements: Phase 3.
- [x] No credentials/provider keys/JSON in frontend: Phases 1–2.

### Scope Creep Detected

- [ ] None. No backend authorization, persistence, new route, or production recovery work is included.

### Non-Goals Confirmed Excluded

- Direct JSON access from browser.
- Browser storage of normal credentials or raw demo tokens.
- New design system, remote services, DevOps, and deployment work.

## Task Tags

- **Complexity**: moderate
- **Component**: app
- **Type**: enhancement
- **Priority**: high
- **Risk**: high
