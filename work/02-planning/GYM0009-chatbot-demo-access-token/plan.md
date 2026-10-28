# Technical Implementation Plan

## Scope

Define and implement the [DEC-008](../../../explore/hlds/chatbot-account-access-decision-log.md#dec-008---isolated-demo_access-token-contract) isolated `demo_access` token contract, issuance path, expiry, and guard behavior, plus the [DEC-009](../../../explore/hlds/chatbot-account-access-decision-log.md#dec-009---local-only-feature-enablement) local-only gate.

## Files/modules

- `apps/api/src/auth/` token claims and guard boundary.
- Chat access orchestration integration.
- Auth and negative authorization tests.

## Sequence

1. Define the DEC-008 claims, expiry, issuer/audience, and DEC-009 local feature guard.
2. Restrict issuance to successful Account Resolver results.
3. Ensure normal JWT guards reject demo tokens where required.
4. Add expired/malformed/missing token tests.
5. Document local-only enablement.

## Test inventory

Successful issuance, unknown-user rejection, duplicate-user rejection, expiry, malformed claims, normal JWT rejection, non-development disablement, and feature-disabled behavior.
