# Ideation Framing: GYM_SCHEDULER

**Signal**: [`20260907-gym-scheduler.md`](../../../signal/signals/20260907-gym-scheduler.md)  
**Explore type**: Explore Readiness Check  
**Created**: 2026-09-07  
**Status**: Approved for compressed ideation  
**Problem classification**: Semi-defined, narrow solution space, incremental novelty, simple complexity, fresh user state, greenfield context

## Discovery basis

The approved context describes a greenfield web prototype for authenticated gym members. Each user has one schedule with exactly seven day cards, and can add, edit, and remove exercises. The primary business outcome is increased perceived gym membership value. **[OBS]**

Exercise fields, account lifecycle details, save behavior, browser support, and success measurement remain open questions. **[INF]**

No standalone hypothesis, persona set, journey map, or market research artifact was selected for this Explore Readiness Check. **[OBS]**

## Problem classification

| Dimension | Classification | Reasoning |
|---|---|---|
| Definition level | Semi-defined | The core need and main features are clear, while several interaction and data details remain open. **[OBS]** |
| Solution space | Narrow | Login, one schedule, seven cards, and exercise editing create strong boundaries. **[OBS]** |
| Novelty needed | Incremental | The product uses familiar web and CRUD interactions; no novel technology is required. **[INF]** |
| Complexity | Simple | The light domain model has two bounded contexts and no external integrations. **[INF]** |
| User state | Fresh | The request is an early constructive opportunity, with no documented failed workflow. **[INF]** |
| Prior context | Greenfield | No existing application, database, or legacy integrations were found. **[OBS]** |

## Method routing

The normal ideation guides were unavailable because the Flow registry could not be reached. This ERC session therefore uses the documented compressed fallback:

1. **Constraint flip** — briefly question fixed rules to reveal simpler or safer alternatives, while preserving the confirmed product boundaries.
2. **Transform thinking** — improve familiar login, seven-card, and exercise-editing interactions by simplifying, combining, or removing unnecessary steps.
3. **Compressed divergence** — generate a small set of alternatives before selecting 1–3 actionable concepts.

This routing fits a simple, incremental, narrow problem and keeps the prototype focused. **[INF]**

## Framings explored

### Framing 1 — Turn weekly intention into a clear plan

**How might we help a gym member turn a weekly intention into a clear, editable workout plan?**

This framing treats planning clarity as the main user value. It makes the schedule, weekday structure, and exercise entry the center of the experience. It opens solutions that help a user quickly understand what to do on each day and adjust it when plans change.

### Framing 2 — Make weekly maintenance effortless

**How might we make a seven-day schedule feel effortless to maintain?**

This framing treats low friction as the main experience goal. It makes fast editing, visible saved states, responsive layout, keyboard access, and recoverable errors especially important. It opens solutions that reduce the effort of keeping a plan current.

### Framing 3 — Provide a digital membership benefit

**How might we provide a small but credible digital benefit that increases perceived gym membership value?**

This framing connects the prototype to the business outcome. It is useful for defining later measurement, but it should not expand the first release into payments, trainer workflows, analytics, or other excluded capabilities.

## Selected framings

The steering team selected **Framing 1** and **Framing 2**.

Together they establish this direction:

> Help a gym member create a clear weekly workout plan and keep it effortless to maintain through seven simple, editable day cards.

Framing 3 remains a business-outcome lens for evaluating concepts and later defining success measures; it is not a feature driver for the prototype. **[INF]**

## Constraints for ideation

### Hard constraints

- Authentication is required before schedule access.
- A user owns exactly one schedule.
- A schedule contains exactly seven weekday cards.
- Users can access and change only their own schedule data.
- Passwords, tokens, and secrets must be protected.
- Login and schedule flows must meet the agreed accessibility baseline.
- Payments, trainer/admin workflows, sharing, native mobile, and external integrations remain out of scope.

### Soft constraints

- Prefer simple, proven technologies and interactions.
- Use explicit save behavior initially rather than introducing autosave synchronization.
- Allow user-entered exercise names and keep exercise details minimal until tester feedback exists.
- Support responsive mobile and desktop web layouts.
- Preserve a path to later measure usage and perceived membership value without collecting unnecessary workout details.

## Success criteria for concept evaluation

- A gym member can understand the weekly plan at a glance.
- A gym member can add, edit, remove, and save exercises with low effort.
- A refreshed or renewed session retrieves the confirmed schedule.
- Users cannot access another user’s schedule.
- Login and schedule editing are keyboard usable and accessible.
- The concept remains small enough for a prototype and does not require external integrations.
- The concept can later support lightweight usage or feedback measurement aligned with membership value.

## Next phase input

The next compressed phase will generate alternatives using the selected “clear weekly plan” and “effortless maintenance” lenses. It will not evaluate ideas during generation. Evaluation and final concept selection will happen afterward with steering-team approval.

**Last Updated**: 2026-09-07  
**Approved By**: Calin — Product Owner, Architect, and Lead Engineer
