---
domain: GYM_SCHEDULER
source: ../explore-chatbot-account-access/domain-analysis.md
validated_by: Calin
explore_type: Fast Lane
evidence_label: OBS
---

# Architecture Engagement Brief: Chatbot Account Access

- HLD name: HLD - GYM_SCHEDULER Chatbot Account Access
- Slug: chatbot-account-access
- Engagement start: 2026-10-22
- Status: Draft - awaiting ARCH-B1a confirmation
- Architecture context: `[ASM]` No feature-specific `architecture-context.md` exists; individual approved Explore artifacts are used as fallback.

## Scope

`[OBS]` Confirm the architecture fit and boundaries for a local chatbot account-access prototype. The feature uses the existing React frontend, NestJS API, JSON repository, RAG retrieval path, and OpenAI response agent.

## Quality priorities

1. `[OBS]` Security boundary: local prototype only; no real accounts or public deployment.
2. `[OBS]` Deterministic account resolution before AI generation.
3. `[OBS]` Credential redaction from model context and normal responses.
4. `[OBS]` Preservation of existing JWT login and schedule ownership rules.
5. `[OBS]` Simple local operation with no remote database or event bus.

## Constraints

- `[OBS]` React + TypeScript frontend and NestJS + TypeScript backend.
- `[OBS]` Local JSON repository is the prototype source of truth.
- `[OBS]` One user owns one seven-day schedule.
- `[OBS]` Chatbot is available on the start page to all users.
- `[OBS]` OpenAI configuration remains server-side.
- `[OBS]` Username-only access is accepted only as a prototype behavior.

## Stakeholders and authority

| Role | Person | Authority |
|---|---|---|
| Product Owner | Calin | Product scope and acceptance |
| Architect | Calin | Boundaries and architecture decisions |
| Lead Engineer | Calin | Implementation feasibility and technical validation |

## Engagement depth

`[OBS]` Fast Lane adaptation applies:

- B.0 domain onboarding: skipped because the validated GYM_SCHEDULER domain profile is reused.
- B.1 context and design direction: confirmation-level boundary and design sketch.
- B.2 full HLD drafting: skipped for this prototype feature; reference existing GYM_SCHEDULER HLD and produce feature architecture artifacts only.
- B.3/B.4 full hardening and handoff: skipped; critical risks and blockers remain explicit.

## Required outputs

- Engagement brief, boundary map, truth hierarchy, design sketch.
- Decision log and blocker register.
- Architecture confirmation for implementation planning.

## Gate

ARCH-B1a requires Calin to confirm the scope, quality priorities, constraints, and Fast Lane depth before boundary mapping begins.

Last updated: 2026-10-22
