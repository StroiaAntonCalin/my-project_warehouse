# Goals and Constraints — GYM0010

## Measurable Goals

- [ ] **G1 — Deterministic orchestration:** Account identity is resolved in backend code before any agent generation.
- [ ] **G2 — Safe context:** Model context contains only whitelisted account/schedule facts and never passwords or hashes.
- [ ] **G3 — Stable fallback:** OpenAI 401, 429, network, missing-key, and malformed responses map to deterministic safe output.
- [ ] **G4 — Intent coverage:** Known schedule/account questions, unknown/ambiguous users, access requests, and unsupported questions have explicit outcomes.
- [ ] **G5 — Compatibility:** Existing `answer` and `sources` response fields remain usable by the current frontend while safe optional metadata is added.
- [ ] **G6 — Observability safety:** Logs expose only safe event metadata, never credentials, tokens, full prompts, or provider secrets.

## Constraints

- **Timeline**: No fixed deadline; use a simple prototype implementation.
- **Resources**: One NestJS process, local JSON repository, existing RAG/agent modules, no event bus.
- **Technical**: OpenAI is optional; provider access is server-side and injected/stubbed in tests. API prefix remains `/api/v1`.
- **Security**: Deterministic resolver is authoritative for account selection; the agent cannot authorize or issue access.
- **Compliance**: Local-only feature; no real accounts, production credentials, public deployment, or production recovery behavior.

## Non-Goals

- Adding a remote database, event bus, vector database, or separate service.
- Replacing the existing RAG architecture beyond this feature boundary.
- Letting the model choose accounts, issue JWTs, or access passwords.
- Production authentication recovery, MFA, identity proofing, or public deployment.
- Live-provider dependence in automated tests.

## Assumptions

| Assumption | Risk | Validation |
|------------|------|------------|
| Existing `LocalRagService`, retriever, and agent can be extended behind their current NestJS boundaries | Medium | Inspect current modules and tests during research |
| Existing frontend can continue using `answer` while optional metadata is added | High | Preserve field and add API/UI contract tests |
| OpenAI adapter failures can be normalized at one service boundary | High | Stub all failure classes and assert one fallback contract |
| Mock JSON records are small enough for bounded in-process retrieval | Low | Use existing repository and retrieval tests |
| Safe projections can answer schedule questions without credentials | Medium | Add redaction and grounding tests for account/day/exercise queries |
