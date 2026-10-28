# Technical Approach — GYM0011

## High-Level Strategy

Extend the existing `ChatPanel` in `apps/web/src/main.tsx` and its styles rather than creating a new page or chatbot package. Preserve the current public/authenticated chat flows and `answer` field, then add optional typed metadata for demo-access, fallback, intent, and account status. Keep all account resolution, token issuance, and credential handling in the API.

## Architecture Decisions

### Extend the existing panel

- **Choice**: Keep one reusable `ChatPanel` component with separate public/authenticated callers.
- **Rationale**: The current UI already supports collapsed/expanded states and both entry points.
- **Alternative rejected**: A new route or global chat service would duplicate state and expand prototype scope.

### Typed optional response metadata

- **Choice**: Extend the frontend response model with optional fields: `source`, `mode`, `intent`, `accountUsername`, `accessIssued`, and `demoOnly`, while retaining `answer` as the text fallback.
- **Rationale**: Preserves compatibility with current API responses while allowing GYM0010 to add the DEC-010 envelope.
- **Alternative rejected**: Parse natural-language answer text to infer access state.

### Explicit accessible accordion control

- **Choice**: Use a real button to open/close the panel with `aria-expanded`, `aria-controls`, and a visible `+`/`−` icon; use a polite live region for assistant responses and `role=alert` for request failures.
- **Rationale**: Makes the existing accordion keyboard-operable and understandable to assistive technology.
- **Alternative rejected**: A clickable heading or document-level click handler, which is not an accessible control and can cause accidental collapse.

### No browser credential/token storage

- **Choice**: Render only safe account and demo metadata. Do not read JSON, expose passwords, persist provider keys, or store raw demo tokens in local/session storage.
- **Rationale**: The frontend is a presentation client; the backend owns authorization and secrets.

## Component Changes

### `apps/web/src/main.tsx`

- [ ] Define typed optional chatbot response metadata and local message status fields.
- [ ] Refactor `ChatPanel` accordion control into explicit buttons with stable IDs and accessible labels.
- [ ] Render assistant answer, demo-only warning, account username, fallback label, and safe failure text conditionally.
- [ ] Add `aria-live="polite"` status region and `role="alert"` request-error rendering.
- [ ] Preserve public and authenticated request handlers and loading/submit behavior.
- [ ] Ensure response handling never renders raw token/password fields.

### `apps/web/src/styles.css`

- [ ] Keep panel width aligned with the login box and lower-left fixed position.
- [ ] Style warning/status/fallback variants with readable contrast and responsive layout.
- [ ] Preserve visible focus and keyboard interaction for toggle, input, and submit buttons.

### Frontend tests

- [ ] Test collapsed/expanded/retracted state and keyboard toggle.
- [ ] Test success, unknown, ambiguous, fallback, provider error, and feature-disabled rendering.
- [ ] Test demo warning and safe-field-only rendering.
- [ ] Test live status and alert semantics.

## Data Model Changes

No persistent data model changes. Use frontend-only types:

```ts
type ChatResponse = {
  answer: string;
  source?: 'openai' | 'local';
  mode?: 'answer' | 'fallback' | 'demo_access' | 'error';
  intent?: string;
  accountUsername?: string;
  accessIssued?: boolean;
  demoOnly?: boolean;
};
```

The raw demo token is not included in the rendered message model or browser storage.

## Integration Points

- `POST /api/v1/chat/public` for unauthenticated public chat.
- `POST /api/v1/chat` for authenticated schedule chat.
- GYM0010 owns the response envelope; this task consumes optional metadata and keeps `answer` compatibility.
- GYM0004’s authenticated schedule navigation remains unchanged.

## Error Handling and State

- `loading`: disable Ask and expose a pending status.
- `success`: append answer and optional safe metadata.
- `fallback`: append answer plus “Local fallback” status.
- `unknown`/`ambiguous`/`disabled`: append safe rejection; do not show account details beyond allowed username metadata.
- network/API failure: append a concise `role=alert` message without raw provider error details.
- toggle state is local to each panel and must not affect schedule/login state.

## Configuration

- No frontend API key or environment secret is added.
- Use existing API base URL configuration.
- Use existing browser support target and responsive CSS.
- Do not add a dependency without approval; verify existing Vitest/RTL/Playwright availability first.

## Dev Hints

- Prefer semantic buttons, labels, `aria-expanded`, `aria-controls`, and `aria-live` over click listeners on headings.
- Keep assistant message text escaped by React’s normal rendering.
- Use deterministic API mocks in component tests.
- Use role/name selectors in browser tests; avoid fixed sleeps.
- Treat backend fields as untrusted and whitelist only the fields in `ChatResponse`.
