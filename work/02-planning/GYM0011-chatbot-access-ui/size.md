# Task Sizing

| Axis | Score | Rationale |
|---|---:|---|
| Scope / Surface Area | 2 | Existing chatbot UI and shared response state. |
| Coupling / Interfaces | 2 | Consumes a meaningful optional backend response contract across public and authenticated flows. |
| Novelty / Uncertainty | 1 | Existing collapsible chatbot pattern. |
| Dependencies | 2 | Depends on GYM0010 metadata and existing/approved browser-testing tooling. |
| Testing & Verification | 2 | Component, accessibility, and E2E coverage. |
| Risk / Blast Radius | 2 | User-facing authentication messaging and credential-safe rendering affect a security-sensitive path. |

## Total Complexity Score: 11/18

## Size Estimate

- **Shirt Size**: M
- **Time Estimate**: 1–2 weeks
- **Confidence**: Medium

Approved by Calin on 2026-10-23.
