# DevOps Strategy: GYM_SCHEDULER

| Version | Date | Author | Changes |
|---|---|---|---|
| 0.1 | 2026-09-09 | Explore Agent / Calin | Initial lean DevOps strategy |

## 1. Overview & Context

This strategy defines delivery, testing, security, observability, and future deployment for a low-risk React/NestJS modular-monolith prototype. [OBS]

| Attribute | Value |
|---|---|
| Architecture | Modular monolith |
| Deployable units | Local React frontend + NestJS backend |
| Storage | JSON repository; no runtime database |
| Criticality | Internal/MVP |
| Strategy profile | Lean |
| CI/CD | GitHub Actions baseline |

Quality targets: API actions under 2 seconds (NFR-001), page readiness under 3 seconds (NFR-002), protected credentials and ownership (NFR-003–NFR-005), accessible responsive UI (NFR-008–NFR-009), and automated quality checks (NFR-010). [OBS]

Sources: [PRD](../prds/gym-scheduler-prd.md), [HLD](../hlds/gym-scheduler-hld.md), [Test Strategy](test-strategy.md), and [ADRs](../decisions/).

## 2. CI/CD Pipeline Design

Active prototype pipeline:

```text
Push → lint/typecheck → unit → integration → build
          <1 min        <3 min    <10 min    <5 min
```

Future deployment stages (not active for the prototype): E2E/NFR and smoke verification.

| Stage | Trigger | Checks | Failure |
|---|---|---|---|
| Lint/typecheck | Every push/PR | ESLint, formatting, TypeScript | Block PR |
| Unit | Every push/PR | Vitest, Jest, coverage | Block merge |
| Integration | Every PR | Supertest, JSON fixtures | Block merge |
| Build | Main merge | Frontend/backend build | Block artifact |
| E2E/NFR | Future deployable env | Playwright, accessibility, timing | Block promotion when enabled |
| Smoke | Future deployment | Health and critical path | Alert/rollback when enabled |

Artifacts use commit SHA identifiers and environment-injected configuration. No registry or container platform is selected. [ASM]

## 3. Quality Gates

- Zero lint, format, and type errors.
- 100% unit/integration pass rate.
- Minimum 90% line and 85% branch coverage for changed business logic; high-risk auth/ownership targets are higher. [INF]
- Zero new critical/high dependency vulnerabilities.
- Future E2E gate: all five critical journeys pass and flaky rate remains below 1%.
- Failed gates block merge or promotion. Flaky tests are quarantined and fixed within one sprint.

## 4. Testing Integration

| Test layer | Pipeline stage | Target |
|---|---|---|
| Unit | Unit | 70–80% of tests; coverage floors above |
| Integration | Integration | 20–30%; every boundary happy/error/edge |
| Contract | None | Not applicable to modular monolith |
| E2E | Future E2E | Five critical journeys; 5–10% |

See [test-strategy.md](test-strategy.md). [OBS]

## 5. Environment Strategy

| Environment | Purpose | Status |
|---|---|---|
| Local | Development and all prototype tests | Active |
| CI | Isolated PR validation | Planned |
| Staging | Release validation | Deferred; not an active environment |
| Production | Public runtime | Deferred; not an active environment |

No ephemeral environments are needed. Local fixtures and CI workspaces are isolated. No production credentials are used outside production. [OBS]

## 6. Infrastructure as Code

No IaC is needed for local development. Cloud provider, container strategy, state management, policy engine, and drift detection are TBD until deployment is authorized. [ASM]

Future IaC changes must be version-controlled, reviewed through PRs, validated before apply, and approved manually for production. [INF]

## 7. Release & Deployment Strategy

Use simple manual/recreate deployment when a target is selected. Progressive delivery and feature flags are not needed for the prototype. [OBS]

Rollback means restoring the previous successful artifact and, if needed, the previous version-controlled JSON data. Database rollback is not applicable. Hotfixes use a short-lived branch, one reviewer, lint/unit/integration checks, and a follow-up E2E run when available. [INF]

## 8. Observability & Incident Response

- Logs: structured entries with timestamp, level, request ID, action, and result; never passwords, raw JWTs, or unnecessary workout data. [OBS]
- Metrics: request rate, errors, p50/p95 latency, login failures, authorization failures, saves, and JSON write failures. [INF]
- Tracing: not required for the single modular monolith.
- SLO baseline: API action under 2 seconds and page readiness under 3 seconds. [OBS]
- Alerts and dashboards: deferred until deployment exists.
- Response: shared team ownership, basic rollback runbook, and review for serious incidents. [INF]

## 9. DevSecOps

- Secret detection and dependency scanning in CI.
- TypeScript lint/static analysis and security-focused auth/input tests.
- Critical/high vulnerabilities block merges.
- Local secrets use environment variables; CI secrets use GitHub Actions secret storage.
- Passwords, raw JWTs, and sensitive schedule data are excluded from logs.
- Container scanning, SBOM, DAST, and IaC scanning are deferred until those assets exist. [ASM]

## 10. Governance & Compliance

Use GitHub Flow: short-lived branches and pull requests into `main`. Application changes require one reviewer and passing quality gates. [OBS]

Git history and CI results provide the prototype audit trail. No CAB, Kubernetes policy, or enterprise policy engine is needed. Privacy, WCAG 2.2 AA, secure token handling, and ownership tests remain required before public launch. [OBS]

## 11. Developer Experience

- Clone, install, seed JSON, and run frontend/backend locally with documented environment variables.
- Hot reload is provided by the selected React and NestJS development commands.
- Unit, integration, lint, typecheck, and build commands run locally before PR creation.
- Use stable test fixtures and shared typed API contracts.
- Target local setup under 15 minutes once scaffolding exists. [INF]

## 12. DORA Metrics & Continuous Improvement

Deployment metrics have no baseline because deployment does not yet exist. Initial targets are on-demand prototype releases, CI under 20 minutes, change failure below 15% after deployment, and restoration within one business day. [ASM]

Track CI duration, PR review time, flaky tests, dependency freshness, and vulnerability backlog. Review delivery friction at each milestone and revisit the strategy before adding hosting or database infrastructure. [INF]

## 13. Risks & Open Questions

| Item | Owner | Resolution |
|---|---|---|
| Hosting/provider/region configuration | Calin | Before deployment; BLK-003 |
| PostgreSQL replacement timing | Calin/Engineering | Before persistence integration |
| Multi-process JSON behavior | Engineering | Before scaling |
| Production secrets and privacy configuration | Calin | Before public launch |

Risks: premature infrastructure complexity, JSON concurrency limitations, insecure local cookie/CORS configuration, and insufficient authorization/accessibility tests. Mitigations are repository isolation, explicit local limits, security tests, and Playwright/axe checks. [INF]

## 14. References

- [PRD](../prds/gym-scheduler-prd.md)
- [HLD](../hlds/gym-scheduler-hld.md)
- [Test Strategy](test-strategy.md)
- [ADRs](../decisions/)
- [Glossary](../glossary.md)
- [Blocker Register](../hlds/gym-scheduler-blocker-register.md)
