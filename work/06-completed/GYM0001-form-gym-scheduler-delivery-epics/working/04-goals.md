# Goals and Constraints

## Measurable Goals

- [ ] A demo user can log in successfully with seeded credentials and receive an authenticated session.
- [ ] An authenticated user can load exactly one weekly schedule containing exactly seven day cards.
- [ ] The user can create, edit, reorder, and remove exercises on each day; exercise name is required.
- [ ] The frontend and backend run locally with JSON mock storage and documented commands.
- [ ] Automated tests cover the critical login, schedule ownership, seven-day invariant, and exercise CRUD paths.
- [ ] The prototype passes the agreed local lint, type-check, test, and build checks.

## Constraints

- **Timeline**: No fixed deadline; optimize for the fastest useful demo.
- **Resources**: Prototype scope and a small implementation effort; avoid unnecessary infrastructure.
- **Technical**: React + TypeScript frontend, NestJS + TypeScript backend, `/api/v1` API prefix, JSON file repository, no MongoDB or PostgreSQL runtime.
- **Compatibility**: Latest major Chrome, Edge, Firefox, and Safari.
- **Authentication**: Seeded users only; short-lived in-memory access tokens and rotating refresh tokens in Secure, HttpOnly, SameSite cookies.
- **Compliance**: No production deployment in this task; deployment provider, region, privacy, and persistence decisions remain deferred.

## Non-Goals

- Registration, email verification, password recovery, or social login.
- Production database integration, migrations, cloud hosting, staging, or production deployment.
- Multiple schedules per user, shared schedules, coach/admin schedule management, or collaboration.
- Mobile-native applications, notifications, payments, memberships, or gym integrations.
- Advanced workout analytics or completion tracking beyond documenting the future membership-value metric.
- Event bus, distributed services, concurrency guarantees, or production-scale observability.

## Assumptions

| Assumption | Risk | Validation |
|------------|------|------------|
| A JSON repository is sufficient for a single-process demo. | Medium | Exercise the core flows locally and document the migration boundary. |
| Seeded demo credentials are acceptable because registration is out of scope. | Low | Include credentials in local setup documentation without committing secrets. |
| One schedule always contains seven fixed weekdays. | Low | Enforce the invariant in the domain/service tests. |
| Optional exercise fields can use simple prototype validation ranges. | Medium | Confirm validation behavior in API tests and refine if product feedback requires it. |
| In-memory access tokens plus cookie refresh are adequate for the local prototype. | Medium | Verify login, refresh, logout, and unauthorized behavior in integration tests. |
| No concurrent writes need to be supported locally. | Medium | Record the limitation and defer durable persistence design before deployment. |

