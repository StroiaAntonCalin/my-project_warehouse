# Goals and Constraints

## Measurable Goals

- [ ] A clean checkout installs dependencies and starts the frontend and backend with documented local commands.
- [ ] The backend responds from a versioned `/api/v1` health endpoint.
- [ ] JSON seed data loads through repository interfaces and contains one valid seven-day schedule.
- [ ] Shared User, Schedule, Day, and Exercise contracts are importable by feature modules.
- [ ] Lint, type-check, unit test, integration test, and build commands run successfully without a database.
- [ ] The workspace provides a clear seam for later feature tasks without implementing feature behavior prematurely.

## Constraints

- **Timeline**: Optimize for the fastest useful foundation; no fixed deadline.
- **Resources**: Prototype effort; keep dependencies and infrastructure minimal.
- **Technical**: React + TypeScript frontend, NestJS + TypeScript backend, JSON file storage, `/api/v1` prefix, one local backend process.
- **Testing**: Use the approved Vitest/RTL and Jest/Supertest baseline; browser E2E can be scaffolded or deferred until the UI exists.
- **Compatibility**: Support the latest major Chrome, Edge, Firefox, and Safari through the agreed frontend tooling.
- **Compliance**: No production deployment or production provider configuration in this task.

## Non-Goals

- Authentication, JWTs, refresh cookies, registration, or authorization guards.
- Schedule board UI, exercise forms, exercise CRUD endpoints, or workout completion tracking.
- MongoDB, PostgreSQL, migrations, cloud hosting, staging, or production configuration.
- Event bus, distributed services, advanced observability, or performance/load testing.

## Assumptions

| Assumption | Risk | Validation |
|------------|------|------------|
| A simple workspace with separate frontend and backend packages is sufficient. | Low | Install and run both packages from a clean checkout. |
| JSON seed data can model the future domain before feature services exist. | Low | Parse the file and validate the seven-day fixture in tests. |
| A health endpoint is enough to prove the NestJS process is running at this stage. | Low | Exercise it with an integration test. |
| Shared TypeScript contracts can live in a small shared package or backend-exported module. | Medium | Confirm feature tasks can import them without circular dependencies. |
| Local development does not require external services. | Low | Run all checks with network and database dependencies disabled after install. |

