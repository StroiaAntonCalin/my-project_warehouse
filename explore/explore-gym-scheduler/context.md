# Context: GYM_SCHEDULER

**Signal**: [`20260907-gym-scheduler.md`](../../signal/signals/20260907-gym-scheduler.md)  
**Phase**: SP1 — Context Capture & Signal Enrichment  
**Created**: 2026-09-07  
**Status**: Complete

---

## Problem Statement

**Reframed from Signal**:

Gym members need a simple, personal way to organize planned exercises and weekly training activities. The opportunity is based on a direct user request; existing workflows and pain points have not yet been researched.

The prototype should help an authenticated gym member create a weekly plan, view it across seven daily cards, and add or edit exercises. Existing alternatives and their limitations remain open discovery questions.

**Root cause**: There is no confirmed, focused workflow for individual gym members to manage their own training schedule.

**Impact**: Users may have difficulty organizing planned workouts, while the business may miss an opportunity to increase perceived gym membership value.

**Desired outcome**: A gym member can authenticate, access one weekly schedule, edit seven daily cards, and add exercises; the business can later evaluate usage and perceived membership value.

---

## Scope & Boundaries

### In Scope

**Core Platform**:
- React + TypeScript frontend
- NestJS + TypeScript backend
- JSON mock-data persistence for the prototype; real database integration deferred
- Email/password authentication with JWT access tokens
- Authorization so users access only their own schedule

**Pages & Features**:
- Login page
- Authenticated schedule view
- Exactly seven editable cards, one for each day of the week
- Add, edit, and remove exercises
- Save and retrieve one schedule per user

**Infrastructure**:
- Vercel frontend hosting
- Render backend hosting
- No database provider for the prototype; future PostgreSQL provider remains deferred
- GitHub Actions for linting, tests, and builds

**Developer Experience**:
- TypeScript across frontend and backend
- ESLint, Prettier, Vitest, React Testing Library, Jest, Supertest, and Playwright as planned tooling

### Out of Scope

**Explicitly excluded**:
- Payments or membership billing — not needed for the prototype
- Trainer or gym-admin workflows — no evidence in the Signal
- Social sharing or public schedules — not currently required
- Native mobile applications — web prototype only
- External gym, calendar, or fitness-device integrations — none identified
- Social login, MFA, and password recovery — keep prototype authentication simple
- Advanced analytics or personalization — defer until success measures are defined

### Boundary Conditions

**Integration boundaries**:
- The frontend calls the backend over HTTPS.
- The backend owns authentication, authorization, schedule data, and exercise data.
- No external business or fitness-system integrations are planned.

**Ownership boundaries**:
- GYM_SCHEDULER owns the frontend, backend, database schema, and deployment configuration.
- Vercel, Render, Neon, and GitHub provide platform services.
- Calin currently owns product, architecture, and engineering decisions for the prototype.

---

## Domain Model

### Core Entities

| Entity | Description | Key Attributes | Relationships |
|--------|-------------|----------------|---------------|
| **User** | Authenticated gym member | `id`, `email`, `passwordHash`, `createdAt` | Owns one schedule |
| **Schedule** | A user’s weekly training plan | `id`, `userId`, `createdAt`, `updatedAt` | Belongs to one user; contains seven cards |
| **ScheduleCard** | One day in the weekly schedule | `id`, `scheduleId`, `day`, `title`, `notes`, `position` | Belongs to one schedule; contains exercises |
| **Exercise** | Reusable exercise definition | `id`, `name`, `description`, `createdAt` | Can be assigned to cards |
| **CardExercise** | Exercise assignment within a day | `id`, `cardId`, `exerciseId`, `sets`, `repetitions`, `duration`, `order` | Joins a card to an exercise |

### Entity Relationships

```text
User (1) ──< (1) Schedule
Schedule (1) ──< (7) ScheduleCard
ScheduleCard (1) ──< (many) CardExercise
Exercise (1) ──< (many) CardExercise
```

Initial rules: a user has exactly one schedule; every schedule has seven day cards; cards may contain zero or more exercises; users can manage only their own schedule content. Exercise deletion behavior remains open for domain analysis.

---

## System Map

### Integration Architecture

