---
domain: GYM_SCHEDULER
source: ../explore-chatbot-account-access/domain-analysis.md
validated_by: Calin
explore_type: Fast Lane
evidence_label: OBS
---

# HLD Confirmation - Chatbot Account Access

This Fast Lane feature does not introduce a new platform HLD. The authoritative platform architecture is [gym-scheduler-hld.md](gym-scheduler-hld.md), and the feature-specific architecture is captured in [chatbot-account-access-design-sketch.md](chatbot-account-access-design-sketch.md) and [architecture-confirmation.md](../explore-chatbot-account-access/architecture-confirmation.md).

## Architecture type

`[OBS]` Existing NestJS modular monolith with React frontend, JSON repository, REST/JSON contracts, and no event bus.

## Feature components

`[OBS]` Chat Controller, deterministic Account Resolver, RAG Retriever, AI Agent, separate `demo_access` state, existing Identity & Access, Schedule Management, JSON Repository, and React Chat UI.

## Confirmed decisions

- `[OBS]` Separate short-lived `demo_access` token; never a normal JWT.
- `[OBS]` Resolve usernames deterministically before AI generation.
- `[OBS]` Use deterministic local fallback on OpenAI failure.
- `[OBS]` Keep credentials out of AI context and chatbot responses.

## Operational boundary

`[OBS]` Local development only, one API process, no public deployment, no remote database, and no production readiness claim.

## Traceability

- PRD: [chatbot-account-access-prd.md](../prds/chatbot-account-access-prd.md)
- Design sketch: [chatbot-account-access-design-sketch.md](chatbot-account-access-design-sketch.md)
- Architecture confirmation: [architecture-confirmation.md](../explore-chatbot-account-access/architecture-confirmation.md)
- Existing platform HLD: [gym-scheduler-hld.md](gym-scheduler-hld.md)

Last updated: 2026-10-22
