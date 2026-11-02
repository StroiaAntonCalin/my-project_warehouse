# Research Findings

## Search Terms

- deterministic username resolver
- unique and ambiguous account match
- credential-free user projection
- local JSON repository lookup
- demo_access integration boundary

## Decision Inventory

| Decision | Status | Key Requirement | Link |
|----------|--------|-----------------|------|
| DEC-002 | Active | Reuse the existing User and Schedule domain model. | [Decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-004 | Active | Keep Account Resolver separate from Identity, RAG, AI, and frontend responsibilities. | [Decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-006 | Active | Resolve usernames deterministically before AI generation. | [Decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-008 | Active | Resolver output may feed isolated `demo_access`, never normal JWT auth. | [Decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-011 | Active | Zero or multiple username matches are non-authorizing outcomes. | [Decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |

## Current Implementation Findings

- `JsonRepository` owns the local JSON data and exposes `snapshot()`, `findUser()`, and `findUserById()`.
- Existing `findUser()` uses exact case-sensitive matching and returns the complete credential-bearing `User` record; the resolver must not expose that record.
- `LocalRagRetriever` currently contains an equivalent lookup helper and should consume or share the resolver contract rather than becoming an authorization authority.
- `DemoAccessService` already accepts a unique `{ id, username }` result and rejects unknown/ambiguous statuses; GYM0008 should produce that compatible shape or an explicit adapter should map it.
- The local mock repository is mutable for registration, so duplicate-match tests must use isolated in-memory fixtures and must not persist changes.

## Related Tasks

| Task | Status | Relationship | Link |
|------|--------|--------------|------|
| GYM0003 | Completed | Existing authentication and User contract. | [Task](../../../../work/06-completed/GYM0003-implement-gym-scheduler-seeded-authentication-and/task.md) |
| GYM0009 | Pending completion | Consumes unique resolver output to issue isolated demo access. | [Task](../../../../work/05-pending-completion/GYM0009-chatbot-demo-access-token/task.md) |
| GYM0010 | Pending completion | Uses deterministic account resolution before safe RAG/AI. | [Task](../../../../work/05-pending-completion/GYM0010-chatbot-safe-rag-fallback/task.md) |
| GYM0011 | Pending completion | Presents safe access metadata in React. | [Task](../../../../work/05-pending-completion/GYM0011-chatbot-access-ui/task.md) |
| GYM0012 | Pending completion | Validates resolver, token, RAG, and auth boundaries. | [Task](../../../../work/05-pending-completion/GYM0012-chatbot-access-quality-tests/task.md) |

## Documentation References

| Document | Relevance | Link |
|----------|-----------|------|
| Chatbot PRD | Username-only prototype flow, credential protection, and local-only boundary. | [PRD](../../../../explore/prds/chatbot-account-access-prd.md) |
| Chatbot design sketch | Separate resolver and identity ownership boundaries. | [Design sketch](../../../../explore/hlds/chatbot-account-access-design-sketch.md) |
| JsonRepository | Authoritative local account data source. | [Repository](../../../../apps/api/src/repository/json.repository.ts) |
| DemoAccessService | Downstream token consumer and required unique-result shape. | [Demo access service](../../../../apps/api/src/auth/demo-access.service.ts) |

## Conflicts and Gaps

| Conflict/Gap | Description | Resolution |
|--------------|-------------|------------|
| Existing direct lookup | `JsonRepository.findUser()` is exact and case-sensitive and returns credentials. | Resolver owns normalization, match-count evaluation, and safe projection; it may use a repository snapshot/read method but never return the raw record. |
| Duplicate fixture support | Seed data is expected to be unique, but duplicate handling is required. | Use an isolated repository fixture or in-memory snapshot mutation in tests; never persist duplicate test data. |
| Result contract naming | GYM0009 uses `unique`, `unknown`, and `ambiguous` statuses with a nested user. | Adopt the GYM0009-compatible result contract to avoid an adapter and keep issuance gated. |
| Public versus authenticated use | The resolver identifies an account but does not authorize normal schedule routes. | Keep authorization in the later demo-access route/guard; resolver output alone never grants access. |