| Component | Role | Technology | Integrates With | Data Flow |
|-----------|------|------------|-----------------|-----------|
| **User Browser** | Displays the application | Modern web browser | Vercel frontend | Sends login and schedule actions over HTTPS |
| **Frontend** | Login and schedule-card interface | React + TypeScript on Vercel | NestJS backend | Sends API requests and renders responses |
| **Backend API** | Authentication, authorization, validation, and schedule operations | NestJS + TypeScript | JSON mock repository | Reads and writes prototype data |
| **Mock Repository** | Prototype storage | JSON file | NestJS backend | Stores demo users, schedules, cards, and exercises |
| **CI Pipeline** | Validates and builds changes | GitHub Actions | GitHub repositories and deployment providers | Runs lint, tests, and builds |

### Data Flow Diagrams

**Build-time flow**:
```text
Developer → GitHub → GitHub Actions → lint/tests/build → Vercel + Render deployment
```

**Runtime flow**:
```text
Gym member → React frontend → NestJS API → JSON mock repository
                              ↓
                         JWT authentication
```

**Critical dependencies**:
- JSON mock repository: unavailable file prevents demo schedule access; it is not production storage.
- Backend API: unavailable authentication and schedule operations fail.
- Frontend hosting: unavailable application access fails.
- CI and hosting providers: deployment or automated validation is reduced if unavailable.

---

## Technical Constraints

| Constraint | Source | Status | Impact | Notes |
|------------|--------|--------|--------|-------|
| Authentication before schedule access | Product owner | ✅ Confirmed | High | Basic email/password with JWT |
| One schedule per user | Product owner | ✅ Confirmed | High | No multi-schedule UX in prototype |
| Seven cards represent seven days | Product owner | ✅ Confirmed | High | Exactly one card per day |
| Users can add, edit, and remove exercises | Product owner | ✅ Confirmed | Medium | Exercise fields still need domain validation |
| React/NestJS/JSON mock repository | Project tooling decision | ⚠️ Assumed | Medium | Prototype stack, not implemented |
| Vercel/Render/Neon/GitHub Actions | Project tooling decision | ⚠️ Assumed | Low | Planned hosting and CI |
| Social login, MFA, password recovery excluded | Product owner direction | ✅ Confirmed | Low | Keeps prototype authentication simple |
| Exact exercise fields and deletion behavior | Discovery gap | ❌ Open | Medium | Resolve in domain analysis |

**Status Legend**: ✅ Confirmed = validated; ⚠️ Assumed = planned or inferred; ❌ Open = requires a decision.

---

## Stakeholder Map & RACI

### Stakeholders

| Stakeholder | Organization | Role | Interest | Influence | Engagement Strategy |
|-------------|--------------|------|----------|-----------|---------------------|
| **Calin** | GYM_SCHEDULER | Product Owner, Architect, and Lead Engineer | Business value, scope, feasibility, and acceptance | High | Reviews and approves each phase gate |
| **Gym members** | Target users | Schedule users and testers | Simple login, weekly planning, and exercise editing | Medium | Validate workflows when available |
| **Delivery team** | GYM_SCHEDULER | Prototype builders and operators | Quality, maintainability, and delivery | High | Participates in technical reviews |

### RACI Matrix

| Activity | Calin | Gym members | Delivery team |
|----------|-------|-------------|---------------|
| Signal approval | A | C | R |
| Explore Bundle approval | A | C | R |
| Context capture | A/R | C | C |
| Domain analysis | A | C | R |
| Technical feasibility | A | I | R |
| Architecture context | A | I | R |
| Compliance review | A | C | R |
| PRD approval | A | C | R |
| Implementation | A | I | R |
| Prototype validation | A | R | R |

**Legend**: R = Responsible, A = Accountable, C = Consulted, I = Informed.

---

## Governance Framework

### Decision Authority

| Decision Type | Decision Maker | Consulted | Informed | Escalation Path |
|---------------|----------------|-----------|----------|-----------------|
| Architecture and technology | Calin — Architect | Delivery team | Project stakeholders | Calin |
| Product scope | Calin — Product Owner | Delivery team and gym-member testers | Project stakeholders | Calin |
| Authentication and data handling | Calin — Architect/Product Owner | Delivery team | Project stakeholders | Calin |
| Timeline and resourcing | Calin — Product Owner | Delivery team | Project stakeholders | Calin |
| Prototype acceptance | Calin — Product Owner | Gym-member testers and delivery team | Project stakeholders | Calin |

