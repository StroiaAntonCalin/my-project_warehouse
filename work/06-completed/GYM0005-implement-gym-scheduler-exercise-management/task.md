+++
[metadata]
task_id = "GYM0005"
title   = "Implement GYM_SCHEDULER exercise management"
status  = "06-completed"

[sources]
epic      = "../../../../explore/epics/EPIC-GYM-003-exercise-management.md"
documents = [
    "../../../../explore/hlds/gym-scheduler-hld.md",
    "../../../../explore/explore-gym-scheduler/test-strategy.md",
    "../../../../work/06-completed/GYM0004-implement-gym-scheduler-authenticated-weekly-sched/task.md"
]

[links]
blocks  = []
related = ["../../../../work/06-completed/GYM0004-implement-gym-scheduler-authenticated-weekly-sched/task.md"]
parent  = []
child   = []

[workflow]
defined = "2026-09-09"
planned = ""
implemented = ""

[assignments]
definition     = ""
planning       = ""
implementation = ""
+++

# Task: Implement GYM_SCHEDULER exercise management

## Problem Statement

The weekly board shows seven days, but members cannot yet add or maintain exercises. Add authenticated exercise CRUD with simple validation and explicit ordering, then connect it to each day card.

## Goals & Acceptance Criteria

- [ ] Authenticated members can add, edit, remove, and reorder exercises on their own days.
- [ ] Exercise name is required; optional fields are validated when supplied.
- [ ] Mutations persist to the JSON mock data and appear after reload.
- [ ] A member cannot mutate another member's schedule.
- [ ] The UI provides a simple exercise form and delete action on each day card.

## Non-Goals

- Workout completion analytics, sharing, coach administration, or production persistence.

## Constraints & Dependencies

- Build on the merged authenticated schedule board.
- Preserve explicit numeric `order` fields and exactly seven days.

