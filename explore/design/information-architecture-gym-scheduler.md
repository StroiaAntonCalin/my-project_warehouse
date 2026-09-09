# Information Architecture: GYM_SCHEDULER

**Status**: Minimal prototype IA — draft  
**Created**: 2026-09-07  
**Concept**: Simple Weekly Board  
**Evidence basis**: Approved PRD, journey map, domain model, and compliance baseline

## Snapshot

The product has a small authenticated experience: a public Login page and one protected Weekly Schedule page. The Weekly Schedule page is the main destination and contains exactly seven weekday cards. **[OBS]**

## Organizing Principles

1. Keep the weekly plan visible in one place.
2. Keep editing actions close to the affected Schedule Card or Exercise Assignment.
3. Use canonical domain terms: Schedule, Schedule Card, Exercise, and Exercise Assignment.
4. Keep authentication separate from schedule content.
5. Make status, errors, and recovery visible without introducing extra navigation.

## Navigation Model

### Primary navigation

- **Weekly Schedule** — protected main page.

### Utility navigation

- **Log out** — available from the authenticated schedule page.

### Public access

- **Login** — unauthenticated entry page.

No secondary navigation is needed for the prototype. **[INF]**

## Sitemap

```text
GYM_SCHEDULER
├── Login
└── Weekly Schedule (protected)
    ├── Schedule Card: Monday
    ├── Schedule Card: Tuesday
    ├── Schedule Card: Wednesday
    ├── Schedule Card: Thursday
    ├── Schedule Card: Friday
    ├── Schedule Card: Saturday
    └── Schedule Card: Sunday
```

## Labeling and Taxonomy

| UI label | Meaning | Avoid |
|---|---|---|
| Weekly Schedule | The user’s single weekly plan | Planner, Dashboard |
| Schedule Card | One day section | Tile, Day box |
| Exercise | Reusable exercise information | Movement, Activity |
| Add Exercise | Create an assignment in a card | Add item |
| Save | Persist card changes | Submit, Apply |
| Remove Exercise | Delete an assignment after confirmation | Clear, Hide |

## Entry Points and Wayfinding

- Unauthenticated users enter at Login.
- Successful authentication routes to Weekly Schedule.
- Invalid or expired sessions return to Login without exposing schedule data.
- After saving, the user remains on Weekly Schedule and receives status feedback.
- After a recoverable error, the user remains in the current card with entered values preserved.

## Roles and Permissions Impact

| Role | Access |
|---|---|
| Individual Gym Member | Read and modify only their own Schedule, Schedule Cards, and Exercise Assignments. |
| Authentication System | Authenticates the user and supplies authorization context. |
| Product Owner | Product oversight; no separate application role in the prototype. |

Every protected route and schedule operation must enforce ownership. **[OBS]**

## Decisions Log

| Decision | Rationale | Evidence |
|---|---|---|
| Use one protected Weekly Schedule page. | Simplest path from login to the user’s main task. | Approved PRD/concept **[OBS]** |
| Keep exactly seven cards in fixed weekday order. | Directly represents the confirmed domain rule. | Domain analysis **[OBS]** |
| Avoid secondary navigation and separate exercise pages. | Reduces prototype complexity and preserves context while editing. | Ideation decision **[INF]** |
| Keep Log out as the only authenticated utility action. | Sufficient account lifecycle for the prototype. | PRD **[OBS]** |

**Last Updated**: 2026-09-07  
**Prepared By**: Explore Agent, inline fallback because the specialized IA skill was unavailable
