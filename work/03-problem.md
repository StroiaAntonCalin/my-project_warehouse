# Problem Capture — GYM0012

## Problem Statement

The chatbot account-access capability combines deterministic account resolution, credential-free RAG, a separate `demo_access` token, local-only enablement, and an AI-provider fallback. These boundaries are security-sensitive and can regress independently of the user interface. The project currently needs automated unit, API integration, and end-to-end coverage before implementation tasks are promoted.

Success means the test suite proves safe behavior for successful, unknown, ambiguous, malformed, provider-failure, prompt-injection, token-isolation, feature-disabled, and existing-login journeys. The business driver is protecting the local prototype from credential leakage, incorrect account selection, and accidental normal-JWT bypass while keeping the existing scheduler usable.

## Stakeholders

- **Calin**: Product owner and approver of scope, safety boundary, and acceptance.
- **Backend engineer**: Owns resolver, orchestration, token guard, fallback, and API behavior.
- **Frontend engineer**: Owns chatbot access-state presentation and login/schedule navigation regression.
- **QA/quality owner**: Owns coverage inventory, test execution, and release evidence.
- **Prototype users**: Need predictable chatbot responses without exposure of credentials or unrelated accounts.

## Affected Components

- [ ] Manager
- [x] Server
- [x] App
- [x] Cross-cutting

## Initial Questions

- [ ] Which existing test commands and fixtures are canonical for API, frontend, and E2E execution?
- [ ] How should OpenAI calls be stubbed so tests are deterministic and never require a live API key?
- [ ] Which existing login-to-schedule journey is the minimum regression baseline?
- [ ] What evidence format should record the prototype coverage floors and security-negative cases?

## Existing Context

- [Chatbot account-access task](../work/02-planning/GYM0012-chatbot-access-quality-tests/task.md)
- [Chatbot test strategy](../explore/explore-chatbot-account-access/test-strategy.md)
- [Chatbot PRD](../explore/prds/chatbot-account-access-prd.md)
- [Decision log](../explore/hlds/chatbot-account-access-decision-log.md), especially DEC-008 through DEC-012
- [Chatbot account-access epic](../explore/epics/EPIC-GYM-005-chatbot-account-access.md)
