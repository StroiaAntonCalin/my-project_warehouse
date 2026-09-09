# Ideation Raw Ideas: GYM_SCHEDULER

## Session Summary

- **Signal**: [`20260907-gym-scheduler.md`](../../../signal/signals/20260907-gym-scheduler.md)
- **Explore type**: Explore Readiness Check
- **Framings used**: Clear weekly plan; effortless weekly maintenance
- **Method**: Compressed ad-hoc divergence fallback; constraint-aware transformation
- **Guides**: Optional ideation guides unavailable because the Flow registry was unreachable
- **Total raw ideas**: 18
- **Directions selected for persistence**: 3
- **Persistence variants**: 15
- **Fixation interventions**: Category switching across planning, editing, saving, data, accessibility, responsive UX, onboarding, and value feedback

## Discovery grounding

The ideas are grounded in the approved context, domain analysis, technical feasibility, and compliance baseline. The product must support one authenticated user schedule, exactly seven weekday cards, exercise add/edit/remove actions, persistent confirmed saves, ownership checks, and accessible responsive web interactions. **[OBS]**

No personas, journey maps, market research, or standalone hypothesis were selected for this ERC, so no ideas claim evidence from those artifacts. **[OBS]**

## Flexibility pass

1. **[Planning]** Show all seven days in a weekly overview with each day’s exercises visible.
2. **[Planning]** Let users start with seven empty cards and add exercises directly inside the relevant day.
3. **[Planning]** Display a “today” highlight while keeping all seven cards available.
4. **[Editing]** Open each day card in inline edit mode rather than navigating to a separate page.
5. **[Editing]** Use a compact add-exercise row directly beneath the existing exercises.
6. **[Editing]** Provide quick edit and remove controls beside every exercise.
7. **[Editing]** Allow an exercise to be copied from one day to another.
8. **[Saving]** Use one clear Save button per day card.
9. **[Saving]** Show a visible “Saved just now” state after a successful update.
10. **[Saving]** Preserve unsaved form values when a network request fails.
11. **[Exercise data]** Start with exercise name as the only required field.
12. **[Exercise data]** Keep sets, repetitions, duration, and notes optional.
13. **[Exercise data]** Allow users to create their own exercise names instead of requiring a predefined catalog.
14. **[Accessibility]** Make every card, form, and action usable with keyboard navigation.
15. **[Accessibility]** Announce save success, validation errors, and removal confirmations to assistive technologies.
16. **[Responsive UX]** Use a single-column card layout on small screens and a multi-column layout on larger screens.
17. **[Onboarding]** After first login, show a short explanation of how the seven-day schedule works.
18. **[Membership value]** Ask for lightweight feedback after repeated use: “Is this helping you organize your workouts?”

## Persistence pass

The user selected the three directions most aligned with a fast, easy prototype: planning clarity, low-friction editing, and clear saving. Variants intentionally remain within the existing scope and avoid new integrations or complex synchronization.

### Direction A — Planning clarity

1. **Seven-card overview** — Render seven fixed weekday cards in one authenticated schedule view. What is new: the weekly plan is the primary screen rather than a day-by-day navigation flow. Serves the confirmed seven-card product rule and targets immediate plan comprehension.
2. **Empty-card starting point** — Create all seven cards when the schedule is first created, with a simple empty state and Add Exercise action in each. What is new: users can see the complete weekly structure before entering data. Supports the one-schedule/seven-card invariant.
3. **Today emphasis** — Add a visual “today” label to the corresponding card without hiding the other six days. What is new: daily relevance is added without changing the fixed weekly model. Requires only a local weekday calculation.
4. **Card summary view** — Show exercise names and a count of exercises in the collapsed card summary, with details available while editing. What is new: users can scan the week while keeping cards compact. Keeps the interface responsive as exercise counts grow modestly.
5. **Consistent weekday order** — Always render Monday through Sunday in a fixed order, independent of database insertion order. What is new: predictable scanning and simpler testing. Reinforces the domain rule that cards represent weekdays.

### Direction B — Low-friction editing

1. **Inline exercise row** — Add an exercise through a small form embedded in the selected day card. What is new: the user stays in context and avoids an extra page or modal. The exercise name is required; other fields are optional.
2. **Per-exercise quick actions** — Place Edit and Remove controls beside each assignment. What is new: common changes take one obvious action. Removal requires confirmation and remains keyboard accessible.
3. **Card edit mode** — Keep cards readable by default and expose fields only when Edit is activated. What is new: viewing and editing are separated without creating a complex navigation model. It supports a clear mobile layout.
4. **Copy within the week** — Offer a simple “Copy to another day” action for an existing assignment. What is new: repeated exercises need not be re-entered. This is optional and can be omitted if it threatens the prototype’s simplicity.
5. **Minimal exercise form** — Require only exercise name; reveal optional sets, repetitions, duration, and notes in the same form. What is new: the shortest path works for a basic exercise while richer details remain available. Supports incomplete user-generated data.

### Direction C — Clear and safe saving

1. **Card-level Save** — Each card has one Save action that submits its changed content. What is new: the save boundary is easy to understand and limits accidental broad updates. Fits explicit-save guidance.
2. **Saved status** — After a successful response, show “Saved” with a timestamp or relative time beside the card. What is new: the system confirms persistence without requiring the user to refresh.
3. **Recoverable failure** — If saving fails, retain entered values, show an actionable error, and allow retry. What is new: a temporary network failure does not erase the user’s work.
4. **Unsaved-change cue** — Mark a modified card as Unsaved until the server confirms the update. What is new: the user can distinguish local edits from persisted schedule data.
5. **Safe mutation policy** — Retry reads when appropriate, but never blindly retry an exercise add/remove write. What is new: the interaction design explicitly avoids duplicate assignments caused by network retries.

## Flagged ideas

- Copy within the week may add interaction and validation complexity; treat it as optional.
- Today emphasis is useful but not essential to the core prototype.
- Card-level saving could be replaced by one page-level Save if implementation proves simpler, but the boundary must remain clear.
- Feedback collection should not be added until privacy/disclosure handling and a meaningful measurement question are defined.

No idea was evaluated or ranked during generation. The next ideation action is convergence: compare the selected directions and their variants against impact, feasibility, risk, alignment, and compliance fit.

**Last Updated**: 2026-09-07  
**Status**: Generated; awaiting steering-team direction for convergence
