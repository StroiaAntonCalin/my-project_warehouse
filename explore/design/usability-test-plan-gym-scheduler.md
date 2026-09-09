# Usability Test Plan: GYM_SCHEDULER

**Status**: Minimal prototype test plan — draft  
**Created**: 2026-09-07  
**Concept**: Simple Weekly Board  
**Source**: [Hypothesis](../explore-gym-scheduler/hypothesis.md), [Journey Map](../domain/journey-gym-scheduler.md), and [Wireframes](wireframes-gym-scheduler.md)

## Snapshot

This lightweight plan validates whether an Individual Gym Member can understand and use the seven-card board with minimal guidance. It is intended for prototype testing, not statistically significant research.

## Research Questions and Hypotheses

| ID | Research question | Hypothesis |
|---|---|---|
| UQ-001 | Can users identify the correct day card? | At least 4 of 5 testers can find a named day without help. |
| UQ-002 | Can users add and edit an exercise? | At least 4 of 5 testers complete add and edit tasks. |
| UQ-003 | Do users understand Save and status feedback? | At least 4 of 5 testers know whether changes were saved. |
| UQ-004 | Can users recover from a failed save? | Testers can retry without re-entering the exercise. |
| UQ-005 | Does the board feel useful? | At least 3 of 5 testers say it helps organize workouts. |

## Method

- **Format**: Moderated task-based walkthrough of a clickable or coded prototype.
- **Sessions**: Five short sessions, approximately 15–20 minutes each.
- **Environment**: One desktop session and one small-screen session per available tester where practical.
- **Moderator behavior**: Ask the participant to think aloud, avoid leading them, and record confusion or recovery attempts.
- **Privacy**: Use test accounts and fictional exercise data; do not collect medical, biometric, payment, or unnecessary profile information.

## Participants

- Individual gym members or people who plan their own workouts.
- No trainer or administrator role required.
- Mix of users familiar and unfamiliar with the prototype where available.
- Include at least one keyboard-only pass if a suitable tester is available.

## Scenarios and Tasks

### Scenario 1 — First access

“You want to organize your workouts for the week. Log in and show where you would add an exercise for Wednesday.”

Observe: login comprehension, safe error recovery if simulated, and ability to locate the correct Schedule Card.

### Scenario 2 — Add and save

“Add Squat to Wednesday, optionally enter sets and repetitions, and save it.”

Observe: form comprehension, required-field clarity, Save understanding, and confirmation confidence.

### Scenario 3 — Edit and remove

“Change the exercise details, save the update, then remove the exercise.”

Observe: discoverability of Edit and Remove, confirmation comprehension, and whether the user can distinguish local changes from saved changes.

### Scenario 4 — Recover from failure

“Your connection fails while saving. Recover and complete the save without losing your entered values.”

Observe: error comprehension, value preservation, retry behavior, and trust.

### Scenario 5 — Return later

“Refresh or sign in again and confirm the saved exercise is still present.”

Observe: persistence expectation and confidence in the personal schedule.

## Metrics and Data Capture

| Metric | Capture method | Initial target |
|---|---|---|
| Task completion | Completed / not completed per task | 4 of 5 for core tasks |
| Time to first correct card | Timer from board display to correct day selection | Record baseline; identify outliers |
| Assistance requests | Count moderator interventions | Minimize; document causes |
| Errors | Note wrong card, invalid input, missed Save, or accidental removal | Identify repeated issues |
| Recovery success | Whether tester recovers from simulated save failure | Majority recover without re-entry |
| Save confidence | Ask “How sure are you that your change was saved?” | Clear confidence for most testers |
| Perceived usefulness | One-question response after tasks | 3 of 5 positive responses |

## Analysis Plan

1. Summarize completion and recovery results per task.
2. Group observed issues by login, orientation, editing, saving, responsive layout, and accessibility.
3. Identify issues seen by at least two testers as prototype-priority changes.
4. Compare desktop and small-screen observations where both are available.
5. Update the PRD, risk register, or interaction model if evidence contradicts the Simple Weekly Board assumption.

## Decision Rules

- **Proceed** if core task completion meets the hypothesis target and no high-impact security/accessibility issue is found.
- **Adjust the design** if users repeatedly miss the correct card, cannot understand Save, or lose values after an error.
- **Reconsider the concept** if most testers need a guided flow or focused day editor to complete basic tasks.

**Last Updated**: 2026-09-07  
**Prepared By**: Explore Agent, inline fallback because the specialized usability-testing skill was unavailable
