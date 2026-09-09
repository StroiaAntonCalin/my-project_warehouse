# Ideation Evaluation: GYM_SCHEDULER

## Session Summary

- **Signal**: [`20260907-gym-scheduler.md`](../../../signal/signals/20260907-gym-scheduler.md)
- **Explore type**: Explore Readiness Check
- **Framing**: Turn weekly intention into a clear plan; make weekly maintenance effortless
- **Evaluation mode**: ERC compressed comparison
- **Candidates evaluated**: 3
- **Selected for refinement**: Concept 1 — Simple Weekly Board

## Evaluation Criteria

| Criterion | Meaning | Weight |
|---|---|---|
| Impact | Helps users create and maintain a weekly plan | High |
| Feasibility | Fast and easy to build with the selected stack | Very high |
| Simplicity | Avoids unnecessary screens, rules, and dependencies | Very high |
| Alignment | Fits one user, one schedule, seven cards, and exercise editing | High |
| Safety and accessibility | Protects user data and supports accessible interaction | High / pass-fail |

No novelty or persona-fit score was used because market research and persona artifacts were not selected for this prototype. **[OBS]**

## Batch Evaluation

| Candidate | Impact | Feasibility | Simplicity | Alignment | Safety/accessibility | Rationale |
|---|---|---|---|---|---|---|
| 1. Simple Weekly Board | High | High | High | High | Pass | Directly implements the seven-card requirement with familiar editing actions and no extra navigation. **[OBS]** |
| 2. Focused Day Editor | Medium | High | Medium | High | Pass | Keeps implementation feasible but introduces a second editing context and can hide the weekly overview. **[INF]** |
| 3. Quick Schedule Builder | High | Medium | Medium | High | Pass | Makes first setup guided, but adds flow state and makes later free-form revision less immediate. **[INF]** |

The feasibility judgment is grounded in the technical-feasibility finding that a fixed seven-card model, user-entered exercise names, explicit saves, and responsive controls are high-feasibility prototype capabilities. **[INF]**

## Bias Checks

- **Anti-anchoring**: Concept 1 was generated first in the candidate comparison, so it was checked against the alternatives rather than accepted solely because of order.
- **Anti-fixation**: Candidates represented three different interaction structures: direct board, focused editor, and guided builder.
- **Anti-availability**: Concept 1 is familiar, but its selection is based on the confirmed seven-card requirement and prototype simplicity, not familiarity alone.
- **AI-specific homogeneity**: The concepts vary in navigation and setup model; the selected concept is the simplest, not merely a wording variation.

## Devil’s Advocate Analysis

### Concept 1 — Simple Weekly Board

- **Strongest argument against**: Seven cards may feel crowded on small screens.
- **Failure scenario**: Users cannot comfortably scan or edit cards on mobile.
- **Potential resistance**: Users who prefer a focused one-day-at-a-time view.
- **Mitigation direction**: Use responsive stacking, compact summaries, and accessible card-level edit actions.

### Concept 2 — Focused Day Editor

- **Strongest argument against**: It adds navigation and interaction complexity.
- **Failure scenario**: Users lose awareness of the rest of the week while editing.
- **Potential resistance**: The product owner may consider the extra flow unnecessary for a demo.

### Concept 3 — Quick Schedule Builder

- **Strongest argument against**: A guided flow may slow users who already know what they want.
- **Failure scenario**: Users cannot easily return to or revise a previous day.
- **Potential resistance**: Users who want immediate free-form editing.

## Shortlist Decision

**Selected for refinement**: Concept 1 — Simple Weekly Board

**Rationale**: It has the strongest direct alignment with the product owner’s confirmed requirement: seven frontend cards, each representing a day and supporting exercise editing. It also minimizes navigation, state complexity, and implementation effort while leaving room for responsive and accessible behavior.

**Deferred alternatives**: Concepts 2 and 3 remain useful future interaction variants but are not needed for the first prototype.

**Next step**: Refine the Simple Weekly Board into a concrete concept with user flow, constraints, risks, assumptions, validation approach, and implementation direction.

**Last Updated**: 2026-09-07  
**Status**: Concept selected; awaiting refinement phase
