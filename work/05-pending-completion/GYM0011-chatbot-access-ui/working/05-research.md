# Research Findings — GYM0011

## Search Terms

- chatbot response states and demo-only warning
- React accessibility, keyboard focus, and status announcements
- typed chat API response envelope
- existing login/schedule regression
- responsive browser compatibility

## Decision Inventory

| Decision | Status | Key Requirement | Link |
|----------|--------|-----------------|------|
| DEC-009 | Active | Demo access is disabled by default and enabled only in development. | [Decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-010 | Active | Fallback uses safe metadata and a deterministic response envelope. | [Decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |
| DEC-012 | Active | Show explicit local-prototype wording for demo access. | [Decision log](../../../../explore/hlds/chatbot-account-access-decision-log.md) |
| Existing accessibility guidance | Approved baseline | Use labels, focus, keyboard access, and safe announced errors/statuses. | [Accessibility guidance](../../../../explore/design/accessibility-gym-scheduler.md) |

## Current Implementation Findings

- `apps/web/src/main.tsx` contains the `ChatPanel` component and both authenticated/public chatbot flows.
- The current component keeps messages as `{ role, text }` and renders only `payload.answer`; it does not render typed demo metadata or status semantics.
- The public and authenticated chat forms already have controlled inputs and loading state.
- The panel is already fixed at the lower-left and collapsible, so the feature should extend the current component rather than introduce a new page shell.
- `apps/web/package.json` provides Vite, TypeScript, Vitest, and ESLint scripts but no Playwright dependency.
- Current frontend tests cover only the weekday schedule foundation; chatbot component coverage is not yet present.
- The backend currently exposes `POST /api/v1/chat` and `POST /api/v1/chat/public`; the UI must remain compatible with the existing answer field while adding optional metadata handling.

## Related Tasks

| Task | Status | Relationship | Link |
|------|--------|--------------|------|
| GYM0004 | Completed | Existing authenticated schedule UI and navigation regression. | [Schedule task](../../../../work/06-completed/GYM0004-implement-gym-scheduler-authenticated-weekly-sched/task.md) |
| GYM0010 | Pending planning | Defines safe chatbot response and fallback envelope consumed by this UI. | [Fallback task](../../GYM0010-chatbot-safe-rag-fallback/task.md) |
| GYM0012 | Pending implementation | Defines frontend accessibility and E2E quality gates. | [Quality task](../../GYM0012-chatbot-access-quality-tests/task.md) |

## Conflicts and Gaps

| Gap | Description | Resolution |
|-----|-------------|------------|
| Response contract timing | The current frontend uses only `answer`, while DEC-010 adds optional typed metadata. | Preserve `answer` as the compatibility fallback and render metadata only when present; coordinate field names with GYM0010. |
| Playwright tooling | The repository has no frontend Playwright dependency in `apps/web/package.json`. | Keep E2E scenarios in the plan; verify shared/root tooling before adding dependencies. |
| Status announcements | Existing UI uses `role=alert` for login errors but chat messages lack live-region semantics. | Add a polite status/live region for assistant responses and an alert for request failures. |
