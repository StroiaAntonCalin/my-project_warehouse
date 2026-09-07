# GYM_SCHEDULER Tooling

## Application Stack

| Area | Choice | Version requirement |
|------|--------|---------------------|
| Frontend | React with TypeScript | Use the current project-supported stable versions |
| Backend | NestJS with TypeScript | Use the current project-supported stable versions |
| Database | PostgreSQL | Use a currently supported major version |
| ORM and migrations | Prisma | Keep the CLI and generated client versions aligned |

## Testing and Quality

- Frontend unit and component tests: Vitest with React Testing Library
- Backend unit and integration tests: Jest with NestJS testing utilities and Supertest
- End-to-end browser tests: Playwright, added when the first end-to-end user journeys are specified
- Shared quality tooling: ESLint and Prettier

## Hosting and Delivery

- Frontend: Vercel
- Backend: Render, deployed as a Dockerized NestJS service
- Database: Neon PostgreSQL
- Source control and CI: GitHub with GitHub Actions for linting, tests, and build verification

## Explicit Exclusions

- No additional runtime dependencies should be added without documenting the reason in the relevant Explore or Govern artifact.
- The initial release does not require a native mobile application or a separate microservice architecture.
