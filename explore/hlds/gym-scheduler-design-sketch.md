# Design Sketch: GYM_SCHEDULER

**Date**: 2026-09-09  
**Status**: Direction Approved  
**Iteration**: 1  
**Architect**: Calin  
**Slug**: `gym-scheduler`

---

## 1. Service Boundary

**Proposed boundary**: A simple modular-monolith application containing identity and access, weekly schedule management, REST orchestration, React presentation, and a JSON-backed prototype repository.

**Justification**: The approved ownership matrix has two domain capabilities, Identity & Access and Schedule Management, with a React client and Mock Repository. A single local deployment is the fastest implementation path and avoids unnecessary distributed-system complexity. [VALIDATED]

**Includes**:
- Seeded demo-user login, access-token handling, refresh, and logout — [VALIDATED]
- One user-owned weekly schedule with exactly seven ordered weekday cards — [VALIDATED]
- Exercise create, edit, reorder, and delete operations — [VALIDATED]
- React login and schedule-board experience — [VALIDATED]
- JSON mock data behind a backend repository interface — [VALIDATED]
- Versioned REST API under `/api/v1` — [VALIDATED]

**Excludes**:
- Registration, password recovery, and external identity providers — owned by deferred Identity & Access capabilities
- Payments, memberships, gym administration, calendars, notifications, and device integrations — outside the approved product boundary
- Production hosting, provider accounts, and compliance configuration — owned by future Hosting and CI work
- Real database persistence — deferred; PostgreSQL may replace the repository later

**Negative boundary statements**:
- Identity & Access does not own schedules, exercises, or workout content.
- Schedule Management does not own passwords, refresh tokens, or credential issuance.
- React does not access the JSON file directly.
- The Mock Repository does not authenticate users or decide product rules.
- Hosting and CI do not own domain data or requirements.

---

## 2. Module Map

| # | Module | Responsibility | Owns | Consumes | Produces | Evidence |
|---|---|---|---|---|---|---|
| 1 | Identity & Access | Demo login, JWT access tokens, refresh, and logout | Authentication state and roles | Credentials and refresh cookie | Authenticated user context | [VALIDATED] |
| 2 | Schedule Management | Enforce one schedule, seven days, exercise rules, and ordering | Schedule, days, and exercises | Authenticated user context and commands | Validated schedule results | [VALIDATED] |
| 3 | Mock Repository | Read and write prototype JSON records | Users, sessions, schedules, exercises | Validated backend operations | Persisted mock-data state | [VALIDATED] |
| 4 | REST API | Route requests and serialize responses | HTTP contracts and `/api/v1` routing | Frontend requests and module results | JSON API responses | [ASSUMPTION] |
| 5 | React Frontend | Login, navigation, forms, and accessible schedule editing | UI and form state | REST responses and auth outcomes | User commands | [VALIDATED] |

**Negative boundaries by module**:

- Identity & Access does not modify schedule content.
- Schedule Management does not issue credentials or manage refresh cookies.
- Mock Repository does not bypass domain validation.
- REST API does not contain persistence logic or frontend presentation logic.
- React Frontend does not implement authentication policy or direct file access.

---

## 3. Runtime Trigger

- **What initiates the process**: The user submits the login form; after authentication, the client requests the user’s weekly schedule and renders seven day cards.
- **Source**: React Frontend.
- **Evidence**: [VALIDATED]

---

## 4. Data Model Sketch

### Entities

| # | Entity | Key Fields | Source of Truth | Relationship | Evidence |
|---|---|---|---|---|---|
| 1 | User | `id`, `username`, `passwordHash`, `role` | Mock Repository for prototype | Owns one schedule | [VALIDATED] |
| 2 | Weekly Schedule | `id`, `userId`, `days[7]` | Schedule Management | Belongs to one user | [VALIDATED] |
| 3 | Schedule Day | `id`, `scheduleId`, `weekday`, `order`, `title`, `exercises[]` | Schedule Management | Exactly seven per schedule | [VALIDATED] |
| 4 | Exercise | `id`, `dayId`, `name`, optional fields, `order` | Schedule Management | Belongs to one day | [VALIDATED] |
| 5 | Refresh Session | `id`, `userId`, `tokenHash`, `expiresAt`, `revokedAt` | Identity & Access | Supports refresh and logout | [VALIDATED] |

