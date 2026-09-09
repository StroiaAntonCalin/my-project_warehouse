+++
[metadata]
task_id = "GYM0004"
title   = "Implement GYM_SCHEDULER authenticated weekly schedule board"
status  = "01-pending-planning"

[sources]
epic      = "../../../../explore/epics/EPIC-GYM-002-weekly-schedule-board.md"
documents = [
    "../../../../explore/hlds/gym-scheduler-hld.md",
    "../../../../explore/decisions/gym-scheduler-adr-003-typed-rest-client.md",
    "../../../../work/06-completed/GYM0003-implement-gym-scheduler-seeded-authentication-and/task.md"
]

[links]
blocks  = []
related = ["../../../../work/06-completed/GYM0003-implement-gym-scheduler-seeded-authentication-and/task.md"]
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

# Task: Implement GYM_SCHEDULER authenticated weekly schedule board

**Task ID**: GYM0004
**Status**: 01-pending-planning

## Problem Statement

Authentication exists, but the authenticated member cannot load or see their weekly schedule. Connect the frontend to the protected schedule API and render exactly seven editable day cards as the core product experience.

## Goals & Acceptance Criteria

- [ ] Authenticated users can load their single schedule from `GET /api/v1/schedules/me`.
- [ ] The API derives schedule ownership from the verified JWT identity.
- [ ] The frontend provides login, loading, error, logout, and authenticated board states.
- [ ] The board renders exactly seven ordered weekday cards, including empty days.
- [ ] Access tokens remain in memory and refresh cookies are sent by the browser.

## Non-Goals

- Exercise add/edit/remove mutations; those belong to the next task.
- Registration, multiple schedules, collaboration, or deployment.

## Constraints & Dependencies

- Build on the merged GYM0003 authentication implementation and JSON repository.
- Preserve the seven-day domain invariant and typed REST boundary.

