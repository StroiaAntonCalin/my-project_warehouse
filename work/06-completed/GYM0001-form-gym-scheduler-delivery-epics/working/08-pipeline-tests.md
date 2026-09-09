# Pipeline Test Requirements

## Smoke Tests

The epic work introduces the initial API surface, so smoke coverage is required for the local/CI baseline. Deployment smoke tests are deferred until a deployment environment exists.

| Endpoint | Method | Scenario | Expected |
|----------|--------|----------|----------|
| `/api/v1/auth/login` | POST | Seeded demo user submits valid credentials. | `200`; access token returned; refresh cookie set. |
| `/api/v1/auth/refresh` | POST | Browser presents a valid refresh cookie. | `200`; access token returned; refresh cookie rotated. |
| `/api/v1/schedules/me` | GET | Authenticated user loads their schedule. | `200`; exactly seven ordered days returned. |
| `/api/v1/schedules/me/days/1/exercises` | POST | Authenticated user adds a valid exercise. | `201`; exercise has required name and explicit order. |
| `/api/v1/auth/logout` | POST | Authenticated user logs out. | `204` or agreed success response; refresh session revoked. |

## Fuzz Tests

- **Reference Data**: Seeded users, one seven-day schedule, and representative exercises with each optional field populated and omitted.
- **Excluded Endpoints**: None; authentication and CRUD validation are in scope for negative testing.
- **Special Config**:
  - Reject missing or blank exercise names.
  - Reject invalid day/order values, duplicate or out-of-range ordering, malformed IDs, and unsupported difficulty values.
  - Reject invalid optional numeric values such as negative sets, repetitions, or rest time.
  - Verify unauthenticated requests return `401` and cross-user schedule access cannot succeed.
  - Verify invalid, expired, reused, or revoked refresh tokens cannot create a new access token.
  - Ensure error responses do not expose password hashes, refresh tokens, or signing secrets.

## Integration Tests

| Scenario | Steps | Test Data | Expected |
|----------|-------|-----------|----------|
| Login and load board | Login → retain access token in test memory → request schedule. | Seeded member and seven-day schedule. | Login succeeds and the response contains exactly seven cards owned by that user. |
| Refresh and logout | Login → refresh → verify rotation → logout → attempt refresh again. | Valid and rotated refresh cookies. | New token works; old token and post-logout token are rejected. |
| Exercise lifecycle | Login → add exercise → reload schedule → edit → reorder → delete → reload. | One target day and valid exercise payloads. | Each mutation persists through the JSON repository and only affects the target day. |
| Ownership protection | Authenticate as user A → request or mutate user B's schedule identifier if exposed. | Two seeded users and separate schedules. | Access is denied or constrained to the authenticated user's single schedule. |
| Frontend critical path | Open app → submit login → render seven cards → add/edit/remove exercise → reload. | Mock or local API with seeded data. | UI shows loading/saved/error states and remains keyboard accessible. |

## Pipeline Execution

- Pull request checks: format/lint, type-check, frontend unit tests, backend unit/integration tests, and production builds.
- Browser smoke and accessibility checks run in CI once the frontend scaffold exists.
- Coverage floors follow the approved strategy: 90% line and 85% branch, with deeper checks around auth and ownership.
- Full deployment smoke tests remain deferred until a staging or production environment is approved.

