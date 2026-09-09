# Architecture Context: GYM_SCHEDULER

**Slug**: `gym-scheduler`  
**Explore type**: Explore Readiness Check  
**Created**: 2026-09-07  
**Status**: VALIDATED  
**Steps completed**: Existing-document ingestion, landscape capture, driver extraction, light domain model  
**Source documents**: 7  
**Evidence coverage**: 24 OBS, 11 INF, 8 ASM

This artifact is the consolidated context for architecture solutioning. It records the confirmed prototype context and does not prescribe implementation patterns beyond the already selected technology and hosting direction.

## 1. Existing Architecture Baseline

### System overview

**Greenfield — no existing system.** No application, deployed runtime, database schema, or integration estate was identified during document ingestion. The baseline is therefore a target context for a new prototype rather than an as-is architecture.

### Component and integration inventory

| Component | Role | Current baseline | Evidence |
|---|---|---|---|
| User browser | Runs the web experience | Required runtime; browser matrix is still open | OBS |
| React frontend | Login and seven-card schedule experience | Planned | ASM |
| NestJS API | Authentication, authorization, validation, and schedule operations | Planned | ASM |
| JSON mock-data repository | Prototype users, schedules, cards, exercises, and assignments | Confirmed prototype storage | OBS |
| CI pipeline | Lint, test, and build validation | GitHub Actions planned | ASM |
| Hosting services | Frontend, backend, and database hosting | Vercel, Render, and Neon planned | ASM |

No external business, calendar, fitness-device, payment, or identity-provider integration is planned for the prototype.

### Known issues and technical debt

- No implementation exists, so there is no inherited technical debt. **[OBS]**
- Exercise fields, ordering behavior, account lifecycle details, token storage/refresh, browser support, and deployment environment configuration remain open design questions. **[INF]**
- Jurisdiction-specific legal review and public-launch operational controls are not yet available. **[ASM]**

### Existing decisions extracted

No prior ADRs or architecture decisions were found. The following decisions are recorded in the approved project context and remain inputs to solutioning:

- React + TypeScript frontend and NestJS + TypeScript backend. **[ASM]**
- JSON mock-data repository for the prototype; real PostgreSQL persistence is deferred. **[OBS]**
- Simple email/password authentication with JWT access tokens; social login, MFA, and password recovery are out of prototype scope. **[OBS]**
- Vercel frontend, Render backend, Neon PostgreSQL, and GitHub Actions are the planned platform choices. **[ASM]**
- One schedule per user and exactly seven day cards. **[OBS]**

## 2. Landscape Assessment

### Architecture-question answers

| ID | Question | Answer | Source | Evidence |
|---|---|---|---|---|
| AQ-001 | What business driver matters most? | Increase gym membership value through a useful personal scheduler. | Context, Signal | OBS |
| AQ-002 | Is there a fixed delivery timeline? | No; this is a prototype/demo. | Product-owner confirmation | OBS |
| AQ-004 | What scale is expected? | Small demo scale; no production load target. | Product-owner confirmation | OBS |
| AQ-005 | Are traffic peaks expected? | No known peaks. | Product-owner confirmation | OBS |
| AQ-006 | Are data-residency preferences defined? | No. | Product-owner confirmation | OBS |
| AQ-007 | Is strong consistency required? | No special requirement; normal confirmed-save behavior is sufficient. | Product-owner confirmation | OBS |
| AQ-008 | Are external systems required? | No. | Context, Bundle | OBS |
| AQ-009 | Are unstable integrations a risk? | No external integrations are planned. | Context, Bundle | OBS |
| AQ-010 | Is the technology direction known? | React/NestJS TypeScript, JSON mock repository for the prototype, and the selected hosting direction. | Product Owner decision | OBS |
| AQ-011 | Are regional requirements known? | No target market; use a general baseline only. | Product-owner confirmation | OBS |
| AQ-012 | What technology preference applies? | Prefer simple, proven, mainstream choices. | Product-owner confirmation | OBS |

### IT environment summary

The intended environment is a browser-based frontend calling a backend API over HTTPS. The backend owns authentication, authorization, validation, and schedule operations. The prototype uses a JSON mock-data repository behind a replaceable interface; real PostgreSQL persistence is deferred. **[OBS]**

### Maturity assessment

| Dimension | Level | Evidence |
|---|---|---|
| Architecture governance | Ad hoc and owner-led | Calin currently approves product and technical decisions. **[OBS]** |
| Technology direction | Mainstream/conservative | Selected TypeScript, React, NestJS, and a replaceable JSON mock repository for the prototype. **[OBS]** |
| Operations | Emerging | Prototype hosting is planned; operational ownership and staging remain open. **[INF]** |
| Delivery automation | Basic CI/light deployment | GitHub Actions and managed hosting are planned. **[ASM]** |
| Cloud maturity | Initial | Provider regions, environments, and agreements are not yet selected. **[INF]** |

