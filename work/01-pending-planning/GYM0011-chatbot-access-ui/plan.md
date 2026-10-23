# Technical Implementation Plan

## Scope

Expose demo-access results and safe failure states in the existing React chatbot without changing normal login behavior.

## Files/modules

- `apps/web/src/` chatbot state, response rendering, accessibility.
- Shared response contracts if required.
- Component and browser tests.

## Sequence

1. Extend response state model for demo access and fallback.
2. Render warning, success, unknown, ambiguous, and provider states.
3. Ensure no password/account enumeration leakage in UI.
4. Add keyboard/focus/status semantics.
5. Add component tests and selected Playwright journeys.

## Test inventory

Loading, success, warning, unknown, ambiguous, provider fallback, keyboard interaction, accessible status, and existing login-to-schedule regression.
