# Domain Profile: Personal Gym Workout Scheduling

**Domain**: Personal gym workout scheduling  
**Industry vertical**: Fitness/wellness  
**Created**: 2026-09-07  
**Status**: Draft — awaiting domain-profile approval  
**Source**: Confirmed Domain Onboarding interview and approved Explore artifacts

## Domain Overview

This domain supports individual gym members who want to organize and maintain planned exercises across a weekly schedule. The current product scope is a simple authenticated web prototype with one schedule per user and exactly seven weekday cards. **[OBS: approved interview/context]**

## Domain Vocabulary

| Term | Definition in this domain | Context-specific note | Evidence |
|---|---|---|---|
| User | Authenticated gym member who owns schedule data. | Not a trainer or administrator in the prototype. | OBS |
| Schedule | A user’s single weekly training plan. | One per User. | OBS |
| Schedule Card | One daily section in a Schedule. | Exactly seven, Monday through Sunday. | OBS |
| Exercise | Reusable information about a physical activity. | Name required initially; richer details optional. | OBS |
| Exercise Assignment | An Exercise placed on a specific Schedule Card. | Placement matters; this is not the Exercise definition itself. | OBS |
| Membership Value | Perceived usefulness or benefit of the gym membership. | Product outcome, not a stored domain object initially. | OBS |
| JWT | Access token used to authorize protected API requests. | Authentication implementation term, not a user-facing label. | OBS |
| Weekday | Fixed day reference used by the seven cards. | Monday–Sunday order is the canonical presentation. | OBS |

### Ambiguous terms

- **Schedule** may mean a single weekly plan here; future products might use multiple plans. Treat the one-schedule rule as engagement-specific. **[ASM]**
- **Exercise** means the reusable activity definition, while **Exercise Assignment** means its placement and workout details. **[OBS]**
- **Membership Value** is currently perceived usefulness and has no agreed quantitative business definition. **[ASM]**

## Core Business Process

1. A gym member authenticates.
2. The system loads the member’s single Schedule with seven Schedule Cards.
3. The member adds, edits, or removes Exercise Assignments on a card.
4. The member explicitly saves changes.
5. The system validates ownership and persists the confirmed result.
6. The member returns later and retrieves the saved Schedule.

The process is personal, synchronous from the user’s perspective, and does not require sharing, trainer approval, or external integrations. **[OBS]**

## Bounded Contexts / Sub-domains

| Context | Responsibility | Owned information | Evidence |
|---|---|---|---|
| Identity & Access | Registration/login, credential verification, session authorization, account status. | User identity and credential metadata. | OBS |
| Schedule Management | Schedule retrieval, seven cards, exercises, assignments, validation, ordering, and user-owned edits. | Schedule, Schedule Card, Exercise, Exercise Assignment. | OBS |

## Regulatory Landscape

No target market is selected and no jurisdiction-specific legal conclusion is made. The general baseline is:

- Minimize data collection and avoid medical, biometric, location, payment, or unnecessary profile data. **[OBS]**
- Use strong salted password hashing, HTTPS, protected token handling, and ownership checks. **[OBS]**
- Target WCAG 2.2 AA for login and schedule interactions. **[OBS]**
- Review target-market privacy, retention, transfer, accessibility, and breach requirements before public launch. **[ASM]**

No healthcare, payment, or other industry-specific regulation is currently applicable to the prototype scope. **[OBS]**

## Known Constraints

### Technical

- React + TypeScript frontend, NestJS + TypeScript backend, and JSON mock-data persistence for the prototype. Real database persistence is deferred. **[OBS]**
- REST/JSON over HTTPS; no external runtime integrations. **[OBS]**
- One schedule per user and exactly seven weekday cards. **[OBS]**
- Explicit Save is preferred over autosave synchronization. **[INF]**

### Organizational

- Calin currently owns product, architecture, and engineering decisions. **[OBS]**
- Managed hosting and mainstream technologies are preferred for simplicity. **[OBS]**
- Product changes require Product Owner approval. **[OBS]**

### Regulatory

- Protect credentials and tokens; enforce least privilege and schedule ownership. **[OBS]**
- Provide accessible keyboard, focus, labels, errors, and status feedback. **[OBS]**
- Complete jurisdiction-specific review before public launch. **[ASM]**

### Timeline and budget

- No fixed deadline; this is a prototype/demo. **[OBS]**
- Budget is not defined. **[ASM]**

## Common Architectural Patterns

| Pattern | When to use | When not to use | Domain guidance |
|---|---|---|---|
| Modular monolith | Small product with two related contexts and one delivery unit. | When independent scaling or team ownership becomes necessary. | Preferred prototype direction. **[INF]** |
| Layered REST API | Browser client needs simple authenticated CRUD-style operations. | When low-latency streaming or complex event choreography is central. | Appropriate for current flows. **[INF]** |
| Single relational source of record | Schedule invariants and confirmed saves matter more than independent service scaling. | When autonomous bounded contexts need separate scaling or deployment. | Preferred for current scope. **[INF]** |
| Event sourcing/CQRS | Auditable history or independent read/write scaling is a primary requirement. | When the domain is small and current state is sufficient. | Avoid initially; adds complexity without evidence. **[INF]** |
| Microservices | Multiple teams or contexts need independent deployment and scaling. | Small prototype with no external integrations or scale pressure. | Avoid initially. **[INF]** |

## Authority Patterns

These are engagement guidance, not universal mandates:

| Decision/data | Authoritative source | Guidance | Evidence |
|---|---|---|---|
| User identity and credential state | Identity & Access persistence | Schedule operations consume authenticated identity; they do not redefine credentials. | OBS |
| Schedule and assignment state | Schedule Management repository | API/repository state is authoritative after confirmed Save; JSON is prototype-only. | OBS |
| Weekday definitions | Application/domain constants | Use a fixed canonical order. | OBS |
| Product scope and acceptance | Calin as Product Owner | Resolve business ambiguity through explicit approval. | OBS |
| Security/compliance baseline | Approved compliance artifact and Calin | Do not weaken hard security or accessibility constraints for convenience. | OBS |

## Quality Priorities

1. **Security** — protect accounts and prevent cross-user schedule access.
2. **Maintainability** — keep the prototype understandable and easy to change.
3. **Usability/accessibility** — make the core flow clear and keyboard usable.
4. **Reliability** — ensure confirmed saves persist and failures are recoverable.
5. **Cost simplicity** — use a small managed-service footprint appropriate to demo scale.

These priorities are confirmed for the current engagement and should be reassessed if the product moves toward public scale. **[OBS]**

## Domain-Specific Hardening Items

- Verify the one User → one Schedule invariant at API and persistence boundaries.
- Verify each Schedule contains exactly seven weekday cards.
- Verify every Schedule Card mutation is scoped to the authenticated owner.
- Verify Exercise Assignment references are valid and ordering is deterministic.
- Verify confirmed Save → refresh/re-login returns the same schedule state.
- Verify removal confirmation and recoverable save failures.
- Verify no medical or other out-of-scope sensitive data is introduced through exercise fields.
- Verify keyboard and screen-reader access to the full Login → Schedule → Save flow.

## Open Items

| Item | Owner | Resolution point | Evidence |
|---|---|---|---|
| Exact exercise fields and ordering behavior | Calin | PRD/implementation decision | INF |
| Secure JWT storage and refresh strategy | Calin / Delivery team | Before implementation | INF |
| Target market and provider regions | Calin | Before public launch | ASM |
| Quantitative definition of Membership Value | Calin | Before product evaluation | ASM |

**Last Updated**: 2026-09-07  
**Prepared By**: Explore Agent