## 3. Architecture Drivers

### Ranked driver matrix

| Rank | Driver | Type | Impact | Uncertainty | Tension with | Source | Evidence |
|---:|---|---|---|---|---|---|---|
| 1 | Protect each user’s schedule through authentication and ownership checks. | Quality/security | High | Low | Prototype simplicity | Context, Compliance | OBS |
| 2 | Keep the prototype simple to build and operate. | Constraint/quality | High | Low | Future extensibility | Product-owner confirmation, Feasibility | OBS |
| 3 | Present exactly seven editable day cards. | Functional/UX | High | Low | Responsive layout | Product-owner confirmation | OBS |
| 4 | Support reliable add, edit, remove, save, and retrieve actions for exercises. | Functional | High | Medium | Minimal data model | Context, Domain Analysis | OBS |
| 5 | Provide usable, accessible login and schedule editing. | Quality/accessibility | Medium | Medium | Demo speed | Compliance | INF |
| 6 | Persist schedule data across sessions. | Functional/reliability | High | Low | Local-only prototype shortcuts | Context, Feasibility | OBS |
| 7 | Leave a path to measure perceived membership value later. | Product/evolution | Medium | High | No analytics in prototype | Context | ASM |

### Functional drivers

**MUST**

- A user can register or log in with simple email/password authentication.
- An authenticated user can access only their own schedule.
- Each user has exactly one schedule containing exactly seven weekday cards.
- A user can view, edit, save, and retrieve card and exercise content.
- A user can add, edit, and remove exercise assignments.

**SHOULD**

- The interface should provide clear saved/error states and work on common desktop and mobile browser sizes.
- The first release should include a privacy notice, terms acceptance, and a concise fitness disclaimer.

**COULD**

- Later versions could add measurement of schedule use or perceived membership value.
- Later versions could add export, richer exercise metadata, or additional account lifecycle features.

Every MUST maps to Identity & Access or Schedule Management in the domain model below.

### Quality attributes and measurable targets

| Attribute | Target for prototype | Evidence |
|---|---|---|
| Security | Passwords use strong salted hashing; HTTPS is used; protected endpoints reject invalid/expired tokens; every schedule operation enforces ownership. | INF |
| Accessibility | Login and schedule flows are keyboard usable and meet the agreed WCAG 2.2 AA baseline; automated checks run in CI. | INF |
| Performance | Typical page load target ≤ 3 seconds and typical API response target ≤ 2 seconds under demo conditions, subject to confirmation. | ASM |
| Reliability | A confirmed save is retrievable after refresh and re-login; failed saves preserve an actionable error state. | INF |
| Maintainability | TypeScript across the application, linting, formatting, unit/API tests, and an end-to-end happy path. | ASM |
| Privacy | Collect only authentication and scheduling data; do not collect medical, payment, biometric, or precise-location data. | INF |

### PoC candidates

No separate PoC is required for the low-risk prototype. If validation is needed during solutioning, prioritize:

1. Secure browser token/session handling without `localStorage` or `sessionStorage`.
2. Responsive seven-card layout and accessible editing interactions.
3. Repository contract and future persistence seam enforcing one schedule and seven cards.

These are implementation validation topics, not unresolved business requirements. **[INF]**

## 4. Domain Model Sketch

### Bounded contexts and ownership

| Bounded context | Responsibilities | Data ownership |
|---|---|---|
| Identity & Access | Registration/login, credential verification, JWT issuance/validation, account status, authentication errors | User identity and credential metadata; session authorization context |
| Schedule Management | Schedule retrieval, seven weekday cards, exercise definitions/assignments, validation, ordering, and user-owned edits | Schedule, Schedule Card, Exercise, Exercise Assignment |

### Context map

```mermaid
graph LR
    IA[Identity & Access]
    SM[Schedule Management]
    UI[React Frontend]
    IA -->|Customer-Supplier: authenticated user identity| SM
    SM -->|Open Host Service: REST API| UI
```

Identity & Access supplies authenticated user identity to Schedule Management. Schedule Management exposes the application-facing service used by the frontend. **[INF]**

### Core aggregates and state machines

Aggregate boundaries and detailed state machines are intentionally deferred because this Explore Readiness Check uses a light domain model rather than solution-level DDD design. The confirmed transactional rules are:

- User owns exactly one Schedule.
- Schedule contains exactly seven Schedule Cards, one per weekday.
- Schedule Card contains zero or more Exercise Assignments.
- An Exercise Assignment references a valid Exercise and has a unique order within its card.
- All schedule mutations require authenticated ownership of the parent schedule.

