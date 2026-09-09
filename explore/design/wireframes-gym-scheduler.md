# Wireframes: GYM_SCHEDULER

**Status**: Minimal low-fidelity wireframes — draft  
**Created**: 2026-09-07  
**Concept**: Simple Weekly Board  
**Source**: [PRD](../prds/gym-scheduler-prd.md) and [User Flows](../domain/flows-gym-scheduler.md)

## Snapshot

These text wireframes define the minimum screen structure for the prototype. They are intentionally low fidelity and focus on layout, content, states, and interaction rather than visual styling.

## Screen Inventory

| Screen | Purpose | Required states |
|---|---|---|
| W-001 Login | Authenticate the Individual Gym Member. | Default, submitting, invalid credentials, expired session. |
| W-002 Weekly Schedule | Show and edit exactly seven weekday cards. | Loading, empty, populated, unsaved, saving, saved, error. |

## Wireframe Conventions

- `[Button]` is an actionable button.
- `[Input]` is a labeled form field.
- `{Status}` is a visible status message.
- `⋮` indicates omitted repeated content, not a hidden required action.
- All actions must have accessible names and keyboard focus.

## Screen Specs

### W-001 Login — default

```text
+----------------------------------+
| GYM_SCHEDULER                    |
|                                  |
|          Log in                  |
|                                  |
| Email                            |
| [Input: email                  ] |
|                                  |
| Password                         |
| [Input: password               ] |
|                                  |
| [ Log in ]                       |
|                                  |
| {Error/status message area}      |
| Privacy notice · Terms           |
+----------------------------------+
```

Notes: Submit on button activation or valid form submission. Do not expose whether an account exists through error wording.

### W-002 Weekly Schedule — desktop

```text
+--------------------------------------------------------------+
| GYM_SCHEDULER                 Weekly Schedule       [Log out] |
| {Saved / Unsaved / Error status}                              |
|                                                              |
| +----------------------+ +----------------------+             |
| | Monday               | | Tuesday              |             |
| | [Add Exercise]       | | [Add Exercise]       |             |
| | Exercise · [Edit][X] | | Empty: Add Exercise  |             |
| | [Save] {status}      | | [Save] {status}      |             |
| +----------------------+ +----------------------+             |
|                                                              |
| +----------------------+ +----------------------+             |
| | Wednesday            | | Thursday             |             |
| | [Add Exercise]       | | [Add Exercise]       |             |
| | ⋮                    | | ⋮                    |             |
| | [Save] {status}      | | [Save] {status}      |             |
| +----------------------+ +----------------------+             |
|                                                              |
| +----------------------+ +----------------------+             |
| | Friday               | | Saturday             |             |
| | [Add Exercise]       | | [Add Exercise]       |             |
| | ⋮                    | | ⋮                    |             |
| | [Save] {status}      | | [Save] {status}      |             |
| +----------------------+ +----------------------+             |
|                                                              |
| +----------------------------------------------------------+   |
| | Sunday                                                   |   |
| | [Add Exercise]  [Save] {status}                          |   |
| +----------------------------------------------------------+   |
+--------------------------------------------------------------+
```

### Exercise edit state

```text
+------------------------------+
| Monday                       |
| Exercise name                |
| [Input: Squat              ] |
| Sets [Input]  Reps [Input]   |
| Duration [Input]             |
| Notes [Input              ]  |
| [Cancel] [Save]              |
| {Unsaved / Saving / Saved}   |
+------------------------------+
```

Only Exercise name is required initially. Other fields are optional.

## Screen States

### Loading

- Login button becomes unavailable while submitting.
- Weekly Schedule shows a clear loading message or skeleton placeholders.

### Empty

- All seven cards remain visible.
- Each empty card explains that no exercises have been added and provides Add Exercise.

### Saved

- The affected card shows Saved with a clear status message.
- The user remains on Weekly Schedule.

### Unsaved

- The affected card shows Unsaved after local changes.
- The user can continue editing or select Save.

### Error

- Login, load, validation, and save errors appear near the affected control.
- Save errors preserve entered values and provide a retry action.
- Authorization errors do not reveal another user’s data.

## Cross-Screen Patterns

- Header branding remains consistent.
- Use semantic headings and labeled inputs.
- Keep status messages in a predictable live-region location.
- Use confirmation before removal.
- Avoid hover-only actions and icon-only controls without accessible names.

## Responsive Considerations

- At approximately 320px–767px, cards use one column and full-width controls.
- At approximately 768px–1023px, cards may use two columns if content remains readable.
- At 1024px and above, use a multi-column weekly board.
- No core action requires horizontal scrolling.
- Touch targets should be approximately 44×44 CSS pixels or larger.

## Validation Checklist

- [ ] Login is the first unauthenticated screen.
- [ ] Weekly Schedule is protected and contains exactly seven cards.
- [ ] Monday–Sunday order is consistent.
- [ ] Add, edit, remove, Save, Cancel, and Log out actions are visible and named.
- [ ] Loading, empty, unsaved, saved, and error states are represented.
- [ ] Failed saves preserve entered values.
- [ ] Layout works at small mobile and desktop widths.
- [ ] Keyboard focus and status announcements are supported.

**Last Updated**: 2026-09-07  
**Prepared By**: Explore Agent, inline fallback because the specialized wireframing skill was unavailable
