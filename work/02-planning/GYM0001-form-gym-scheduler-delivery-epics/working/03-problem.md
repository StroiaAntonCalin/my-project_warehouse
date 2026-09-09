# Problem Capture

## Problem Statement

GYM_SCHEDULER currently has no implemented application for a gym member to manage a personal workout schedule. The prototype needs a simple authenticated experience where a seeded demo user can log in and view one weekly schedule composed of exactly seven editable day cards. Each day must support adding, editing, reordering, and removing exercises.

Success is a locally runnable React/TypeScript frontend and NestJS/TypeScript backend that demonstrates this core flow using a JSON mock-data repository. The business driver is to demonstrate membership value through a simple, usable scheduling experience before introducing production persistence or deployment complexity.

## Stakeholders

- Product owner (Calin): approves scope, behavior, and prototype acceptance.
- Gym member / demo user: logs in and manages the weekly schedule.
- Development team: implements frontend, backend, tests, and local tooling.
- Future deployment owner: resolves production provider, region, privacy, and persistence decisions.

## Affected Components

- [ ] Manager
- [x] Server
- [x] App
- [x] Cross-cutting

## Initial Questions

- [ ] Which exact demo credentials and roles should be seeded for the first local run?
- [ ] What local JSON write strategy is sufficient for the prototype when concurrent writes are not supported?
- [ ] Which exercise validation ranges should be enforced for optional numeric fields?
- [ ] Should a completed workout be represented in the first implementation, or remain outside the initial schedule CRUD scope?
- [ ] Which local commands and repository layout should be canonical for frontend, backend, test, build, and lint execution?

## Existing Context

- [PRD](../../../explore/prds/gym-scheduler-prd.md)
- [HLD](../../../explore/hlds/gym-scheduler-hld.md)
- [Boundary map](../../../explore/hlds/gym-scheduler-boundary-map.md)
- [Test strategy](../../../explore/explore-gym-scheduler/test-strategy.md)
- [DevOps strategy](../../../explore/explore-gym-scheduler/devops-strategy.md)
- [Delivery epics](../../../explore/epics/README.md)
- [Task definition](../task.md)

