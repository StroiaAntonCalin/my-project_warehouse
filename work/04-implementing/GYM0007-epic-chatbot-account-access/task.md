+++
[metadata]
task_id = "GYM0007"
title = "Form chatbot account-access delivery epics"
status = "04-implementing"
type = "epic-forming"

[sources]
epic = "../../../explore/epics/EPIC-GYM-005-chatbot-account-access.md"
documents = [
  "../../../explore/prds/chatbot-account-access-prd.md",
  "../../../explore/hlds/chatbot-account-access-hld.md",
  "../../../explore/hlds/chatbot-account-access-design-sketch.md",
  "../../../explore/hlds/chatbot-account-access-boundary-map.md",
  "../../../explore/explore-chatbot-account-access/risks.md",
  "../../../explore/explore-chatbot-account-access/test-strategy.md"
]

[links]
blocks = []
related = ["GYM0001", "GYM0006"]
parent = []
child = ["GYM0008", "GYM0009", "GYM0010", "GYM0011", "GYM0012"]
+++

# Form chatbot account-access delivery epics

## Problem statement

The approved chatbot account-access PRD and architecture package need to be transformed into coherent future-state epics that Govern can plan and implement. The epics must preserve the local-only prototype boundary, separate `demo_access` from normal JWT authentication, and include testable risk mitigations.

## Goals

- Create implementation-ready capability epics from the approved PRD.
- Map every functional and non-functional requirement to an epic.
- Preserve domain ownership and architecture boundaries.
- Include security, fallback, regression, and test-strategy acceptance criteria.
- Index the epics for Govern discovery.

## Acceptance criteria

- [ ] All approved PRD requirements are mapped to one or more epics.
- [ ] Each epic represents a coherent target future capability.
- [ ] No epic includes public deployment or production authentication bypass.
- [ ] Architecture and risk references are linked.
- [ ] Epic index is updated.
- [ ] Govern readiness validation is completed.

## Non-goals

- Implementing application code.
- Creating tasks for individual code changes.
- Designing DevOps strategy, which is explicitly deferred.
- Changing the approved PRD or architecture decisions.

## Constraints and dependencies

- Local JSON mock data only.
- Separate short-lived `demo_access` token.
- Deterministic username resolution before AI generation.
- No real credentials or public deployment.
- Existing JWT and schedule behavior must remain functional.

## References

- [PRD](../../../explore/prds/chatbot-account-access-prd.md)
- [Architecture confirmation](../../../explore/explore-chatbot-account-access/architecture-confirmation.md)
- [Design sketch](../../../explore/hlds/chatbot-account-access-design-sketch.md)
- [Risk register](../../../explore/explore-chatbot-account-access/risks.md)
- [Test strategy](../../../explore/explore-chatbot-account-access/test-strategy.md)

## Implementation task set

- GYM0008 - deterministic account resolver.
- GYM0009 - isolated `demo_access` token.
- GYM0010 - safe RAG orchestration and fallback.
- GYM0011 - chatbot access UI.
- GYM0012 - quality and regression tests.

These tasks are requirements-ready in `work/01-pending-planning/`; technical planning and stage movement remain Govern activities.
