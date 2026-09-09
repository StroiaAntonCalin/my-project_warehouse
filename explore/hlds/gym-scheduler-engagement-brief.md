# Architecture Engagement Brief: GYM_SCHEDULER

**Slug**: `gym-scheduler`  
**HLD name**: HLD · GYM_SCHEDULER  
**Explore type**: Explore Readiness Check  
**Engagement start**: 2026-09-07  
**Status**: Scope confirmed

## Engagement Scope

This engagement will produce an architecture package for the Simple Weekly Board prototype. It covers the approved PRD, two bounded contexts, the React/NestJS direction with JSON mock-data storage, security/accessibility guardrails, and the path to test strategy, DevOps strategy, epics, and Govern handoff. **[OBS: approved PRD and architecture context]**

## Quality Priorities

1. Security — protect credentials and prevent cross-user schedule access.
2. Maintainability — keep the prototype understandable and easy to change.
3. Usability/accessibility — make login and schedule editing clear and keyboard usable.
4. Reliability — persist confirmed saves and recover from failures.
5. Cost simplicity — use a small managed-service footprint appropriate to demo scale.

## Constraints

- One authenticated User has exactly one Schedule.
- Each Schedule has exactly seven weekday Schedule Cards.
- Users can access only their own schedule data.
- No external runtime integrations, offline mode, or live synchronization.
- Planned prototype stack: React + TypeScript, NestJS + TypeScript, and a JSON mock-data repository behind an interface.
- Real PostgreSQL persistence is deferred to a later integration.
- General privacy/security/accessibility baseline; no target market selected yet.
- Prototype/demo scope with no fixed deadline.

## Bounded Contexts

| Context | Responsibility | Owned data |
|---|---|---|
| Identity & Access | Authentication, account status, session authorization | User identity and credential metadata |
| Schedule Management | Weekly schedule and exercise assignment management | Schedule, Schedule Card, Exercise, Exercise Assignment |

## Architecture Drivers

1. Protect each User’s Schedule through authentication and ownership checks.
2. Keep the prototype simple to build and operate.
3. Present exactly seven editable weekday cards.
4. Support reliable exercise add/edit/remove/save/retrieve behavior.
5. Provide accessible and responsive login and schedule editing.
6. Persist confirmed changes across refresh and renewed login.
7. Leave a path to measure perceived Membership Value later without adding analytics now.

## Hardening Scope

- Base: boundary integrity, cross-view consistency, failure-mode analysis, contract completeness.
- Extended: regulatory compliance, latency budget, threat model, availability, auditability.
- Domain: one-schedule invariant, seven-card invariant, ownership enforcement, valid assignment references, deterministic ordering, and no out-of-scope sensitive data.

## Direction Seed

**Simple Weekly Board**: one authenticated weekly board with seven responsive cards, direct exercise editing, explicit Save, and clear status feedback. **[INF: approved ideation output]**

## Expected Outputs

- Boundary map and truth hierarchy.
- Breadth-first design sketch.
- HLD · GYM_SCHEDULER and architecture decision records.
- Test and DevOps strategies.
- Epics and implementation tasks.
- Govern readiness assessment.

## Known Open Items

- Secure JWT storage/session and refresh strategy.
- Exact exercise fields and ordering behavior.
- Browser support matrix and staging need.
- Target market/provider regions before public launch.
- Quantitative definition of Membership Value.

**Validated By**: Calin  
**Last Updated**: 2026-09-07
