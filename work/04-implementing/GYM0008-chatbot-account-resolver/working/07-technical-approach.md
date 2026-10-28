# Technical Approach

## High-Level Strategy

Implement a small backend `AccountResolver` service that reads local account records through `JsonRepository`, normalizes and validates the requested username, counts exact matches, and returns a credential-free typed resolution. The resolver runs before RAG/AI and before any demo-access issuance.

## Architecture Decisions

### Deterministic backend ownership

- **Choice**: Account selection is made only by the resolver, never by the AI agent or frontend.
- **Rationale**: Prevents prompt injection and model-generated authorization decisions.
- **Alternative rejected**: Letting the model infer the account from retrieved text.

### Result contract

- **Choice**: Return a discriminated union:
  - `unique`: `{ status, userId, username }`
  - `unknown`: `{ status, username }`
  - `ambiguous`: `{ status, username }`
- **Rationale**: Callers can require `unique` explicitly before passing the result to GYM0009.
- **Alternative rejected**: Throwing for normal lookup misses, which would conflate expected user input with infrastructure failures.

### Matching and validation

- **Choice**: Trim input, lowercase it for comparison, require a simple valid email-shaped username, and compare against all repository users using normalized usernames.
- **Rationale**: Supports predictable case/whitespace tolerance while detecting duplicates.
- **Alternative rejected**: Partial, fuzzy, display-name, or AI-assisted matching.

### Credential boundary

- **Choice**: Project only `userId` and `username`; never return the User object or password field.
- **Rationale**: The result is safe for orchestration and token issuance.
- **Alternative rejected**: Returning role/password-bearing records and relying on downstream redaction.

## Component Changes

### `apps/api/src/chat/account-resolver.ts`

- [ ] Add injectable resolver and exported result types.
- [ ] Validate and normalize username input.
- [ ] Read repository snapshot and count normalized exact matches.
- [ ] Return safe unique/unknown/ambiguous results.

### `apps/api/src/repository/json.repository.ts`

- [ ] Reuse the existing read-only snapshot boundary; do not alter persistence or login behavior.
- [ ] Add a narrow lookup method only if needed to avoid exposing full records to callers.

### Chat orchestration and access boundaries

- [ ] GYM0010 consumes the resolver result before retrieval/AI.
- [ ] GYM0009 receives only the `unique` projection before issuing `demo_access`.
- [ ] No normal JWT, schedule guard, or frontend authorization behavior changes in this task.

## Data Model Changes

No persisted schema changes. Add only a TypeScript discriminated-union result:

```ts
type AccountResolution =
  | { status: 'unique'; userId: string; username: string }
  | { status: 'unknown'; username: string }
  | { status: 'ambiguous'; username: string };
```

## Integration Points

```text
chat request -> extract candidate username -> AccountResolver
             -> unique: safe projection -> RAG / DemoAccessService
             -> unknown or ambiguous: safe non-authorizing response
```

No new public endpoint is required in GYM0008. Any future access endpoint must reject non-unique results and use the existing dedicated demo guard.

## Error Handling

- Empty input: return `unknown` or a validation result without account selection.
- Malformed input: return `unknown` without querying fuzzy alternatives.
- No match: return `unknown`.
- Multiple normalized matches: return `ambiguous`.
- Repository read failure: propagate an internal error to the service boundary; do not convert infrastructure failure into a false account match.

## Configuration

No new environment variables. The resolver uses the already configured local JSON repository and is available in test and development environments. Demo enablement remains owned by GYM0009.

## Dev Hints

- Use `JsonRepository.snapshot()` or a narrow repository method; never mutate data during resolution.
- Keep duplicate fixtures in memory and do not call repository persistence from tests.
- Test casing, surrounding whitespace, empty strings, malformed email shapes, unknown users, duplicates, and credential absence.
- Run `npm.cmd test --workspace @gym-scheduler/api`, `npm.cmd run typecheck --workspace @gym-scheduler/api`, and lint before handoff.
