# Problem Capture — GYM0011

## Problem Statement

The React chatbot needs to present the new local demo-access workflow clearly and safely. Without dedicated UI behavior, users may not understand whether access is normal authentication, may not see why an account request was rejected, and may lose context when the provider falls back to deterministic local responses. The desired state is a responsive, keyboard-accessible chatbot experience that renders success, rejection, ambiguity, provider failure, and demo-only warning states without exposing credentials or changing the existing login/schedule flow.

The business driver is making the prototype convenience feature understandable and safe for every user while preserving the existing scheduler experience.

## Stakeholders

- **Calin**: Product owner and approver of UI scope and demo wording.
- **Frontend engineer**: Owns React state, rendering, focus, keyboard, and API integration.
- **Backend engineer**: Provides typed chatbot response and demo-access metadata contracts.
- **QA/quality owner**: Verifies browser, accessibility, and regression journeys.
- **Prototype users**: Need clear feedback without accidental production-authentication assumptions.

## Affected Components

- [ ] Manager
- [ ] Server
- [x] App
- [x] Cross-cutting

## Initial Questions

- [ ] Which existing chatbot component and API client should own the new response states?
- [ ] What exact response fields distinguish success, rejection, fallback, and access-issued states?
- [ ] Which semantic selectors and status announcements are already used by the frontend?
- [ ] How should the UI behave when access is disabled outside development?

## Existing Context

- [Chatbot UI task](../task.md)
- [Chatbot PRD](../../../../explore/prds/chatbot-account-access-prd.md)
- [Chatbot test strategy](../../../../explore/explore-chatbot-account-access/test-strategy.md)
- [Decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md), especially DEC-009, DEC-010, and DEC-012
- [Existing accessibility guidance](../../../../explore/design/accessibility-gym-scheduler.md)
