---
date: 20260907
title: "gym-scheduler"
state: Active
source: "User request"
type: "Opportunity"
severity: 3
resonance: 3
sponsor: "Product owner — user"
explore_type: "Explore Readiness Check"
---

## The Signal

Gym members need a way to create and manage their own gym schedule `[OPINION — rationale: this is the opportunity described in the user request]`.

## Initial Evidence

- A user requested a gym scheduler `[FACT — source: user, 20260907]`.
- The intended audience is gym members and individual users `[FACT — source: user, 20260907]`.
- The user wants a schedule with seven editable cards and the ability to add exercises `[ASSUMPTION — based on the initial product brief; needs validation]`.
- The user wants login before viewing the schedule `[ASSUMPTION — based on the initial product brief; needs validation]`.

## Why This Matters

Providing a personal scheduler may help users organize their gym activities in one place `[OPINION — rationale: this is the stated value of helping users have a scheduler]`.

The product owner states that the scheduler is intended to help the business `[FACT — source: product owner, 20260907]`.

The North Star outcome is to increase the value of gym memberships `[FACT — source: product owner, 20260907]`.

## Strengthened Context

- The product owner confirms sponsorship and approves exploring the opportunity `[FACT — source: product owner, 20260907]`.
- Initial success means a user can log in, create a weekly schedule, and add exercises `[FACT — source: product owner, 20260907]`.
- No deadline or additional constraints are currently known `[FACT — source: product owner, 20260907]`.
- The absence of a deadline means urgency is provisional and should be revisited if business timing changes `[ASSUMPTION]`.
- The target market is general individual gym users `[FACT — source: product owner, 20260907]`.
- The prototype is expected to follow standard account and personal-data protection practices, with no additional regulatory requirements identified `[FACT — source: product owner, 20260907]`.
- A small web team is assumed capable of building and operating the planned stack `[FACT — source: product owner, 20260907]`.
- The risk of not building the prototype soon is low because it is an exploratory prototype `[FACT — source: product owner, 20260907]`.

## Prioritisation

- **Importance: 3/5** — Moderate importance because the product owner states it should help the business `[FACT — source: product owner, 20260907]`.
- **Urgency: 3/5** — Some momentum because the product owner considers it needed for the business, but there is no deadline `[FACT — source: product owner, 20260907]`.
- **Position: Next** — Explore the opportunity now to clarify the product and assess feasibility before implementation `[OPINION — rationale: the concept is valuable but not pressing]`.

## Explore Type Scoring

| Explore Type | Score | Rationale |
|--------------|-------|-----------|
| Fast Lane | 3/5 | The core user and outcome are clear, but authentication, schedule behavior, and exercise modeling still need definition `[OPINION — rationale: based on current Signal gaps]` |
| Explore Readiness Check | 4/4 | Scope is moderately defined, the stack is conventional, sponsorship is confirmed, and several product details need validation `[OPINION — rationale: based on current Signal evidence]` |
| Diverge-Converge | 1/5 | No evidence currently indicates novel technology, major stakeholder disagreement, or a highly complex problem space `[OPINION — rationale: based on current Signal evidence]` |

**Selected Explore Type:** Explore Readiness Check `[OPINION — rationale: highest score and appropriate for a defined concept with unresolved product and feasibility details]`.

## Actors

| Actor | Role | Impact |
|-------|------|--------|
| Gym members / individual users | Intended scheduler users `[FACT — source: user, 20260907]` | May benefit from creating and managing a personal gym schedule `[OPINION — rationale: stated product intent]` |
| Product owner | Sponsor and decision-maker `[FACT — source: product owner, 20260907]` | Appetite for exploration is confirmed; measurable success targets remain open `[FACT — source: product owner, 20260907]` |

## Constraints

- The initial product brief assumes authentication is required before schedule access `[ASSUMPTION]`.
- The initial product brief assumes seven editable schedule cards `[ASSUMPTION]`.
- The technical stack is planned as React/TypeScript, NestJS/TypeScript, PostgreSQL, and Prisma `[ASSUMPTION — documented in explore/tooling.md; not yet implemented]`.

## Completion Criteria Status

