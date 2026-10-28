# Research Findings — GYM0010

## Search Terms

- deterministic account resolver before AI
- credential-free RAG projection and redaction
- OpenAI provider fallback and error normalization
- typed chatbot response envelope
- local JSON repository schedule retrieval

## Decision Inventory

| Decision | Status | Key Requirement | Link |
|----------|--------|-----------------|------|
| DEC-006 | Active | Resolve username deterministically before AI generation; the model does not select accounts. | [Chatbot decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-007 | Active | Use deterministic local fallback when the provider fails or is unavailable. | [Chatbot decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-008 | Active | Separate `demo_access` token and guard behavior from normal JWT authentication. | [Chatbot decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-009 | Active | Local-only feature gate defaults off outside development. | [Chatbot decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-010 | Active | Fallback envelope is deterministic, safe, and excludes credentials/tokens/prompts/provider details. | [Chatbot decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-011 | Active | Duplicate usernames are ambiguous and cannot authorize access. | [Chatbot decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |

## Current Implementation Findings

- `LocalRagService` currently delegates directly from controller to retriever and agent.
- `LocalRagRetriever` currently builds account documents containing plaintext passwords; this conflicts with the approved credential-free context boundary and must be corrected.
- The retriever supports account, profile, schedule-day, and exercise context, but account-based schedule questions require stronger deterministic matching and safe projections.
- `LocalChatAgent` currently performs OpenAI generation or a local fallback, but provider failures are converted to `ServiceUnavailableException` rather than the DEC-010 safe fallback envelope.
- The current fallback can return password values and broad account context; this must be removed from normal response paths.
- The current API response is `{ answer, sources }`; `answer` should remain compatible while optional safe metadata is added.
- Existing tests assert password responses, so those assertions must be revised to match the approved safety boundary and demo-access contract.

## Related Tasks

| Task | Status | Relationship | Link |
|------|--------|--------------|------|
| GYM0003 | Completed | Existing normal JWT/session boundary that must not be changed. | [Authentication task](../../../../work/06-completed/GYM0003-implement-gym-scheduler-seeded-authentication-and/task.md) |
| GYM0004 | Completed | Existing schedule ownership and seven-day behavior used by retrieval. | [Schedule task](../../../../work/06-completed/GYM0004-implement-gym-scheduler-authenticated-weekly-sched/task.md) |
| GYM0008 | Pending planning | Supplies deterministic account resolver behavior. | [Resolver task](../../GYM0008-chatbot-account-resolver/task.md) |
| GYM0009 | Pending planning | Supplies demo access state/guard contract. | [Demo token task](../../GYM0009-chatbot-demo-access-token/task.md) |
| GYM0011 | Pending planning | Consumes safe optional response metadata in the React UI. | [UI task](../../GYM0011-chatbot-access-ui/task.md) |
| GYM0012 | Pending implementation | Tests redaction, fallback, provider failures, and regressions. | [Quality task](../../GYM0012-chatbot-access-quality-tests/task.md) |

## Documentation References

| Document | Relevance | Link |
|----------|-----------|------|
| Chatbot PRD | Requirements and local-only boundary. | [PRD](../../../../explore/prds/chatbot-account-access-prd.md) |
| Chatbot HLD | Ownership boundaries and RAG/agent flow. | [HLD](../../../../explore/hlds/chatbot-account-access-hld.md) |
| Chatbot test strategy | Required provider, redaction, integration, and fallback coverage. | [Test strategy](../../../../explore/explore-chatbot-account-access/test-strategy.md) |
| Existing chat tests | Current behavior and assertions requiring alignment. | [chat.spec.ts](../../../../apps/api/test/chat.spec.ts) |

## Conflicts and Gaps

| Gap | Description | Resolution |
|-----|-------------|------------|
| Plaintext credentials in retrieved documents | Current account documents include passwords, violating the approved safe-context boundary. | Replace with credential-free account projections and cover recursive redaction. |
| Password-oriented tests | Existing tests expect the chat to return passwords. | Update tests and behavior to support safe demo-access metadata rather than password disclosure. |
| Provider exception path | Current OpenAI failures become 503 errors instead of deterministic fallback. | Normalize provider failures and use DEC-010 fallback, preserving a safe error only for invalid request/context cases. |
| Frontend compatibility | Current UI reads only `answer`. | Keep `answer` and `sources`; add optional safe metadata for GYM0011. |
