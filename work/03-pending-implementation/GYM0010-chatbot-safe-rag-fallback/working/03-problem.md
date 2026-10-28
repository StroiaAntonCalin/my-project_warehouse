# Problem Capture — GYM0010

## Problem Statement

The chatbot currently needs a deterministic orchestration layer that resolves account identity before AI generation, retrieves only safe schedule/account facts, and remains usable when OpenAI is unavailable. Without this boundary, the model could select accounts, receive credential fields, expose provider errors, or produce inconsistent responses for unknown and ambiguous requests.

The desired state is a NestJS chat flow that performs deterministic resolution, safe RAG projection, optional provider wording, and a stable local fallback response. The business driver is reliable prototype behavior with a clear credential and authorization boundary.

## Stakeholders

- **Calin**: Product owner and approver of safety, scope, and fallback behavior.
- **Backend engineer**: Owns controller, resolver integration, RAG projection, provider adapter, and fallback mapping.
- **Frontend engineer**: Consumes the typed response envelope and safe status metadata.
- **QA/quality owner**: Verifies provider failures, redaction, prompt-injection resistance, and regressions.
- **Prototype users**: Need predictable answers from local JSON data even without an OpenAI key.

## Affected Components

- [ ] Manager
- [x] Server
- [x] App
- [x] Cross-cutting

## Initial Questions

- [ ] What exact structured context is allowed into the agent for account and schedule questions?
- [ ] Which provider failures map to local fallback versus a safe error response?
- [ ] How should deterministic intents distinguish account lookup, schedule lookup, access request, and unsupported questions?
- [ ] Which API response fields must remain backward-compatible with the current frontend `answer` handling?
- [ ] How should provider/network failures be logged without secrets or full prompts?

## Existing Context

- [GYM0010 task](../task.md)
- [Chatbot PRD](../../../../explore/prds/chatbot-account-access-prd.md)
- [Chatbot HLD](../../../../explore/hlds/chatbot-account-access-hld.md)
- [Chatbot decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md), especially DEC-006, DEC-007, and DEC-010
- [Existing local RAG service](../../../../apps/api/src/chat/local-rag.service.ts)
- [Existing chat integration tests](../../../../apps/api/test/chat.spec.ts)
