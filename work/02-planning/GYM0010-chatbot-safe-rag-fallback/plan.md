# Technical Implementation Plan

## Scope

Connect deterministic account resolution to the existing RAG pipeline and implement the [DEC-010](../../../explore/hlds/chatbot-account-access-decision-log.md#dec-010---deterministic-fallback-response-envelope) credential-free local fallback.

## Files/modules

- `apps/api/src/chat/` orchestration, retriever projection, agent adapter, fallback.
- OpenAI provider stub/mock tests.

## Sequence

1. Accept structured resolver output in chat orchestration.
2. Build safe context projections excluding credentials.
3. Preserve existing schedule/exercise retrieval.
4. Map provider failure classes to the DEC-010 deterministic fallback response envelope.
5. Add prompt-injection and provider-error tests.

## Test inventory

Safe context, provider success, 401, 429, network failure, missing key, prompt injection, unknown account, credential redaction, and fallback response contract.
