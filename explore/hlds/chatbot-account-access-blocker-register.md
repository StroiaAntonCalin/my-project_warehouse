# Blocker Register: Chatbot Account Access

- HLD: HLD - GYM_SCHEDULER Chatbot Account Access
- Slug: chatbot-account-access
- Engagement start: 2026-10-22
- Last updated: 2026-10-22
- Open blockers: 1

## Summary

| Severity | Open | Resolved |
|---|---:|---:|
| BLOCKER | 0 | 0 |
| SIGNIFICANT | 1 | 1 |
| MINOR | 0 | 0 |

## Open blockers

### BLK-001 - Demo session contract (resolved)

- Discovered: 2026-10-22 (B.1.1)
- Category: Ambiguous Requirement
- Description: `[OBS]` The PRD leaves open whether the prototype shows simulated access or issues a separately named demo token.
- Impact: The implementation cannot safely define the post-chat access state.
- Owning team: Calin / Architect
- Resolution path: Select simulated state or separate demo token; explicitly keep it distinct from normal JWT authentication.
- Severity: SIGNIFICANT
- Resolution: Calin selected a separate short-lived `demo_access` token, distinct from normal JWT authentication.
- Resolved by: Calin
- Resolution date: 2026-10-22
- Related decisions: DEC-005, DEC-008, DEC-009, DEC-010
- Status: Resolved

### BLK-002 - No feature-specific architecture context

- Discovered: 2026-10-22 (B.1.1)
- Category: Missing Upstream Contract
- Description: `[OBS]` No `architecture-context.md` exists for this feature; the architecture workflow must use individual Explore artifacts.
- Impact: Consolidated architecture-landscape evidence is unavailable, reducing confidence in cross-system assumptions.
- Owning team: Architect
- Resolution path: Continue with the documented fallback and create a feature architecture context if the scope expands beyond Fast Lane.
- Severity: SIGNIFICANT
- Status: Open and accepted for Fast Lane

## Architecture gate summary

`[OBS]` B.1 direction approved by Calin. The remaining blocker does not prevent prototype planning, but it prevents any production or public-deployment interpretation.

## Implementation readiness

`[OBS]` Not blocked from boundary mapping or design sketch. BLK-001 is resolved by DEC-005. The implementation contract is now recorded in DEC-008, DEC-009, and DEC-010; code implementation remains local-only and must pass the linked negative security and response-contract tests.

Last updated: 2026-10-23