### Authoritative Data Sources

| # | Input | Source | Authority Level | Contract Status | Evidence |
|---|---|---|---|---|---|
| 1 | Seeded users and roles | JSON mock data | Canonical for prototype | Needs creation | [VALIDATED] |
| 2 | Schedule and seven-day rule | PRD and domain model | Canonical | Approved | [VALIDATED] |
| 3 | Exercise validation rules | Product decision and PRD | Canonical | Approved | [VALIDATED] |
| 4 | Prototype persistence behavior | DEC-003 and boundary map | Canonical for prototype | Needs creation | [VALIDATED] |
| 5 | Authentication behavior | DEC-004 and boundary map | Canonical | Needs creation | [VALIDATED] |

---

## 5. Event Map

No event bus or asynchronous domain events are required for the prototype. Synchronous REST calls are sufficient. [VALIDATED]

| # | Event | Direction | Owner | Consumer(s) | Schema Status | Evidence |
|---|---|---|---|---|---|---|
| — | None | — | — | — | Not applicable | [VALIDATED] |

---

## 6. API Contracts

| # | API | Direction | Purpose | Contract Status | Evidence |
|---|---|---|---|---|---|
| 1 | `POST /api/v1/auth/login` | Downstream to backend | Authenticate seeded user | Needs creation | [VALIDATED] |
| 2 | `POST /api/v1/auth/refresh` | Downstream to backend | Rotate refresh token and issue access token | Needs creation | [VALIDATED] |
| 3 | `POST /api/v1/auth/logout` | Downstream to backend | Revoke refresh session | Needs creation | [VALIDATED] |
| 4 | `GET /api/v1/me` | Downstream to backend | Return authenticated user | Needs creation | [VALIDATED] |
| 5 | `GET /api/v1/schedule` | Downstream to backend | Load one weekly schedule | Needs creation | [VALIDATED] |
| 6 | `PUT /api/v1/schedule/days/:dayId` | Downstream to backend | Update a weekday card | Needs creation | [VALIDATED] |
| 7 | `POST /api/v1/schedule/days/:dayId/exercises` | Downstream to backend | Add an exercise | Needs creation | [VALIDATED] |
| 8 | `PUT /api/v1/schedule/days/:dayId/exercises/:exerciseId` | Downstream to backend | Edit an exercise | Needs creation | [VALIDATED] |
| 9 | `DELETE /api/v1/schedule/days/:dayId/exercises/:exerciseId` | Downstream to backend | Remove an exercise | Needs creation | [VALIDATED] |

---

## 7. Quality Attribute Constraints

| # | Quality Attribute | Target | Architecture Response | Tradeoff | Evidence |
|---|---|---|---|---|---|
| 1 | Security | Protected schedule routes; secure refresh cookie | NestJS guards, in-memory access token, rotating Secure/HttpOnly/SameSite refresh cookie | No production identity provider | [VALIDATED] |
| 2 | Correctness | Exactly one schedule and seven days per user | Domain validation and repository checks | JSON storage is single-process | [VALIDATED] |
| 3 | Accessibility | Keyboard-friendly controls, labels, focus, and errors | Semantic React controls and accessible validation | Intentionally simple visual system | [VALIDATED] |
| 4 | Maintainability | Replace prototype persistence without changing domain services | Repository interface isolates JSON storage | Small abstraction overhead | [VALIDATED] |
| 5 | Performance | Local interactions immediate; normal API response under 500 ms | Small dataset and modular monolith | Not designed for multiple instances | [ASSUMPTION] |

---

## 8. Architectural Decision Points

### Decision 1: Backend structure

| Option | Description | Pros | Cons | NFR Impact | Evidence |
|---|---|---|---|---|---|
| A | NestJS modular monolith | Fast, simple, clear boundaries | One deployable unit | Strong prototype simplicity and maintainability | [VALIDATED] |
| B | Separate auth and schedule services | Strong isolation | More setup and integration | Higher operational complexity | [ASSUMPTION] |
| C | Backend-for-frontend only | Minimal code | Weaker domain separation | Faster start, lower maintainability | [ASSUMPTION] |

**Agent recommendation**: A.  
**Architect selection**: A — approved.

### Decision 2: Prototype storage

