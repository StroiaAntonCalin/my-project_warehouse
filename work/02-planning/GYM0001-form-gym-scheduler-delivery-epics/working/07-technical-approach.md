# Technical Approach

## High-Level Strategy

Deliver a local-first TypeScript workspace with a React frontend and NestJS modular monolith backend. The backend exposes `/api/v1`, owns authentication and schedule rules, and persists through a JSON repository interface. The frontend uses a typed REST client and local React state. The first implementation slice should establish the runnable workspace and authentication, followed by schedule retrieval and exercise CRUD.

## Architecture Decisions

### Modular monolith

- **Choice**: One NestJS process with Identity & Access, Schedule Management, REST API, and Repository modules.
- **Rationale**: Fastest prototype path while preserving ownership boundaries.
- **Alternative**: Separate services; deferred because there are no external integrations or scale needs.

### Prototype persistence

- **Choice**: A JSON file adapter behind repository interfaces.
- **Rationale**: Restart-visible mock data without database setup.
- **Alternative**: PostgreSQL; deferred until deployment preparation.

### Session handling

- **Choice**: Short-lived access JWT held only in frontend memory; rotating refresh token in a Secure, HttpOnly, SameSite cookie; backend owns refresh and logout.
- **Rationale**: Matches the accepted security baseline while keeping the prototype API-shaped.

### Frontend state

- **Choice**: Typed REST client with local React state for auth, schedule, forms, loading, saved, and error states.
- **Rationale**: One schedule does not need a cache library or global state framework.

## Component Changes

### Workspace and quality foundation

- [ ] Create frontend and backend TypeScript workspaces with shared scripts for install, dev, lint, type-check, test, and build.
- [ ] Add JSON seed data and repository ports/adapters.
- [ ] Configure Vitest + React Testing Library, Jest + Supertest, Playwright, and accessibility checks according to the test strategy.
- [ ] Add lean CI checks for lint, unit/integration tests, and build.

### Identity & Access

- [ ] Add seeded users with predefined roles and development-only credentials.
- [ ] Implement login, refresh, logout, access-token validation, and protected-route behavior.
- [ ] Configure local cookie/CORS behavior and never persist the access token in browser storage.

### Schedule Management

- [ ] Load the authenticated user's single schedule and enforce exactly seven ordered weekdays.
- [ ] Enforce ownership through the authenticated user identity on every schedule operation.
- [ ] Support exercise add, edit, delete, and explicit order updates.

### React application

- [ ] Build the login screen and authenticated weekly board.
- [ ] Render seven day cards with empty, loading, saved, and error states.
- [ ] Provide simple exercise forms and confirmation for destructive removal.
- [ ] Cover keyboard access, labels, responsive layout, and the agreed browser baseline.

## Data Model Changes

```text
User {
  id: string
  username: string
  passwordHash: string
  role: "member" | "admin"
}

Schedule {
  id: string
  userId: string
  days: Day[7]
}

Day {
  id: string
  dayOfWeek: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"
  order: number
  exercises: Exercise[]
}

Exercise {
  id: string
  name: string
  order: number
  muscleGroup?: string
  sets?: number
  repetitions?: number
  restTimeSeconds?: number
  difficulty?: "beginner" | "intermediate" | "advanced"
  instructions?: string
}
```

The schedule repository guarantees one schedule per user and seven days in weekday order. Exercise name is mandatory; optional fields are validated when present.

## Integration Points

| Endpoint | Purpose |
|----------|---------|
| `POST /api/v1/auth/login` | Authenticate a seeded user and return an in-memory access token while setting refresh cookie. |
| `POST /api/v1/auth/refresh` | Rotate refresh token and return a new access token. |
| `POST /api/v1/auth/logout` | Revoke the refresh session and clear the cookie. |
| `GET /api/v1/schedules/me` | Return the authenticated user's seven-day schedule. |
| `POST /api/v1/schedules/me/days/:dayOrder/exercises` | Add an exercise to a day. |
| `PATCH /api/v1/schedules/me/days/:dayOrder/exercises/:exerciseId` | Edit an exercise. |
| `DELETE /api/v1/schedules/me/days/:dayOrder/exercises/:exerciseId` | Remove an exercise. |
| `PATCH /api/v1/schedules/me/days/:dayOrder/exercises/reorder` | Persist explicit exercise ordering. |

All protected endpoints derive ownership from the authenticated identity rather than client-supplied user IDs. Errors use standard NestJS HTTP responses with field-level validation details where applicable.

## Configuration

- Local API port, frontend API base URL, JWT signing secret, refresh cookie name, and cookie flags are environment-configured.
- Development defaults are documented in `.env.example`; real secrets are not committed.
- JSON data path is configurable for tests and local development.
- Production provider, region, privacy, deployment, and durable persistence configuration remain deferred.

## Dev Hints

- Keep domain rules independent of the JSON adapter so PostgreSQL can be introduced later without changing controllers or React contracts.
- Use repository interfaces in services and DTO validation at the REST boundary.
- Write tests for the seven-day invariant, schedule ownership, refresh rotation, and required exercise name before UI polish.
- Keep the first demo path small: login → load board → add/edit/remove exercise → reload and verify JSON persistence.

