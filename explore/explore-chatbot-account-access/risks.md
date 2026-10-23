# Risk Register: Chatbot Account Access

- Scope: Fast Lane prototype
- Date: 20261022
- Owner: Calin
- Status: Critical risks documented; production risk review not performed

## Risk register

| Code | Risk | Impact | Likelihood | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|
| RISK-001 | Username-only access enables account takeover if exposed beyond the demo | Critical | High | Local-only boundary, visible warning, and deployment guard | Calin | Accepted for prototype only |
| RISK-002 | Model selects the wrong account or follows prompt injection | High | Medium | Deterministic backend resolution and bounded context | Lead Engineer | Mitigation required before implementation complete |
| RISK-003 | Passwords enter model context or chatbot response | Critical | Medium | Redaction, safe response contract, and regression tests | Lead Engineer | Mitigation required before implementation complete |
| RISK-004 | Demo access accidentally bypasses normal JWT authorization | High | Medium | Separate `demo_access` claims/guard and auth regression tests | Architect | Architecture mitigation defined; implementation tests pending |
| RISK-005 | OpenAI provider failure blocks the demo | Medium | Medium | Safe provider error and optional deterministic local fallback | Lead Engineer | Open |

## Accepted risks

- Local mock data and plaintext mock credentials are accepted only for local prototype demonstration.
- No production security, privacy, compliance, or public-deployment approval is implied.

## Mitigation tracking

| Mitigation | Verification |
|---|---|
| Backend account resolver is deterministic | Unit and API tests |
| Credentials are excluded from AI context | Redaction test and prompt inspection |
| Demo state is separate from JWT | Architecture confirmation and regression tests |
| Prototype boundary is visible | UI review |
| Provider failures are handled | API tests with provider failure simulation |

## Enrichment log

| Date | Update |
|---|---|
| 20261022 | Created critical-risk register from approved context, technical feasibility, and PRD. |

Last updated: 20261022
