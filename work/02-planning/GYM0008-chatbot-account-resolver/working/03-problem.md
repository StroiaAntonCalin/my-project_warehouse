# Problem Capture

## Problem Statement

The chatbot currently has no dedicated deterministic account-resolution boundary. Account selection must happen in backend code before retrieval, AI wording, or any future demo-access flow. The desired resolver returns one credential-free identity for a valid unique username and fails closed for empty, malformed, unknown, or duplicate usernames.

The business driver is safe, predictable chatbot account access for the local prototype without allowing the model to choose an account or expose credentials.

## Stakeholders

- **Calin**: Product owner and approver.
- **Backend/API**: Owns repository lookup, resolver contract, and security behavior.
- **Chat orchestration**: Consumes deterministic results before RAG/AI processing.
- **Frontend**: Displays safe account status and responses.
- **QA**: Verifies success, ambiguity, redaction, and regression behavior.

## Affected Components

- [ ] Manager
- [x] Server
- [x] App
- [x] Cross-cutting

## Initial Questions

- What username normalization and validation rules should be applied?
- How should duplicate usernames be represented without exposing matching records?
- Should the resolver return a typed result or throw for unknown/ambiguous outcomes?
- How can tests use duplicate fixtures without mutating checked-in mock data?
- Which existing repository interface should remain authoritative for User and Schedule ownership?

## Existing Context

- [Task definition](../task.md)
- [Chatbot PRD](../../../../explore/prds/chatbot-account-access-prd.md)
- [Chatbot design sketch](../../../../explore/hlds/chatbot-account-access-design-sketch.md)
- [GYM0009 demo-access token plan](../GYM0009-chatbot-demo-access-token/plan.md)
- [GYM0010 safe orchestration plan](../GYM0010-chatbot-safe-rag-fallback/plan.md)
- [GYM0012 regression tests](../GYM0012-chatbot-access-quality-tests/plan.md)