- [x] 1. Fundamentals — Type, importance, source, duplicates resolved (Complete for initial capture; duplicate search remains limited to this warehouse)
- [x] 2. Evidence & Context — User-request evidence is recorded, no contradictions are known, and all claims are tagged (Complete for prototype scope)
- [x] 3. Framing & Meaning — Scope, actors, constraints, outcomes all clear (Complete for current scope)
- [x] 4. Strategic Alignment — Sponsor, North Star, target market, and regulatory boundary confirmed (Complete for prototype scope)
- [x] 5. Readiness & Feasibility — Prototype feasibility, data boundary, organisational readiness, urgency, and risk of inaction recorded (Complete for initial routing)
- [x] 6. Prioritisation — Importance 3/5 and urgency 3/5 include rationale; position is Next (Complete)
- [x] 7. Explore Type — Explore Readiness Check selected using comparative scoring (Complete)

## Completion Notes

| Date | Session | Changes |
|------|---------|---------|
| 20260907 | Initial capture | Captured the user request for a personal gym scheduler, intended users, initial evidence, and product assumptions. Sponsor, corroborating evidence, prioritisation rationale, feasibility, and routing require strengthening. |
| 20260907 | Strengthening | Confirmed the product owner, business value, provisional importance and urgency, initial success criteria, absence of deadline or constraints, and Explore Readiness Check as the selected Explore Type. |
| 20260907 | Route readiness | Confirmed Calin as approver, gym membership value as the North Star, general gym users as the target market, standard privacy expectations, prototype feasibility, and low risk of inaction. |

## Signal Summary

| Field | Content |
|------|---------|
| Problem | Gym members need a way to create and manage their own gym schedule `[OPINION — rationale: opportunity described by the product owner]` |
| Hypothesis | A personal scheduler may help users organize gym activities and help the business `[OPINION — rationale: stated product value]` |
| Confidence | Medium — direct product-owner request and sponsorship are confirmed, but evidence is limited to one request `[OPINION — rationale: evidence quality is adequate for discovery, not validation]` |
| Key Evidence | User requested a gym scheduler `[FACT — source: user, 20260907]`; intended audience is gym members and individual users `[FACT — source: user, 20260907]`; product owner approved exploration `[FACT — source: product owner, 20260907]` |
| Critical Assumptions | Seven editable cards represent the weekly schedule `[ASSUMPTION]`; login is required before schedule access `[ASSUMPTION]`; a personal scheduler helps the business `[ASSUMPTION — business outcome not yet measured]` |
| Actors | Gym members / individual users; product owner |
| Constraints | No deadline or additional constraints currently known `[FACT — source: product owner, 20260907]`; planned React/NestJS/PostgreSQL/Prisma stack is not yet implemented `[ASSUMPTION]` |
| Importance / Urgency | Importance 3/5 — helps the business `[FACT — source: product owner, 20260907]`; Urgency 3/5 — needed for the business but no deadline `[FACT — source: product owner, 20260907]` |
| Explore Type | Explore Readiness Check — highest comparative score at 4/4 `[OPINION — rationale: defined concept with unresolved product and feasibility details]` |
| Sponsor | Product owner — user; appetite confirmed for exploration `[FACT — source: product owner, 20260907]` |

## Routing Decision

**Decision:** Route to Explore

**Rationale:** The prototype opportunity has confirmed sponsorship, a defined target audience and initial outcome, and enough feasibility context to proceed with product and technical discovery `[OPINION — rationale: all route-readiness criteria are complete for the prototype scope]`.

**Approver:** Calin `[FACT — source: product owner, 20260907]`

**Date:** 20260907

**Suggested Explore Activities:** Context documentation, technical feasibility, domain analysis for schedules and exercises, lightweight personas, architecture analysis, and PRD generation `[OPINION — rationale: these activities validate the remaining product and implementation questions for an Explore Readiness Check]`.

**Timeline Expectation:** Lightweight discovery; exact duration to be agreed in the Explore Bundle `[ASSUMPTION]`.

### Route-Readiness Verification

| Criterion | Result | Notes |
|-----------|--------|-------|
| Signal Fundamentals | Pass | Opportunity type, source, provisional importance, and duplicate check recorded |
| Evidence and Context | Pass | Initial user-request evidence recorded; no contradictions known; claims tagged |
| Framing and Meaning | Pass | Users, prototype scope, constraints, and initial success outcome recorded |
| Strategic and Market Alignment | Pass | Calin confirmed sponsorship; North Star, market, and privacy boundary recorded |
| Readiness and Feasibility | Pass | Planned web team and stack considered feasible; risk of inaction is low |
| Prioritisation and Positioning | Pass | Importance 3/5, urgency 3/5, and Next position have rationales |
| Explore Type Recommendation | Pass | All three types scored; Explore Readiness Check selected |
