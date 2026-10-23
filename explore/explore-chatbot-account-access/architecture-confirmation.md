---
domain: GYM_SCHEDULER
source: ../hlds/chatbot-account-access-design-sketch.md
validated_by: Calin
explore_type: Fast Lane
evidence_label: OBS
---

# Architecture Confirmation: Chatbot Account Access

- Date: 2026-10-22
- Status: Confirmed for prototype implementation planning
- Approver: Calin

## Confirmed architecture

The feature remains a module in the existing NestJS modular monolith with the React frontend, local JSON repository, existing RAG path, and OpenAI response agent.

Confirmed choices:

1. Use a separate short-lived `demo_access` token, never the normal JWT.
2. Resolve usernames deterministically in backend code before AI generation.
3. Use a deterministic local fallback when the OpenAI provider fails.
4. Keep credentials out of AI context and normal chatbot responses.
5. Do not add a database, event bus, microservice, or public deployment.

## Boundaries

- Identity & Access owns normal JWT authentication.
- Schedule Management owns schedules, days, exercises, and ownership checks.
- Account Resolver owns username matching.
- Chat Orchestration coordinates lookup, retrieval, agent response, and demo-state handling.
- AI Agent generates wording only and cannot authorize access.
- React renders the result and demo warning but does not read mock data or provider secrets.

## Conditions before implementation

- Define the `demo_access` claims, expiry, and guard behavior.
- Add tests proving a demo token cannot satisfy normal JWT guards.
- Add tests proving password fields never enter model context or responses.
- Keep the feature disabled outside local development.

## Fast Lane depth decision

Full feature-specific HLD drafting, architecture hardening, and socialization are skipped because the approved Explore Type is Fast Lane and the existing GYM_SCHEDULER HLD provides the platform baseline.

The detailed design direction is recorded in [chatbot-account-access-design-sketch.md](../hlds/chatbot-account-access-design-sketch.md).

Last updated: 2026-10-22
