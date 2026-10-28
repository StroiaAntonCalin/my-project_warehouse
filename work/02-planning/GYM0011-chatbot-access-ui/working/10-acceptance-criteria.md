# Acceptance Criteria — GYM0011

## Epic Link

Addresses Epic AC: EPIC-GYM-005 AC4–AC7 and NFR-003, NFR-004, NFR-006, and NFR-007.

## Happy Path Criteria

- [ ] **AC1**: Public chatbot displays a successful safe answer for a known request.
- [ ] **AC2**: Authenticated chatbot displays a schedule answer without changing login or schedule state.
- [ ] **AC3**: Successful demo access visibly identifies the resolved account and displays the exact prototype-only warning.

## Error Handling Criteria

- [ ] **AC4**: Unknown, ambiguous, malformed, and feature-disabled responses render safe understandable feedback without credentials or unrelated accounts.
- [ ] **AC5**: Local fallback responses are visibly distinguishable from provider responses without exposing provider internals.
- [ ] **AC6**: Network and API failures render an accessible alert and leave the input recoverable.

## Edge Case Criteria

- [ ] **AC7**: Optional/unknown response fields are ignored; only whitelisted safe metadata is rendered.
- [ ] **AC8**: Passwords, password hashes, raw tokens, provider keys, and full prompts never appear in the UI.
- [ ] **AC9**: Collapsed and expanded states remain keyboard-operable, have correct `aria-expanded`/`aria-controls`, and can be retracted with a visible `−` control.

## Integration Criteria

- [ ] **AC10**: Public and authenticated chat endpoints continue to submit the existing request shape and consume the compatible `answer` field.
- [ ] **AC11**: Assistant responses are announced through a polite live region and request failures through an alert/status mechanism.
- [ ] **AC12**: Component tests cover all response states and accessibility behavior.
- [ ] **AC13**: Selected browser journeys pass on supported browser targets without regressions to login or the seven-day schedule board.
