# Problem Capture

## Problem Statement

GYM_SCHEDULER has approved product and architecture artifacts but no runnable application workspace. Feature work cannot begin consistently until the React frontend, NestJS backend, shared contracts, JSON repository boundary, seed data, and quality commands exist.

The desired state is a clean local checkout that developers can install, start, test, type-check, lint, and build without MongoDB, PostgreSQL, or external services. This foundation matters now because authentication, the weekly board, and exercise management all depend on it.

## Stakeholders

- Product owner (Calin): approves the foundation scope and prototype boundaries.
- Development team: uses the workspace, contracts, repository ports, scripts, and test harness.
- Future gym member/demo user: indirectly benefits from a runnable path to the product features.
- Future deployment owner: relies on clear local-only boundaries before production decisions.

## Affected Components

- [ ] Manager
- [x] Server
- [x] App
- [x] Cross-cutting

## Initial Questions

- [ ] Which workspace layout and package manager scripts give the fastest local start for React and NestJS?
- [ ] Which minimal health endpoint and repository interfaces should be established before feature modules?
- [ ] What seed data shape keeps the seven-day invariant valid without implementing authentication yet?
- [ ] How should frontend and backend test commands run independently and together?

## Existing Context

- [Quality Foundation epic](../../../../explore/epics/EPIC-GYM-004-quality-foundation.md)
- [HLD](../../../../explore/hlds/gym-scheduler-hld.md)
- [JSON repository ADR](../../../../explore/decisions/gym-scheduler-adr-002-json-repository.md)
- [Test strategy](../../../../explore/explore-gym-scheduler/test-strategy.md)
- [DevOps strategy](../../../../explore/explore-gym-scheduler/devops-strategy.md)
- [GYM0002 task definition](../task.md)

