# Architecture Blocker Register: GYM_SCHEDULER

**HLD**: HLD · GYM_SCHEDULER  
**Slug**: `gym-scheduler`  
**Engagement start**: 2026-09-07  
**Last Updated**: 2026-09-09  
**Open blockers**: 1

## B.3 Evidence Escalation

- Prototype-local assumptions were classified as `DEFERRED` or `RESOLVED` in [gym-scheduler-evidence-escalation.md](gym-scheduler-evidence-escalation.md).
- BLK-003 remains the only open significant blocker and is deployment-specific; it does not block local implementation. [OBS]

## Summary

| Severity | Open | Resolved |
|---|---:|---:|
| BLOCKER | 0 | 0 |
| SIGNIFICANT | 1 | 3 |
| MINOR | 0 | 1 |

## Resolved Blockers

### BLK-001 — Secure session strategy not selected

- **Discovered**: 2026-09-07 (B.1.1)
- **Category**: Implementation Gap
- **Description**: The PRD requires protected JWT/session handling, but the browser storage and refresh strategy is not selected.
- **Impact**: Authentication implementation cannot be finalized safely.
- **Owning team**: Calin / Delivery team
- **Resolution path**: Compare secure cookie/session options against the prototype deployment and document the selected approach before implementation.
- **Severity**: SIGNIFICANT
- **Related decisions**: None

**Status**: Resolved by DEC-004. Calin selected in-memory short-lived access JWTs with rotating Secure, HttpOnly, SameSite refresh cookies and backend-owned refresh/logout.

### BLK-002 — Exercise contract not finalized

- **Discovered**: 2026-09-07 (B.1.1)
- **Category**: Ambiguous Requirement
- **Description**: Exercise name is required, but optional fields and ordering/mutation semantics are not fully fixed.
- **Impact**: API and persistence contracts may need rework.
- **Owning team**: Calin / Delivery team
- **Resolution path**: Use the minimal name-first contract in the HLD and record optional fields and ordering as explicit implementation decisions.
- **Severity**: SIGNIFICANT
- **Related decisions**: None

**Status**: Resolved by DEC-005. Calin confirmed required name, optional validated fields, and explicit numeric order.

## Open Blockers

### BLK-003 — Deployment environment details are provisional

- **Discovered**: 2026-09-07 (B.1.1)
- **Category**: Unresolved Dependency
- **Description**: Provider regions, environment variables, staging need, and account ownership are not confirmed.
- **Impact**: Deployment and public-launch compliance configuration may change.
- **Owning team**: Calin
- **Resolution path**: Document a local/demo baseline now and confirm provider details before deployment/public launch.
- **Severity**: SIGNIFICANT
- **Related decisions**: None

## Resolved Blockers

### BLK-004 — Browser support matrix is open

- **Discovered**: 2026-09-07 (B.1.1)
- **Category**: Ambiguous Requirement
- **Description**: The product requires responsive current-browser web support, but exact browser versions are not specified.
- **Impact**: Test coverage scope remains approximate.
- **Owning team**: Calin / Delivery team
- **Resolution path**: Use current major desktop/mobile browsers as the prototype baseline and confirm before acceptance.
- **Severity**: MINOR
- **Related decisions**: None

**Status**: Resolved by DEC-006. The prototype supports latest major Chrome, Edge, Firefox, and Safari.

### BLK-005 — Local MongoDB to deployment PostgreSQL portability

- **Discovered**: 2026-09-09 (B.1.2)
- **Category**: Implementation Gap
- **Description**: The approved path uses MongoDB for local development but PostgreSQL for deployment.
- **Impact**: Schema semantics, migrations, query behavior, and test results may diverge. Deployment cannot be trusted without a validated migration path.
- **Owning team**: Delivery team / Calin
- **Resolution path**: Define a persistence abstraction, document the MongoDB-to-PostgreSQL mapping, run compatibility tests against both databases, and complete the migration before deployment.
- **Severity**: SIGNIFICANT
- **Related decisions**: DEC-002

**Status**: Resolved — superseded by DEC-003. The prototype will use JSON mock data and will not perform a MongoDB-to-PostgreSQL migration.

**Resolved by**: Calin  
**Resolution date**: 2026-09-09  
**Resolution**: Remove MongoDB from the prototype storage path and define a repository seam for future real persistence.

## Resolution Policy

No BLOCKER-severity items are open. Architecture can proceed with BLK-003 tracked as the only open significant blocker; it must be resolved before deployment or public launch. **[INF]**