### Approval Gates

| Gate | Approver | Criteria | Fallback |
|---|---|---|---|
| Signal sufficient | Calin | Problem and context are clear | Return to Signal Strengthen |
| Explore Bundle approved | Calin | Scope, activities, assumptions, and risks accepted | Revise bundle |
| Discovery artifacts accepted | Calin | Context, domain, compliance, feasibility, and architecture findings complete | Address gaps |
| PRD-ready | Calin | Requirements and technical direction are coherent | Revise PRD |
| Govern readiness | Calin | Required Explore artifacts complete and no blockers remain | Return to Explore |

---

## Assumptions Catalogue

| # | Assumption | Open Question | Risk if Wrong | Owner | Closes In |
|---|------------|---------------|---------------|-------|------------|
| 1 | Gym members will use a web scheduler to increase membership value | What usage or feedback demonstrates increased value? | Product may not support the business goal | Calin | A1/A11 |
| 2 | Each user needs exactly one seven-day schedule | Should users ever create additional schedules? | Data model and UX redesign | Calin | A3 |
| 3 | Basic email/password JWT authentication is sufficient | Is account verification required? | Authentication scope may expand | Calin | A4/A5 |
| 4 | Exercises can be represented with basic workout details | Which fields are mandatory? | Exercise model may be incomplete | Calin | A3 |
| 5 | No external integrations are needed initially | Is calendar or device integration needed later? | Architecture may expand | Calin | A1/A9 |
| 6 | Selected stack and hosting are suitable | Can the team operate them within prototype resources? | Delivery delays or hosting changes | Calin | A5/A9 |
| 7 | Direct weekly-board editing is faster for target users than a guided or day-focused flow | Do users understand and maintain the seven-card board without guidance? | Interaction model may need redesign | Calin | Ideation/Solution Design |

---

## Gaps Catalogue

| # | Gap | Why It Matters | Question for Stakeholder | Stakeholder |
|---|-----|----------------|-------------------------|-------------|
| 1 | Business success measurement | Determines whether membership value increased | Which metric or user signal should we track? | Calin |
| 2 | Exercise data fields | Defines the domain model and form UX | What details are required for each exercise? | Calin |
| 3 | Schedule editing behavior | Defines core interactions | Can users reorder, duplicate, or move exercises? | Calin |
| 4 | Account lifecycle | Defines authentication scope | Should registration, verification, logout, and reset be included? | Calin |
| 5 | User feedback access | Enables validation beyond the initial request | Which gym members can test the prototype? | Calin |
| 6 | Deployment ownership | Defines operational responsibility | Who manages provider and repository access? | Calin |

---

## Context Summary

### One-Page Baseline

**Problem**: Gym members need a simple way to organize and manage weekly training activities.

**Solution**: A web prototype with basic login, one seven-day schedule per user, editable daily cards, and exercise management.

**Scope**: React/NestJS web platform, authentication, schedule and exercise data, and basic deployment. **Out**: payments, admin/trainer workflows, social sharing, mobile apps, external integrations, and advanced analytics.

**Actors**: Calin owns product, architecture, and engineering decisions; gym members are target users; the delivery team builds and operates the prototype.

**Constraints**: One schedule per user; seven cards represent days; simple email/password JWT authentication; standard personal-data protection; planned TypeScript stack.

**Assumptions**: Six tracked assumptions remain open around value measurement, schedule behavior, authentication lifecycle, exercise details, integrations, and operations.

**Next**: Execute the selected domain analysis, compliance, technical feasibility, and architecture activities, then prepare the PRD.

---

## Enrichment Log

| Date | Trigger | Change |
|------|---------|--------|
| 2026-09-07 | SP1 completion | Initial context baseline created from the confirmed Signal, Explore Bundle, and stakeholder decisions. |
| 2026-09-07 | Ideation refinement | Added the direct weekly-board editing assumption for validation in Solution Design. |

---

**Last Updated**: 2026-09-07  
**Updated By**: Calin and Explore Agent
