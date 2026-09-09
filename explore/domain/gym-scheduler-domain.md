# Locked Domain Model: GYM_SCHEDULER

**Status**: Locked for PRD and Solution Design  
**Created**: 2026-09-07  
**Source**: [domain-analysis.md](../explore-gym-scheduler/domain-analysis.md) and approved Simple Weekly Board concept

## Bounded Contexts

| Context | Responsibility | Owned data |
|---|---|---|
| Identity & Access | Registration/login, credential verification, JWT/session authorization, account status | User identity and credential metadata |
| Schedule Management | Schedule retrieval, seven weekday cards, exercise definitions/assignments, validation, ordering, and user-owned edits | Schedule, Schedule Card, Exercise, Exercise Assignment |

## Entities and Relationships

- **User** owns exactly one **Schedule**.
- **Schedule** contains exactly seven **Schedule Cards**, one for each weekday.
- **Schedule Card** contains zero or more **Exercise Assignments**.
- **Exercise Assignment** references one **Exercise** and has a unique order within its card.

## Domain Rules

1. Authentication is required before schedule access.
2. A user has exactly one schedule.
3. A schedule has exactly seven weekday cards.
4. Users can read and mutate only their own schedule data.
5. An exercise assignment must reference a valid card and exercise.
6. Exercise name is required initially; other workout details are optional until product review.
7. Cards cannot be created or deleted by users.

## Glossary Alignment

Terminology follows [explore/glossary.md](../glossary.md): User, Schedule, Schedule Card, Exercise, Exercise Assignment, Membership Value, and JWT.

## State Summary

- User: Registered → Active → Deactivated.
- Schedule: Empty → Configured ↔ Active.
- Schedule Card: Available ↔ Updated.
- Exercise Assignment: Planned → Removed.

## Traceability

- [PRD · GYM_SCHEDULER](../prds/gym-scheduler-prd.md)
- [Architecture Context](../explore-gym-scheduler/architecture-context.md)
- [Technical Feasibility](../explore-gym-scheduler/technical-feasibility.md)

**Last Updated**: 2026-09-07  
**Validated By**: Calin
