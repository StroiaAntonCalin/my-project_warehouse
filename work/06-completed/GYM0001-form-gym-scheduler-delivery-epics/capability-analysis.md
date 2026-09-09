# Capability Analysis: GYM_SCHEDULER

## Core Capabilities

| Capability | State | Value | Dependencies |
|---|---|---|---|
| Seeded authentication and logout | Not implemented | Protects each member's schedule | JSON users, session strategy |
| Weekly schedule retrieval | Not implemented | Makes the user's week visible | Authenticated identity, repository |
| Seven weekday cards | Not implemented | Provides the Simple Weekly Board interaction | Schedule model, responsive UI |
| Exercise add/edit/remove | Not implemented | Keeps the plan current | Day ownership, validation, ordering |
| Explicit save and reload persistence | Not implemented | Preserves user changes | JSON repository, error recovery |

## Supporting Capabilities

| Capability | State | Value | Dependencies |
|---|---|---|---|
| Typed REST API | Not implemented | Connects React and NestJS | API contracts |
| Exercise validation and ordering | Not implemented | Protects data quality | Domain rules |
| Accessible responsive UI | Not implemented | Supports keyboard and current browsers | React components, WCAG checks |
| Automated test pyramid | Not implemented | Protects auth, ownership, and persistence | Vitest, Jest, Supertest, Playwright |
| Local CI quality gates | Not implemented | Keeps changes safe and repeatable | GitHub Actions strategy |

## Integration Capabilities

There are no external business integrations. Internal integration is React → REST API → Identity/Schedule modules → JSON repository. [OBS]

## Relationship Map

```text
Authentication → authenticated identity → schedule retrieval
Schedule retrieval → seven weekday cards → exercise CRUD
Exercise CRUD → validation → explicit save → JSON persistence
All user flows → accessibility, tests, CI quality gates
```

## Implementation State

The repository contains approved specifications and no application source scaffold. All runtime capabilities are not yet implemented. [OBS]
