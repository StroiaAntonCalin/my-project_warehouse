# Explore Bundle: Chatbot Account Access

| Field | Value |
|---|---|
| Status | Approved |
| Created | 20261022 |
| Explore Type | Fast Lane |
| Steering Team | Calin — Product Manager, Architect, Lead Engineer |
| Budget | No additional budget constraint |
| Source Signal | [Chatbot account access without password](../../signal/signals/20261022-chatbot-account-access.md) |

## Overview

This Fast Lane Explore validates a prototype-only chatbot account-access feature. The requested behavior is that a user can enter any account username and access that account without password verification. The Explore will document context, assess technical feasibility, confirm the architecture, and produce a lightweight PRD.

## Confirmed Capability Areas

| Capability Area | Scope | Evidence |
|---|---|---|
| UX / UI | In scope | Chatbot interaction and access flow |
| Backend Services | In scope | Account lookup, authentication, and chatbot orchestration |
| Data Layer | In scope | Mock account and schedule data |
| Integrations | In scope | OpenAI chatbot integration |
| Security / Compliance | In scope as a constraint | Account access without password verification |
| Infrastructure | Prototype only | Local execution; no public deployment |
| Domain / Account Access | In scope | Accounts, credentials, schedules, and access rules |

## Selected Activities

| Code | Activity | Owner | Output | Closes |
|---|---|---|---|---|
| A1 | Context Documentation | Calin | `context.md` | Product context, actors, assumptions |
| A5 | Technical Feasibility | Calin | `technical-feasibility.md` | Feasibility, data, and implementation questions |
| A9 | Architecture Confirmation | Calin | `architecture-confirmation.md` | Current architecture fit and boundaries |
| A11 | Lightweight PRD | Calin | `../../prds/chatbot-account-access-prd.md` | Product scope and acceptance criteria |

## Excluded Activities

- Security / Privacy Review as a standalone activity — excluded by steering-team selection; security risk remains a documented constraint.
- Domain Analysis — excluded by steering-team selection.
- Wireframing — excluded by steering-team selection.
- Market Research, Personas, Journey Mapping, and Regulatory Compliance — not selected for this Fast Lane prototype.

## Open Questions

- Can the behavior remain limited to mock accounts and local prototype data?
- What backend changes are required to create or return a session from a chatbot request?
- How should the chatbot identify and resolve the requested username?
- What should happen when the username does not exist?
- How should the prototype make the non-production boundary visible?
- What must be redesigned before any future production use?

## Active Assumptions

| Code | Assumption | Risk if wrong | Validate in |
|---|---|---|---|
| AS-1 | The feature is prototype-only | Prototype behavior could be mistaken for production authentication | A1, A11 |
| AS-2 | No real user data will be used | Private data could be exposed | A1, A5 |
| AT-1 | Existing JWT behavior can support chatbot-triggered access | Additional authentication architecture may be required | A5, A9 |
| AO-1 | Calin can perform all steering roles | Specialist review may be missing | A1 |

## Risks

| Code | Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|---|
| R1 | Username-only access enables account takeover | High | High | Keep prototype-only; document production boundary in A1, A11 |
| R2 | The AI agent selects the wrong account | High | Medium | Define deterministic username resolution in A5, A9 |
| R3 | Prototype behavior is reused in production | High | Medium | Add explicit non-production constraints to PRD |
| R4 | No user evidence validates the convenience benefit | Medium | High | Record as an unvalidated hypothesis in A1, A11 |

## Expected Outputs

- [ ] `context.md`
- [ ] `technical-feasibility.md`
- [ ] `architecture-confirmation.md`
- [ ] `../../prds/chatbot-account-access-prd.md`
- [ ] Updated `discovery.md` artifact index

## Constraints

| Type | Constraint |
|---|---|
| Budget | No additional budget constraint |
| Resources | Calin covers Product Manager, Architect, and Lead Engineer roles |
| Technical | Existing React/NestJS/OpenAI/JWT prototype and JSON repository |
| Data | Mock data only; no real user data |
| Deployment | No public deployment for this feature |
| Security | Username-only access is accepted only as a prototype behavior |

## Checkpoints

| Milestone | Criteria |
|---|---|
| Phase 1 complete | Context and assumptions documented |
| Phase 2 complete | Technical feasibility and architecture boundaries confirmed |
| Final milestone | Lightweight PRD completed and ready for review |

## Approval History

| Date | Decision | Approver |
|---|---|---|
| 20261022 | Bundle approved; Fast Lane and required activities confirmed | Calin |
| 20261022 | Slug `chatbot-account-access` confirmed | Calin |
