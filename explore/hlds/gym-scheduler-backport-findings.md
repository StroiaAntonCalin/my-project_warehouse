# Backport Findings — GYM_SCHEDULER

| # | Finding | Target Artifact | Section | Action |
|---|---|---|---|---|
| BF-001 | JSON storage is intentionally single-process and replaces the earlier database migration path | `explore/prds/gym-scheduler-prd.md` | Constraints / Open Questions | Keep JSON as prototype baseline and remove stale database wording when PRD is next revised |
| BF-002 | JSON concurrent-write limitation is an explicit implementation risk | `explore/explore-gym-scheduler/risks.md` | Risk register | Add a medium-risk entry with mitigation: single-process declaration and future repository replacement |
| BF-003 | `Schedule Card`, `Exercise Assignment`, and `Refresh Session` are implementation-facing terms used by the HLD | `explore/glossary.md` | Domain glossary | Add definitions during the next glossary refresh |
| BF-004 | Provider account, region, privacy, and deployment details remain unresolved | `explore/hlds/gym-scheduler-blocker-register.md` | BLK-003 | Resolve before deployment/public launch; no local-development impact |
