# Problem Capture — GYM0009

## Problem Statement

The chatbot account-access prototype needs a temporary access state after a deterministic username match, but normal JWT authentication must remain protected. Without a separate token type and guard, username-only convenience could accidentally become an authentication bypass for schedule routes.

The desired state is a short-lived, explicitly typed `demo_access` token issued only after a unique resolver result, accepted only by explicitly opted-in demo routes, disabled outside local development, and rejected by normal JWT guards. The business driver is to support a useful local convenience flow while preserving the existing authentication boundary.

## Stakeholders

- **Calin**: Product owner and approver of the prototype security boundary.
- **Backend engineer**: Owns token issuance, claims, signing, guard, configuration, and tests.
- **Frontend engineer**: Consumes safe access metadata without treating demo access as normal login.
- **QA/quality owner**: Verifies positive and negative token/guard behavior.
- **Prototype users**: Need temporary demo navigation without production account recovery assumptions.

## Affected Components

- [ ] Manager
- [x] Server
- [x] App
- [x] Cross-cutting

## Initial Questions

- [ ] Which signing secret/configuration should the demo token use without sharing normal JWT validation accidentally?
- [ ] How should `DemoAccessGuard` distinguish token type, issuer, audience, expiry, and feature enablement?
- [ ] Which routes, if any, explicitly accept demo access during the prototype?
- [ ] How should disabled, expired, malformed, and wrong-type tokens map to safe HTTP responses?
- [ ] How should tests control time and environment without using production secrets?

## Existing Context

- [GYM0009 task](../task.md)
- [Chatbot PRD](../../../../explore/prds/chatbot-account-access-prd.md)
- [Chatbot HLD/design](../../../../explore/hlds/chatbot-account-access-design-sketch.md)
- [Decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md), especially DEC-005, DEC-008, and DEC-009
- [Existing JWT guard](../../../../apps/api/src/auth/jwt-auth.guard.ts)
- [Existing auth service](../../../../apps/api/src/auth/auth.service.ts)
