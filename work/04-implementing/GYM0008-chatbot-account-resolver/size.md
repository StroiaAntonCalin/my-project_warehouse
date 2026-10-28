# Task Sizing

## Complexity Dimensions

### Technical Complexity

- **Analysis Scope**: One backend resolver module, repository boundary, chatbot integration, and test suites.
- **File Count**: Approximately 3–5 implementation/test files.
- **Cross-References**: Chatbot PRD, decision log, JsonRepository, GYM0009, GYM0010, and GYM0012.
- **Integration Points**: JsonRepository, LocalRagService, DemoAccessService, normal auth regression suite.

## Effort Estimation

### Multi-Axis Scoring

| Axis | Score (0-3) | Rationale |
|------|------------:|-----------|
| Scope / Surface Area | 1 | One backend module plus repository/test integration. |
| Coupling / Interfaces | 1 | New internal result contract consumed by GYM0009 and GYM0010. |
| Novelty / Uncertainty | 1 | Familiar repository lookup and NestJS service pattern. |
| Dependencies | 1 | Existing local repository and downstream internal tasks. |
| Testing & Verification | 2 | Unit, API integration, duplicate fixtures, redaction, and auth regressions. |
| Risk / Blast Radius | 2 | Username resolution feeds a sensitive demo-access boundary. |

### Total Complexity Score: 8/18

### Size Estimate

- **Shirt Size**: M
- **Time Estimate**: 1–2 weeks
- **Confidence**: high

## Dependencies and Risk Factors

- Blocking implementation dependency: none; JsonRepository already exists.
- Downstream consumers: GYM0009 and GYM0010.
- Main risk: username-only convenience selecting the wrong account or being mistaken for normal authentication.
- Mitigation: exact normalized matching, explicit ambiguous status, credential-free projection, and regression tests.

## Review

Approved by Calin on 2026-10-28.
