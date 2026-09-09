+++
[metadata]
task_id = "GYM0003"
title   = "Implement GYM_SCHEDULER seeded authentication and sessions"
status  = "06-completed"

[sources]
epic      = "../../../../explore/epics/EPIC-GYM-001-authentication-session.md"
documents = [
    "../../../../explore/decisions/gym-scheduler-adr-004-secure-session.md",
    "../../../../explore/hlds/gym-scheduler-hld.md",
    "../../../../explore/explore-gym-scheduler/test-strategy.md",
    "../../../../work/06-completed/GYM0002-create-gym-scheduler-local-workspace-foundation/task.md"
]

[links]
blocks  = []
related = ["../../../../work/06-completed/GYM0002-create-gym-scheduler-local-workspace-foundation/task.md"]
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

# Task: Implement GYM_SCHEDULER seeded authentication and sessions

**Task ID**: GYM0003
**Status**: 01-pending-planning
**Phase**: flow

## Problem Statement

The prototype foundation exists, but schedule data is not protected by user authentication. Add the simplest approved authentication flow so a seeded demo member can log in, refresh a session, and log out.

## Goals & Acceptance Criteria

- [ ] Valid seeded credentials return a short-lived access JWT.
- [ ] Refresh tokens are rotated and stored only in Secure/HttpOnly/SameSite cookies.
- [ ] Invalid credentials, missing refresh tokens, expired sessions, and reused refresh tokens are rejected.
- [ ] Logout revokes the active refresh session and clears the cookie.
- [ ] Authentication behavior is covered by backend tests.

## Non-Goals

- Registration, password recovery, social login, roles administration, or production identity providers.

## Constraints & Dependencies

- Use the existing NestJS modular monolith and JSON-seeded user.
- Keep access tokens out of browser storage; frontend memory handling belongs to the next UI integration task.
- Use development-only credentials and environment-configured signing secrets.

