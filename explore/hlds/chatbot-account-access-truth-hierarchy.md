---
domain: GYM_SCHEDULER
source: ../explore-chatbot-account-access/domain-analysis.md
validated_by: Calin
explore_type: Fast Lane
evidence_label: OBS
---

# Truth Hierarchy: Chatbot Account Access

Date: 2026-10-22  
Status: Validated  
Architect: Calin

## Authority classification

| # | Document | Classification | Authority | Evidence |
|---|---|---|---|---|
| 1 | [Chatbot Account Access PRD](../prds/chatbot-account-access-prd.md) | Canonical | Approved feature requirements, scope, and acceptance criteria | [OBS] PRD approval record |
| 2 | [Chatbot domain mapping](../explore-chatbot-account-access/domain-analysis.md) | Canonical | Feature terminology and mapped domain rules | [OBS] Reused validated domain |
| 3 | [GYM_SCHEDULER domain analysis](../explore-gym-scheduler/domain-analysis.md) | Canonical | Core entities, relationships, and domain rules | [OBS] Validated artifact |
| 4 | [Chatbot context](../explore-chatbot-account-access/context.md) | Canonical | Feature scope, stakeholders, and boundaries | [OBS] Explore Discovery |
| 5 | [Chatbot technical feasibility](../explore-chatbot-account-access/technical-feasibility.md) | Directional | Technical realities, opportunities, and guardrails | [INF] Discovery analysis |
| 6 | [Chatbot risk register](../explore-chatbot-account-access/risks.md) | Canonical for accepted prototype risks | Critical risks and mitigation expectations | [OBS] Approved PRD inputs |
| 7 | [Existing GYM_SCHEDULER HLD](gym-scheduler-hld.md) | Directional platform reference | Existing modular-monolith, repository, REST, and JWT conventions | [INF] Adjacent HLD |
| 8 | [Chatbot decision log](chatbot-account-access-decision-log.md) | Canonical for this engagement | Architecture decisions made in this engagement | [OBS] Architecture workflow |
| 9 | [Chatbot blocker register](chatbot-account-access-blocker-register.md) | Canonical for blockers | Open dependencies and gaps | [OBS] Architecture workflow |
| 10 | External OpenAI documentation | Directional | Provider capabilities and limits | [ASM] Not ingested in this local artifact set |

## Authority rules

- `[OBS]` PRD controls feature scope and acceptance.
- `[OBS]` Domain artifacts control terminology and business invariants.
- `[INF]` Existing HLD patterns guide implementation but may not override feature-specific boundaries.
- `[OBS]` Decision log controls architecture decisions after human approval.
- `[OBS]` Blocker register controls unresolved dependencies; open blockers are not silently treated as resolved.
- `[ASM]` No feature-specific architecture context exists; this is explicitly tracked as BLK-002.

## Validation checklist

- [x] Every input document is classified.
- [x] No unknown classification remains.
- [x] Canonical versus directional authority is explicit.
- [x] Missing architecture context is documented as an assumption/blocker.

Last updated: 2026-10-22
