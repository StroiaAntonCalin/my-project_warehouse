# Task Sizing

| Axis | Score | Rationale |
|---|---:|---|
| Scope / Surface Area | 2 | Auth module and chat access boundary. |
| Coupling / Interfaces | 2 | New token contract and guard interaction. |
| Novelty / Uncertainty | 2 | Separate prototype token pattern is new to this feature. |
| Dependencies | 1 | Depends on resolver and existing JWT behavior. |
| Testing & Verification | 2 | High-risk negative authorization tests. |
| Risk / Blast Radius | 3 | Authentication boundary and access safety. |

Total: 12/18 - Size L
