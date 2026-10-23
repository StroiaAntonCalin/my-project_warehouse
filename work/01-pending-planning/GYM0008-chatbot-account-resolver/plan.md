# Technical Implementation Plan

## Scope

Add a backend Account Resolver module/service for exact username lookup against the JSON repository.

## Files/modules

- `apps/api/src/chat/` resolver and DTOs.
- JSON repository read interface.
- Resolver unit and API integration tests.

## Sequence

1. Inspect account record shape and repository interface.
2. Define structured match statuses.
3. Implement safe projection without credentials.
4. Add success, unknown, duplicate, and malformed tests.
5. Run API typecheck, lint, and tests.

## Test inventory

Known unique user, normalized input, unknown user, duplicate user, empty input, unreadable repository, and password-field redaction.