### Glossary additions

No new glossary additions are required. The canonical terms User, Schedule, Schedule Card, Exercise, Exercise Assignment, Membership Value, and JWT are already recorded in `explore/glossary.md` and aligned with `domain-analysis.md`.

## 5. Constraints Register

| # | Constraint | Type | Classification | Source | Evidence |
|---:|---|---|---|---|---|
| 1 | Authentication is required before schedule access. | Security/product | Hard | Product-owner confirmation | OBS |
| 2 | A user has only one schedule. | Domain/product | Hard | Product-owner confirmation | OBS |
| 3 | A schedule has exactly seven day cards. | Domain/product | Hard | Product-owner confirmation | OBS |
| 4 | Users can manage only their own schedule data. | Security/privacy | Hard | Context, Compliance | INF |
| 5 | Passwords must not be stored in plaintext; HTTPS and protected token handling are required. | Regulatory/security | Hard | Compliance baseline | INF |
| 6 | Login and schedule flows must meet the prototype accessibility baseline. | Accessibility | Hard | Compliance baseline | INF |
| 7 | React/NestJS with TypeScript is the selected application stack. | Technology | Soft | Tooling decision | ASM |
| 8 | JSON mock-data repository is the selected prototype persistence approach; PostgreSQL is deferred. | Technology | Hard for prototype | Product Owner decision | OBS |
| 9 | Vercel, Render, Neon, and GitHub Actions are the planned platform choices. | Platform | Soft | Tooling decision | ASM |
| 10 | No external integrations, payments, admin workflows, or native mobile app are in prototype scope. | Scope | Hard for prototype | Product scope | OBS |

### Cross-reference validation

- All functional MUST drivers map to Identity & Access or Schedule Management.
- Every hard constraint is represented by a functional driver or quality attribute.
- Assumptions are explicitly labeled ASM and are not presented as confirmed facts.
- All captured AQ questions are answered or their remaining uncertainty is documented below.
- The greenfield baseline is consistent with the selected managed-service landscape.
- No glossary conflict was found.

## 6. Open Questions

| # | Question | Owner | Priority | Impact if unresolved | Source step |
|---:|---|---|---|---|---|
| 1 | Which exercise fields are mandatory in the prototype? | Calin | High | Form and schema may change. | Domain analysis |
| 2 | Should users reorder, duplicate, or move exercises between cards? | Calin | High | Interaction and ordering rules may change. | Domain analysis |
| 3 | Does the prototype include registration and logout, or only login with seeded users? | Calin | High | Auth flow and test setup may change. | Technical feasibility |
| 4 | What secure JWT storage and refresh strategy will be used? | Calin | High | Session security and frontend implementation depend on it. | Technical feasibility/compliance |
| 5 | Are the two-second API and three-second page targets acceptable? | Calin | Medium | Performance tests and hosting choices may change. | Technical feasibility |
| 6 | Which browsers and viewport sizes must be supported? | Calin | Medium | Test matrix and responsive effort may change. | Technical feasibility |
| 7 | Is a staging environment required before the demo? | Calin | Medium | Deployment workflow and environments may change. | Technical feasibility |
| 8 | Which metric or user signal will represent increased membership value? | Calin | Medium | Success measurement remains qualitative. | Context |
| 9 | Which target market and provider regions apply before public launch? | Calin | Medium | Legal, privacy, retention, and transfer requirements may change. | Compliance |

## Solutioning Readiness Summary

### Inputs available for B.1 Context & Design Direction

- [x] Greenfield existing-architecture baseline
- [x] Landscape assessment with AQ answers and maturity
- [x] Ranked architecture drivers and measurable quality targets
- [x] Light bounded-context/domain model
- [x] Consolidated constraints register
- [x] Open questions and risks carried forward

### Highest-priority solutioning inputs

1. Enforce authenticated ownership for every schedule operation.
2. Preserve the one-schedule/exactly-seven-card invariant.
3. Keep the implementation and deployment simple for a prototype.
4. Make exercise editing reliable, responsive, and accessible.
5. Protect credentials, tokens, and personal schedule data.

### Risks carried forward

- Exercise fields and editing semantics are not fully defined. **[INF]**
- JWT storage/refresh and account lifecycle are open implementation decisions. **[INF]**
- Performance targets, browser matrix, staging needs, and provider regions are not confirmed. **[ASM]**
- Jurisdiction-specific compliance remains required before any public launch. **[ASM]**

**Last Updated**: 2026-09-07  
**Reviewed By**: Calin — Product Owner, Architect, and Lead Engineer
