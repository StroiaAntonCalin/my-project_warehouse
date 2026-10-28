# Task Sizing

## Complexity Dimensions

### Technical Complexity

- **Analysis Scope**: API authentication module, configuration, resolver boundary, and test suites.
- **File Count**: Approximately 5–8 implementation/test/configuration files.
- **Cross-References**: PRD, HLD/design sketch, decision log, ADR-004, GYM0003, GYM0008, and downstream GYM0010–GYM0012.
- **Integration Points**: Account Resolver, DemoAccessService, DemoAccessGuard, JwtAuthGuard, normal schedule routes, and auth regression tests.

## Effort Estimation

### Multi-Axis Scoring

| Axis | Score (0-3) | Rationale |
|------|------------:|-----------|
| Scope / Surface Area | 2 | Multiple files across auth, configuration, resolver integration, and tests. |
| Coupling / Interfaces | 2 | Adds a meaningful internal token/guard contract alongside the existing JWT boundary. |
| Novelty / Uncertainty | 1 | Uses established JWT/NestJS patterns with a new isolated demo-token variation. |
| Dependencies | 2 | Depends on the GYM0008 resolver contract and the existing authentication baseline. |
| Testing & Verification | 3 | Requires positive, negative, expiry, environment, isolation, and regression coverage. |
| Risk / Blast Radius | 3 | Authentication boundary work can create high-impact authorization regressions. |

### Total Complexity Score: 13/18

### Size Estimate

- **Shirt Size**: L
- **Time Estimate**: 2–3 weeks
- **Confidence**: medium

## Dependencies and Risk Factors

- Blocking: GYM0008 resolver contract and GYM0003 normal authentication baseline.
- Downstream: GYM0010, GYM0011, and GYM0012.
- Main risk: demo credentials crossing into normal JWT-protected routes.
- Mitigation: dedicated secret, exact claims, explicit guard opt-in, local-only gate, and negative authorization tests.

## Review

Approved by Calin on 2026-10-28.
