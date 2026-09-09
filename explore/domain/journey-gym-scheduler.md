# Journey Map: GYM_SCHEDULER

**Status**: Minimal prototype journey — draft  
**Created**: 2026-09-07  
**Persona**: [Individual Gym Member](personas-gym-scheduler.md)  
**Evidence basis**: Approved Signal, context, hypothesis, persona, and refined concept

## Journey objective

Help a gym member create and maintain a personal seven-day exercise schedule with minimal effort.

## Core journey

| Stage | User goal and action | Expected experience | Friction to validate | Product opportunity | Evidence |
|---|---|---|---|---|---|
| 1. Access | Open the site and log in. | Login is clear, simple, and accessible. | Authentication errors or unclear next step. | Provide labeled fields, safe errors, and a clear submit action. | OBS + INF |
| 2. Orient | See the weekly schedule after login. | Seven weekday cards are immediately understandable. | Seven cards may feel dense on a small screen. | Use fixed weekday order, responsive layout, and an empty state. | OBS + INF |
| 3. Plan | Add an exercise to a selected day. | Exercise name can be entered quickly; optional details do not block progress. | Too many required fields or uncertainty about the selected day. | Use inline add controls and require only the exercise name. | INF |
| 4. Maintain | Edit or remove an existing exercise. | Common changes stay within the day card. | Small controls or accidental removal. | Use visible accessible actions and removal confirmation. | INF |
| 5. Save | Save the changed card. | The user knows whether data is being saved or has been saved. | Lost edits or unclear network failure. | Show unsaved/saving/saved/error states and preserve input for retry. | INF |
| 6. Return | Refresh or log in again later. | The confirmed schedule is still available to its owner. | Failed persistence or unauthorized access. | Retrieve server data and enforce ownership on every operation. | OBS + INF |

## Emotional arc to validate

| Stage | Desired feeling | Undesired feeling |
|---|---|---|
| Access | Confident | Uncertain about authentication |
| Orient | Clear | Overwhelmed by the week view |
| Plan | Efficient | Blocked by form complexity |
| Maintain | In control | Afraid of accidental deletion |
| Save | Reassured | Unsure whether changes were kept |
| Return | Trusting | Concerned that the plan disappeared |

These emotional states are design hypotheses, not user-research findings. **[INF]**

## Alternative and recovery paths

- Invalid credentials: show a safe, actionable error without unnecessarily revealing account existence.
- Empty schedule card: show an Add Exercise action and explain that the day has no exercises yet.
- Invalid exercise form: identify the missing required name and preserve other entered values.
- Save failure: retain local values, explain the failure, and allow an intentional retry.
- Remove request: require confirmation before deleting an Exercise Assignment.
- Expired or invalid session: prevent schedule access and return the user to login.
- Unauthorized resource request: return a safe error and do not reveal another user’s data.

## Validation plan

Ask a gym-member tester to complete these tasks:

1. Log in and find the Wednesday card.
2. Add an exercise with a name and optional details.
3. Edit the exercise and save it.
4. Remove the exercise and recover from a simulated save failure.
5. Refresh or log in again and confirm the saved result.

Measure task completion, time-to-first-successful-add, errors, requests for help, save confidence, and perceived usefulness. The initial hypothesis target is at least 4 of 5 testers completing the core tasks. **[INF]**

## Future-state direction

The Simple Weekly Board should make the authenticated schedule the main destination: seven fixed cards, direct editing, minimal exercise entry, explicit Save, and clear status feedback. This is the target design direction for the PRD and experience artifacts. **[INF]**

**Last Updated**: 2026-09-07  
**Prepared By**: Explore Agent, fallback mode due unavailable specialized skill
