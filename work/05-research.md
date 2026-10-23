# Research Findings — GYM0012

## Search Terms

- `demo_access` token isolation
- credential redaction and safe RAG projection
- deterministic fallback and OpenAI provider failures
- JWT/session regression
- Jest, Vitest, Supertest, Playwright, and accessibility checks

## Decision Inventory

| Decision ID | Status | Key Requirement | Link |
|-------------|--------|-----------------|------|
| ADR-004 | Accepted | Keep normal short-lived access JWTs in memory with rotating HttpOnly refresh cookies. | [Secure session ADR](../explore/decisions/gym-scheduler-adr-004-secure-session.md) |
| DEC-008 | Active | `demo_access` has explicit type, issuer, audience, claims, 15-minute expiry, and a dedicated guard. | [Chatbot decision log](../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-009 | Active | Demo access is disabled by default and enabled only in development. | [Chatbot decision log](../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-010 | Active | Provider-independent fallback uses a stable credential-free response envelope. | [Chatbot decision log](../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-011 | Active | Duplicate usernames are ambiguous and never authorize access. | [Chatbot decision log](../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-012 | Active | UI explicitly labels the feature as local prototype demo access. | [Chatbot decision log](../explore/hlds/chatbot-account-access-decision-log.md) |

## Related Tasks

| Task ID | Status | Relationship | Link |
|---------|--------|--------------|------|
| GYM0003 | Completed | Existing normal JWT, refresh, logout, and auth regression baseline. | [Authentication task](../work/06-completed/GYM0003-implement-gym-scheduler-seeded-authentication-and/task.md) |
| GYM0004 | Completed | Existing protected schedule and ownership regression baseline. | [Schedule task](../work/06-completed/GYM0004-implement-gym-scheduler-authenticated-weekly-sched/task.md) |
| GYM0005 | Completed | Existing exercise API/UI behavior that must remain functional. | [Exercise task](../work/06-completed/GYM0005-implement-gym-scheduler-exercise-management/task.md) |
| GYM0008 | Pending planning | Resolver behavior is an upstream test subject. | [Resolver task](../work/01-pending-planning/GYM0008-chatbot-account-resolver/task.md) |
| GYM0009 | Pending planning | Demo-token behavior is an upstream test subject. | [Token task](../work/01-pending-planning/GYM0009-chatbot-demo-access-token/task.md) |
| GYM0010 | Pending planning | RAG projection and fallback behavior are upstream test subjects. | [Fallback task](../work/01-pending-planning/GYM0010-chatbot-safe-rag-fallback/task.md) |
| GYM0011 | Pending planning | Frontend states and accessibility are downstream test subjects. | [UI task](../work/01-pending-planning/GYM0011-chatbot-access-ui/task.md) |

## Documentation References

| Document | Relevance | Link |
|----------|-----------|------|
| Chatbot test strategy | Defines the testing pyramid, tools, coverage floors, boundaries, and critical journeys. | [Test strategy](../explore/explore-chatbot-account-access/test-strategy.md) |
| Chatbot PRD | Defines requirements, local-only scope, and resolved open questions. | [PRD](../explore/prds/chatbot-account-access-prd.md) |
| Chatbot epic | Defines acceptance criteria, risks, and task sequencing. | [Epic](../explore/epics/EPIC-GYM-005-chatbot-account-access.md) |
| Existing scheduler test strategy | Establishes Jest, Vitest, Supertest, Playwright, axe, and browser expectations. | [Scheduler strategy](../explore/explore-gym-scheduler/test-strategy.md) |

## Conflicts and Gaps

| Conflict/Gap | Description | Resolution |
|--------------|-------------|------------|
| Planning order versus implementation order | `dft task next` may prioritize GYM0012 because it is the quality gate, while implementation dependencies begin with GYM0008. | Plan GYM0012 now as the cross-cutting test contract; execute feature implementation in dependency order afterward. |
| Playwright availability | The approved strategy names Playwright but says it is added when available. | Treat browser journeys as required test inventory; verify package/scripts during Step 5 implementation research and add only if already approved by the repository. |
| Provider access | Live OpenAI credentials are unsuitable for deterministic tests. | Use a provider seam/stub and explicit 401, 429, network, and missing-key fixtures. |
| Feature-specific architecture context | No separate architecture-context file exists. | Accepted Fast Lane limitation; use the validated HLD, decision log, PRD, and test strategy. |