| Option | Description | Pros | Cons | NFR Impact | Evidence |
|---|---|---|---|---|---|
| A | JSON repository behind an interface | Fastest and future-replaceable | Single-process, non-production persistence | Strong prototype speed; limited scalability | [VALIDATED] |
| B | PostgreSQL now | Production-like persistence | Setup and operational overhead | Better durability, slower prototype | [ASSUMPTION] |
| C | In-memory only | Fastest coding | Data disappears on restart | Lowest durability | [ASSUMPTION] |

**Agent recommendation**: A.  
**Architect selection**: A — approved.

### Decision 3: Frontend data access

| Option | Description | Pros | Cons | NFR Impact | Evidence |
|---|---|---|---|---|---|
| A | Typed REST client with local React state | Explicit and simple | Some request-state code | Strong simplicity and testability | [VALIDATED] |
| B | TanStack Query | Strong caching and request lifecycle | Extra dependency and concepts | Better request ergonomics, more complexity | [ASSUMPTION] |
| C | Frontend-only mock data | Fast visual work | Bypasses backend integration | Fastest UI, poor integration confidence | [ASSUMPTION] |

**Agent recommendation**: A.  
**Architect selection**: A — approved.

### Decision 4: Authentication implementation

| Option | Description | Pros | Cons | NFR Impact | Evidence |
|---|---|---|---|---|---|
| A | In-memory JWT access token plus rotating HttpOnly refresh cookie | Matches approved security direction | Requires refresh flow | Better security for prototype | [VALIDATED] |
| B | Long-lived local-storage token | Simple | Weaker security | Faster, higher security risk | [ASSUMPTION] |
| C | Server-side session cookie only | Simple browser model | Less aligned with approved API direction | Good simplicity, different contract | [ASSUMPTION] |

**Agent recommendation**: A.  
**Architect selection**: A — approved.

---

## 9. Open Questions

| # | Question | Source Step | Impact | Blocking? | Proposed Resolution |
|---|---|---|---|---|---|
| 1 | Which production hosting/provider accounts will be used? | Step 7 | Deployment and public-launch compliance | No for prototype | Decide before deployment |
| 2 | When should PostgreSQL replace JSON storage? | Step 7 | Future persistence work | No | Create a later integration initiative |
| 3 | Should JSON writes support multiple backend processes? | Step 7 | Prototype concurrency | No | Keep single-process limitation explicit |
| 4 | Which demo credentials should be displayed to users? | Step 7 | Login usability | No | Document seeded credentials locally |

---

## 10. Assumptions Register

| # | Assumption | Source Step | Evidence Level | Risk if Wrong |
|---|---|---|---|---|
| 1 | Prototype runs as one local backend process | Step 7 | ASSUMED | Concurrent writes unsupported |
| 2 | One user owns exactly one weekly schedule | Steps 1–3 | INFERRED | Core APIs need redesign if changed |
| 3 | Every schedule contains exactly seven days | Steps 1–3 | INFERRED | Invalid data must be rejected |
| 4 | Same-origin or configured local CORS is available | Step 7 | ASSUMED | Frontend requests may fail |
| 5 | Roles are limited to seeded demo roles | Steps 1–3 | INFERRED | Registration/admin work expands scope |
| 6 | Exercise name is required; other fields are optional and validated when provided | Steps 1–3 | INFERRED | Form/API validation must align |
| 7 | No event bus is required | Step 4 | INFERRED | Future integrations may need one |

---

## 11. Evaluation Criteria Log

| Date | Type | Change | Impact |
|---|---|---|---|
| 2026-09-09 | Context Injection | Prototype storage changed from database planning to JSON mock repository | Replaced database runtime assumptions with repository seam and single-process limitation |
| 2026-09-09 | Content Correction | Architect confirmed all four Option A decisions | Locked modular monolith, JSON repository, typed REST client, and secure JWT/cookie auth |

---

## 12. Enrichment Log

| Date | Change | Source | Updated By |
|---|---|---|---|
| 2026-09-09 | Design sketch assembled from approved boundary map, PRD, domain model, and decisions | Design Sketch workflow | Explore Agent / Calin |

---

## 13. Document History

| Version | Date | Author | Changes |
|---|---|---|---|
| 0.1 | 2026-09-09 | Explore Agent | Initial design sketch; direction approved |
