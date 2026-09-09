+++
[metadata]
task_id = "GYM0002"
title   = "Create GYM_SCHEDULER local workspace foundation"
status  = "06-completed"

[sources]
epic      = "../../../../explore/epics/EPIC-GYM-004-quality-foundation.md"
documents = [
    "../../../../explore/hlds/gym-scheduler-hld.md",
    "../../../../explore/explore-gym-scheduler/test-strategy.md",
    "../../../../explore/explore-gym-scheduler/devops-strategy.md",
    "../../../../explore/decisions/gym-scheduler-adr-001-modular-monolith.md",
    "../../../../explore/decisions/gym-scheduler-adr-002-json-repository.md",
    "../../../../explore/decisions/gym-scheduler-adr-003-typed-rest-client.md",
    "../../../../explore/epics/README.md"
]

[links]
blocks  = []
related = ["../../../../work/06-completed/GYM0001-form-gym-scheduler-delivery-epics/task.md"]
parent  = []
child   = []

[workflow]
defined = "2026-09-09"
planned = "2026-09-09"
implemented = ""

[assignments]
definition     = ""
planning       = "anton-calin.stroia@endava.com"
implementation = ""
+++

# Task: Create GYM_SCHEDULER local workspace foundation

**Task ID**: GYM0002
**Status**: 01-pending-planning
**Phase**: flow
**Date**: 2026-09-09
**Branch**: impl/GYM0002-create-gym-scheduler-local-workspace-foundation

## Problem Statement

The project has approved product and architecture direction but no runnable application workspace. Create the smallest local foundation needed for React and NestJS feature work to begin consistently.

## Goals & Acceptance Criteria

### Goals

- Establish a local React + TypeScript frontend and NestJS + TypeScript backend workspace.
- Add the JSON mock-data file and repository boundary required by the prototype.
- Add shared domain/API contracts, seeded development data, and deterministic local scripts.
- Add the initial unit/integration test harness and quality commands.

### Acceptance Criteria

- [ ] A developer can install dependencies and start the frontend and backend locally using documented commands.
- [ ] The backend exposes a health endpoint under `/api/v1` and loads valid JSON seed data through a repository interface.
- [ ] Shared schedule, day, exercise, and user types are available to feature modules without coupling to the JSON adapter.
- [ ] Seed data contains demo users and one valid seven-day schedule for the demo member.
- [ ] Lint, type-check, unit test, integration test, and build commands execute successfully on the foundation.
- [ ] No MongoDB, PostgreSQL, production secrets, or deployment configuration is introduced.

## Non-Goals

- Authentication behavior, schedule UI, exercise CRUD UI, and deployment; these are follow-on tasks.
- Durable database integration, registration, or production hosting.

## Context & References

### Source Material

- `../../../../explore/epics/EPIC-GYM-004-quality-foundation.md` — quality and persistence foundation boundary.
- `../../../../explore/hlds/gym-scheduler-hld.md` — approved modular monolith and local runtime.
- `../../../../explore/explore-gym-scheduler/test-strategy.md` — test layers and quality gates.
- `../../../../explore/explore-gym-scheduler/devops-strategy.md` — lean local/CI commands and deferred environments.

### Related Tasks

- **Blocks**: Follow-on authentication, weekly schedule board, and exercise management tasks.
- **Related**: Completed GYM0001 delivery-epic planning.

## Constraints & Dependencies

- Preserve the accepted JSON-only prototype storage decision.
- Keep the backend as one NestJS modular monolith and the frontend as a React TypeScript app.
- Use the approved test strategy without adding unnecessary infrastructure.

## Success Metrics

- A clean local checkout can run the foundation checks without a database or external service.
- Feature tasks can import the contracts and repository ports without restructuring the workspace.

## Notes

Implementation details belong in `plan.md`, created during governed planning.

