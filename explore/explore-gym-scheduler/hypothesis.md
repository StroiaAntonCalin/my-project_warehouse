# Hypothesis: GYM_SCHEDULER

**Status**: Draft — minimal prototype hypothesis  
**Created**: 2026-09-07  
**Evidence basis**: Approved Signal, context, domain analysis, technical feasibility, and refined ideation concept

## Core hypothesis

We believe that giving an authenticated gym member one simple weekly board with seven editable day cards will help them organize and maintain planned exercises, increasing the perceived value of their gym membership.

We will consider this direction promising if users can understand the weekly board, complete basic exercise-management tasks, and report that the scheduler is useful enough to return to.

## Target user

General individual gym members who want a simple place to organize planned weekly exercises. **[OBS]**

## User problem

Gym members need a clear, low-effort way to organize planned exercises across a week and update the plan when it changes. **[OBS]**

## Assumptions

| ID | Assumption | Status | Consequence if wrong | Validation |
|---|---|---|---|---|
| H-1 | Users understand a seven-card weekly board without extensive guidance. | Untested | Use a focused day editor or add onboarding. | Observe first-use task completion. |
| H-2 | Name-only exercise entry is sufficient for the first prototype. | Untested | Add richer exercise fields. | Product-owner and tester review. |
| H-3 | Direct editing is easier than a guided schedule builder. | Untested | Reconsider the interaction model. | Compare task completion and confusion in a short usability test. |
| H-4 | A useful personal scheduler can increase perceived membership value. | Untested | Do not expand the product without stronger evidence. | Ask repeat users a lightweight usefulness question. |

## Success measures

| Measure | Initial target | Method |
|---|---|---|
| Schedule comprehension | At least 4 of 5 prototype testers identify where to add an exercise for a named day without help. | Moderated task observation. |
| Core task completion | At least 4 of 5 testers complete add, edit, remove, and save tasks. | Prototype usability session. |
| Data protection | 100% of authorization tests prevent access to another user’s schedule. | Automated API tests. |
| Persistence | 100% of successful saves are visible after refresh or renewed login in test scenarios. | Integration and end-to-end tests. |
| Perceived usefulness | At least 3 of 5 testers answer that the scheduler helps organize their workouts. | One-question feedback prompt after use. |

## Scope boundary

This hypothesis does not assume payments, trainer/admin workflows, public sharing, native mobile apps, external integrations, social login, MFA, password recovery, or advanced analytics. **[OBS]**

## Validation plan

1. Build the smallest usable weekly-board prototype.
2. Ask gym-member testers to log in and manage exercises on two different days.
3. Observe comprehension, errors, completion, and recovery from a failed save.
4. Collect the usefulness response and review whether the result justifies further product investment.

**Last Updated**: 2026-09-07  
**Prepared By**: Explore Agent, fallback mode due unavailable specialized skill
