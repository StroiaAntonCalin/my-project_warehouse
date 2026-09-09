# Acceptance Criteria

## Epic Links

- Addresses Epic AC: EPIC-GYM-001 AC1–AC4 (seeded authentication and secure session behavior).
- Addresses Epic AC: EPIC-GYM-002 AC1–AC4 (one weekly schedule and seven-day board).
- Addresses Epic AC: EPIC-GYM-003 AC1–AC5 (exercise lifecycle, validation, and ordering).
- Addresses Epic AC: EPIC-GYM-004 AC1–AC5 (JSON persistence, typed contracts, tests, accessibility, and CI quality).

## Happy Path Criteria

- [ ] AC1: A seeded demo user can authenticate and reach the schedule board.
- [ ] AC2: The authenticated user sees exactly one schedule with exactly seven ordered weekday cards.
- [ ] AC3: The user can add an exercise with a name, edit its fields, change its order, and remove it.
- [ ] AC4: A saved exercise change remains present after API reload and application restart using the JSON repository.
- [ ] AC5: The frontend and backend can be started locally using documented commands and communicate through `/api/v1`.

## Error Handling Criteria

- [ ] AC6: Invalid credentials return an authentication error and do not expose whether a password or username failed.
- [ ] AC7: An unauthenticated request to a protected schedule or exercise operation returns `401`.
- [ ] AC8: A blank or missing exercise name returns a validation error and does not change stored data.
- [ ] AC9: Invalid optional exercise values, unsupported difficulty, malformed identifiers, or invalid ordering return validation errors.
- [ ] AC10: An invalid, expired, reused, or revoked refresh token cannot create a new access token.

## Edge Case Criteria

- [ ] AC11: The schedule invariant prevents fewer or more than seven days and preserves weekday order.
- [ ] AC12: A user cannot read or mutate another user's schedule, even when attempting to supply another identifier.
- [ ] AC13: Empty days render successfully and allow the first exercise to be added.
- [ ] AC14: Removing the last exercise leaves the day valid and empty rather than deleting the day.
- [ ] AC15: Refreshing or reopening the application restores the session through the refresh flow without persisting the access token in browser storage.

## Integration Criteria

- [ ] AC16: The React typed client maps API success, loading, validation, unauthorized, and server-error states to visible user feedback.
- [ ] AC17: Identity and Schedule services use repository boundaries so JSON storage can later be replaced without changing API behavior.
- [ ] AC18: Automated unit, integration, browser, and accessibility checks cover the critical login, ownership, seven-day invariant, and exercise lifecycle paths.
- [ ] AC19: The quality pipeline passes lint, type-check, tests, coverage thresholds, and production builds for the local prototype.
- [ ] AC20: Follow-on implementation tasks are traceable to the four approved epics and contain enough scope detail that no architectural choice remains open.

