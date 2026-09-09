# Accessibility Specifications: GYM_SCHEDULER

**Status**: Minimal prototype accessibility specification — draft  
**Created**: 2026-09-07  
**Conformance target**: WCAG 2.2 Level AA baseline  
**Source**: [Regulatory Compliance](../explore-gym-scheduler/regulatory-compliance.md), [PRD](../prds/gym-scheduler-prd.md), and [Wireframes](wireframes-gym-scheduler.md)

## Snapshot

Accessibility is required for the Login and Weekly Schedule flows. No prototype exemptions are proposed.

## Conformance Target

- Target WCAG 2.2 Level AA for all prototype functionality.
- Use semantic HTML before custom controls.
- Do not communicate meaning through color alone.
- Maintain visible focus, logical focus order, and keyboard access.
- Support text resize/reflow and responsive layouts without loss of core functionality.

## Cross-Cutting Requirements

- Every input has a visible, programmatically associated label.
- Every button and link has a clear accessible name.
- Focus indicators remain visible against the background.
- Focus order follows the visual and task order.
- Error messages identify the affected field and explain how to recover.
- Dynamic loading, saved, unsaved, and error status changes are announced through an appropriate live region.
- Normal text targets at least 4.5:1 contrast; large text targets 3:1.
- Controls remain usable at approximately 44×44 CSS pixels or larger where practical.
- The interface does not require hover, drag, color, or precise pointer movement for core tasks.

## Component Specifications

| Component | Requirements |
|---|---|
| Login form | Use a clear heading, labeled email/password inputs, keyboard-submit behavior, safe error feedback, and focus return to the relevant field. |
| Weekly Schedule | Use a meaningful page heading and weekday headings; preserve Monday–Sunday order; expose loading and empty states in text. |
| Schedule Card | Group related content semantically; identify the weekday; keep Add Exercise and Save discoverable; show unsaved/saving/saved state. |
| Exercise form | Label required and optional fields; identify required Exercise name; provide inline validation and preserve values on failure. |
| Edit/Remove actions | Use text or accessible names; make Remove confirmation keyboard-operable; return focus predictably after closing. |
| Status messages | Announce save success and errors without moving focus unexpectedly; do not rely on color alone. |
| Header and Log out | Use a consistent landmark/header and an explicitly named Log out control. |

## Flow-Level Accessibility Checks

### Login

- Keyboard user can reach email, password, submit, policy links, and error content in logical order.
- Invalid credentials are announced and do not expose unnecessary account information.
- Focus is visible and not trapped.

### Weekly Schedule

- Keyboard user can reach all seven cards and their actions.
- Screen-reader user can identify each weekday and whether it is empty, changed, saving, saved, or in error.
- The user can add/edit/remove/save without drag-and-drop or hover.
- Removal confirmation has a clear name, role, and keyboard exit.

### Recovery

- Validation errors are associated with fields.
- Failed saves preserve values and announce the recovery action.
- Expired sessions return to Login with a clear message and no private data exposed.

## Acceptance Criteria

- [ ] Login and schedule flows work using keyboard only.
- [ ] All inputs, buttons, links, cards, and dialogs have accessible names or headings.
- [ ] Focus order and visible focus are usable.
- [ ] Errors, save states, and confirmations are perceivable without color alone.
- [ ] Core schedule actions work at approximately 320px width and at 200% zoom without loss of functionality.
- [ ] Automated accessibility checks pass for Login and Weekly Schedule.
- [ ] Manual keyboard review passes before prototype acceptance.
- [ ] At least one screen-reader review is completed before public launch planning.

## Testing Approach

- Run axe or an equivalent automated check in frontend tests/CI.
- Perform manual keyboard navigation for login, add/edit/remove, save, error, and logout.
- Check contrast, focus, labels, and reflow at mobile width and 200% zoom.
- Use NVDA, VoiceOver, or an equivalent screen reader for the primary flow when available.
- Record defects and link them to the affected PRD requirement or risk.

**Last Updated**: 2026-09-07  
**Prepared By**: Explore Agent, inline fallback because the specialized accessibility skill was unavailable
