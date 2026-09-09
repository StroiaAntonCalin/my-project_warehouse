# Explore Bundle: GYM_SCHEDULER

## Overview

This Explore phase validates the product, domain, technical feasibility, and architecture for a prototype that lets authenticated gym members create weekly schedules with editable cards and exercises. The outcome is a PRD ready for Govern.

## Header

| Field | Value |
|------|-------|
| Status | Active |
| Created | 2026-09-07 |
| Explore Type | Explore Readiness Check |
| Steering Team | Calin — Product Manager, Architect, and Lead Engineer |
| Signal | [`20260907-gym-scheduler.md`](../../signal/signals/20260907-gym-scheduler.md) |

## Capability Areas in Scope

| Capability Area | In Scope | Description |
|----------------|----------|-------------|
| UX / UI | Yes | Login and editable schedule-card experience |
| Backend Services | Yes | Authentication, schedules, cards, and exercises |
| Data Layer | Yes | Users, schedules, cards, and exercises |
| Integrations | Partial | No external integrations in the prototype |
| Infrastructure | Partial | Hosting and delivery assumptions require validation |
| Security / Compliance | Yes | Account and personal-data protection |

## Explore Type Determination

| Explore Type | Score | Rationale |
|--------------|-------|-----------|
| Fast Lane | 3/5 | Core idea is clear, but schedule behavior and authentication need definition |
| Explore Readiness Check | 4/4 | Moderate scope, conventional technology, confirmed sponsorship, and open product details |
| Diverge/Converge | 1/5 | No evidence of novel technology or major stakeholder disagreement |

**Selected Type:** Explore Readiness Check — highest score and appropriate for a defined prototype with unresolved product and feasibility details.

## Selected Activities

| Code | Activity | Owner | Dependencies | Output |
|------|----------|-------|--------------|--------|
| A1 | Context Documentation | Calin / Product Manager | None | `context.md` |
| A3 | Targeted Domain Analysis | Calin / Product Manager + Architect | A1 | `domain-analysis.md` |
| A4 | Regulatory Compliance | Calin / Architect | A1 | `compliance.md` |
| A5 | Technical Feasibility | Calin / Lead Engineer | A1 | `technical-feasibility.md` |
| A9 | Architecture Analysis | Calin / Architect + Lead Engineer | A3, A5 | `architecture-context.md` |
| A11 | PRD Generation | Calin / Product Manager + Architect | A1, A3, A4, A5, A9 | `explore/prds/gym-scheduler-prd.md` |

Excluded by steering team: market research, personas, journey mapping, standalone hypothesis, and wireframing.

## Open Questions

- Does each user have one schedule or multiple schedules? — resolves in A3.
- Do the seven cards represent days of the week? — resolves in A3.
- What fields does an exercise require? — resolves in A3.
- Can users edit, delete, reorder, or duplicate exercises? — resolves in A3/A11.
- What authentication method and password-reset flow are required? — resolves in A4/A5.
- What business metric will indicate increased gym membership value? — resolves in A1/A11.

## Active Assumptions

| Code | Assumption | Risk if wrong | Validate in |
|------|------------|---------------|-------------|
| AS-1 | Seven cards represent the seven days of a week | Core UI and data model may need redesign | A3 |
| AS-2 | A schedule belongs to one authenticated user | Authorization and sharing requirements may expand | A3/A4 |
| AT-1 | React, NestJS, PostgreSQL, and Prisma are suitable for the prototype | Delivery effort or hosting may increase | A5/A9 |
| AO-1 | A small web team can build and operate the prototype | Scope or delivery timing may need adjustment | A5 |

## Risks

| Code | Risk | Impact | Likelihood | Mitigation |
|------|------|--------|------------|------------|
| R1 | Schedule model is too rigid | Medium | Medium | Validate domain rules in A3 |
| R2 | Authentication scope expands | Medium | Medium | Define minimum auth journey in A4/A5 |
| R3 | Business value is difficult to measure | Medium | Medium | Define success metrics in A1/A11 |
| R4 | Prototype hosting adds complexity | Low | Low | Validate deployment assumptions in A5/A9 |

## Expected Outputs

- Context document
- Schedule and exercise domain analysis
- Privacy and authentication considerations
- Technical feasibility assessment
- Architecture context
- PRD ready for Govern

## Constraints

| Type | Constraint |
|------|------------|
| Budget | To be determined during Explore |
| Resources | Calin currently covers Product Manager, Architect, and Lead Engineer roles |
| Technical | Planned React/TypeScript, NestJS/TypeScript, PostgreSQL, and Prisma stack |
| Compliance | Standard account and personal-data protection; no additional requirements currently identified |

## Checkpoints

| Milestone | Criteria |
|-----------|----------|
| Foundation complete | Context and success measures documented |
| Domain/feasibility review | Schedule model, authentication scope, and technical feasibility reviewed |
| Architecture review | Boundaries, data flow, and deployment approach aligned |
| Final milestone | PRD approved and ready for Govern |

## History

| Date | Change |
|------|--------|
| 2026-09-07 | Bundle approved; Explore Readiness Check and six activities selected |
