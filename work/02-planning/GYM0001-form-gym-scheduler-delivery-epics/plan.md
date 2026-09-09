# Plan: Form GYM_SCHEDULER Delivery Epics

## Epic Analysis Approach

Read the approved PRD, HLD, ADRs, Test Strategy, DevOps Strategy, risk register, accessibility specification, and glossary. Extract capabilities, requirements, architecture components, quality gates, and non-goals.

## Pattern Analysis Strategy

Inspect `explore/epics/` and its index. If fewer than three prior epics exist, use the installed epic template and approved capability boundaries.

## Capability Placement Logic

Group requirements by cohesive capability and ownership boundary. Keep Identity & Access separate from Schedule Management. Split any epic that would exceed 15 tasks.

## Epic Creation Process

Create future-state epic documents with requirements, outcomes, non-goals, acceptance criteria, dependencies, risks, and epoch structure. Do not include implementation code.

## Validation Approach

Check every R-XXX and NFR-XXX is mapped, terminology matches the glossary, HLD ownership is preserved, quality/security/accessibility work is represented, and deferred questions remain explicit.

## Indexing Strategy

Create or update `explore/epics/README.md` and link each epic to the PRD, HLD, strategies, and risks.
