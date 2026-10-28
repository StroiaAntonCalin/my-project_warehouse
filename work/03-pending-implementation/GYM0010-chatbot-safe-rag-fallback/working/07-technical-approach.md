# Technical Approach — GYM0010

## High-Level Strategy

Refactor the existing NestJS chat path into explicit stages: normalize request -> classify intent and account reference -> resolve account deterministically -> retrieve bounded credential-free context -> invoke optional provider -> normalize provider failure to deterministic fallback -> return a typed safe response. The AI agent may word an answer from context but never selects an account, authorizes access, or receives credentials.

## Architecture Decisions

### Deterministic resolution before retrieval and AI

- **Choice**: Extract a username and intent in backend code, call the resolver, reject unknown/ambiguous matches, then retrieve context for the resolved user.
- **Rationale**: Prevents prompt-driven account selection and makes behavior testable.
- **Alternative rejected**: Giving raw account records to the model or letting the model call a resolver tool.

### Credential-free knowledge projection

- **Choice**: Account context includes only `id`, `username`, `role`, and safe schedule/day/exercise fields. Passwords, hashes, refresh tokens, access tokens, and credential metadata are never part of `KnowledgeDocument`.
- **Rationale**: The model and normal response path must not receive sensitive credentials.
- **Alternative rejected**: Existing plaintext account document format, which leaks passwords into context.

### Stable response envelope

- **Choice**: Preserve `answer` and `sources`, and add optional safe metadata: `source`, `mode`, `intent`, `accountUsername`, `accessIssued`, and `demoOnly`. Raw demo tokens are not returned in natural-language answer text.
- **Rationale**: Keeps the existing frontend compatible while allowing GYM0011 to render explicit state.
- **Alternative rejected**: Parsing answer prose or exposing provider-specific response shapes.

### Provider failure fallback

- **Choice**: Catch OpenAI 401, 429, network, missing-key, timeout, and malformed-response failures and generate a deterministic local answer from safe context. Invalid request/context failures remain safe API errors.
- **Rationale**: The local prototype remains usable without billing, network, or a configured key.
- **Alternative rejected**: Exposing raw provider errors or returning a generic 503 for every provider failure.

## Component Changes

### `apps/api/src/chat/local-rag.retriever.ts`

- [ ] Replace account documents containing passwords with safe account projections.
- [ ] Add explicit account/schedule document types and bounded context construction.
- [ ] Use resolver output for username-specific schedule questions and reject ambiguity.
- [ ] Keep public scope limited to approved local prototype behavior.

### `apps/api/src/chat/local-rag.service.ts`

- [ ] Classify intent and coordinate resolver -> retriever -> agent flow.
- [ ] Pass structured resolution and safe context to the agent.
- [ ] Attach safe metadata and preserve response compatibility.

### `apps/api/src/chat/local-chat.agent.ts`

- [ ] Accept safe documents only.
- [ ] Keep provider instructions concise and grounded in retrieved context.
- [ ] Normalize provider failures into the DEC-010 fallback response.
- [ ] Ensure fallback output never includes sensitive fields or raw provider details.

### `apps/api/src/chat/` support types/tests

- [ ] Add typed intent, resolution, response, and provider-error mapping types where needed.
- [ ] Add tests for success, no context, ambiguity, redaction, fallback, prompt injection, and response shape.

## Data Model Changes

No persistence changes. Use safe in-memory transport types:

```ts
type ChatIntent = 'schedule_lookup' | 'account_lookup' | 'access_request' | 'unsupported';
type ChatResponse = {
  answer: string;
  sources: ChatSource[];
  source: 'openai' | 'local';
  mode: 'answer' | 'fallback' | 'error';
  intent: ChatIntent;
  accountUsername?: string;
  accessIssued: boolean;
  demoOnly: boolean;
};
```

`password`, `passwordHash`, raw access tokens, refresh tokens, and provider secrets are forbidden from context, response, and logs.

## Integration Points

1. `POST /api/v1/chat` and `/api/v1/chat/public` validate message input.
2. `LocalRagService` invokes the deterministic resolver and retriever before `LocalChatAgent`.
3. `JsonRepository` remains the local source of users and schedules.
4. OpenAI remains optional and is called only with safe context.
5. GYM0009 owns token/guard issuance; this task exposes only safe access metadata.
6. GYM0011 consumes `answer` and optional safe metadata.

## Error Handling and Logging

- Empty message: existing `400 Message is required` behavior.
- Unknown/ambiguous account: safe no-match response; `accessIssued=false`; no agent authorization.
- No retrieved context: deterministic “could not find” response with empty sources.
- Provider failure: `source=local`, `mode=fallback`, safe answer and sources.
- Unexpected internal failure: generic safe error; no provider status body, prompt, or secret in response/logs.
- Logs may include intent, outcome, source, and safe account ID/username only when approved; never credentials, tokens, full prompts, or raw provider errors.

## Configuration

- OpenAI key/model remain server-side environment variables.
- `CHATBOT_DEMO_ACCESS_ENABLED` is enforced by the access path, not by the model.
- Test mode disables live OpenAI and uses deterministic stubs.
- No new database, event bus, or external service configuration.

## Dev Hints

- Keep retrieval and fallback pure enough for unit tests.
- Use recursive redaction assertions in tests.
- Prefer explicit intent/resolution objects over regex decisions spread across the agent.
- Update existing password-exposure tests to assert safe rejection/metadata behavior.
- Keep `sources` safe and bounded; never serialize repository records directly.
