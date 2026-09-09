# Domain Analysis: GYM_SCHEDULER

**Project**: GYM_SCHEDULER  
**Created**: 2026-09-07  
**Last Updated**: 2026-09-07  
**Status**: Validated

---

## 1. Domain Glossary

| Term | Definition | Synonyms to avoid | Context | Example |
|---|---|---|---|---|
| User | Authenticated gym member who owns schedule data | Member account | Authentication and ownership | A user logs in |
| Schedule | The user’s single weekly training plan | Planner | Main product object | One schedule per user |
| Schedule Card | One daily section in a schedule | Day tile | Weekly schedule UI | Monday card |
| Exercise | A physical activity that can be planned | Movement | Exercise catalog | Squat |
| Exercise Assignment | An exercise placed on a specific day | Exercise, when placement matters | Workout details | Squat assigned to Monday |
| Membership Value | Perceived usefulness or benefit of the gym membership | Business value, unless specified | Product outcome | Scheduler improves membership value |
| JWT | Access token used to authorize API requests | Login token | Protected API access | API validates the JWT |

### Domain Actions

| Action | Definition | When Used | Example |
|---|---|---|---|
| Register | Create a user account | First account access | Register with email and password |
| Log in | Authenticate a user | Accessing protected content | Log in to view the schedule |
| Add Exercise | Create an exercise assignment on a day | Planning a workout | Add squat to Monday |
| Edit Schedule | Change card or exercise details | Updating a plan | Change repetitions |
| Remove Exercise | Delete an assignment from a day | Removing planned work | Remove deadlift from Friday |

### States and Statuses

| State | Definition | Applies To | Next States |
|---|---|---|---|
| Registered | Account exists after registration | User | Active |
| Active | Entity or account can be used | User, Schedule, Exercise | Updated, Deactivated, Retired |
| Empty | Schedule has seven cards but no assignments | Schedule | Configured |
| Configured | Schedule has at least one assignment | Schedule | Active |
| Planned | Exercise is assigned to a day | Exercise Assignment | Removed |
| Removed | Assignment no longer belongs to a day | Exercise Assignment | Terminal |
| Retired | Exercise is unavailable for new assignments | Exercise | Terminal for prototype |

### Roles and Actors

| Role | Definition | Responsibilities | Not to be confused with |
|---|---|---|---|
| Gym Member | Primary domain user | Own and manage one schedule | Product Owner |
| Authentication System | System actor | Verify credentials and issue JWTs | Gym Member |
| Product Owner | Product oversight role | Approve scope and evaluate value | Administrative schedule user |

---

## 2. Domain Model

### Core Entities

**User** — Core entity representing an authenticated gym member. Key attributes: `id`, `email`, `passwordHash`, `createdAt`. Owns exactly one Schedule. State: Registered, Active, Deactivated.

**Schedule** — Core entity representing a user’s weekly plan. Key attributes: `id`, `userId`, `createdAt`, `updatedAt`. Belongs to one User and contains exactly seven Schedule Cards. State: Empty, Configured, Active.

**Schedule Card** — Core entity representing one weekday. Key attributes: `id`, `scheduleId`, `day`, `title`, `notes`, `position`. Belongs to one Schedule and contains Exercise Assignments. State: Available, Updated.

**Exercise** — Reference entity representing reusable exercise information. Key attributes: `id`, `name`, `description`, `createdAt`. Is referenced by many Exercise Assignments. State: Available, Retired.

**Exercise Assignment** — Transactional entity representing an exercise placed on a day. Key attributes: `id`, `cardId`, `exerciseId`, `sets`, `repetitions`, `duration`, `order`. Belongs to one Schedule Card and references one Exercise. State: Planned, Removed.

### Supporting Entities

**Authentication Session** — Runtime authorization context represented by a JWT; it may not require persistent storage in the prototype.

### Reference Data

| Reference Type | Description | Examples | Source |
|---|---|---|---|
| Weekday | Fixed set of schedule days | Monday through Sunday | Product rule |
| Exercise category | Optional grouping for exercises | Strength, cardio, mobility | To be defined |

### Entity Relationship Diagram

```text
User (1)
  |
  |-- owns exactly one --> Schedule (1)
                         |
                         |-- contains exactly seven --> Schedule Card
                                                          |
                                                          |-- contains many --> Exercise Assignment
                                                                                   |
                                                                                   |-- references --> Exercise
```

---

## 3. Entity Lifecycle States

### User Lifecycle

- **Registered**: Account is created; exit on successful activation.
- **Active**: User may authenticate and manage their own schedule.
- **Deactivated**: Authentication is denied; terminal for the prototype.

Transitions: `Registered → Active → Deactivated`. Invalid transition: an unauthenticated or deactivated user cannot use protected schedule operations.

### Schedule Lifecycle

- **Empty**: Seven cards exist and no exercises are assigned; user may add assignments.
- **Configured**: At least one exercise assignment exists; user may continue editing.
- **Active**: Schedule is available for normal viewing and editing.

Transitions: `Empty → Configured ↔ Active`. No archive or delete flow is included.

### Schedule Card Lifecycle

- **Available**: Fixed weekday card exists and is editable.
- **Updated**: Card content or assignments changed; remains editable.

Transitions: `Available ↔ Updated`. Cards cannot be created or deleted by users.

### Exercise Lifecycle

- **Available**: Can be assigned to a card.
- **Retired**: Cannot be assigned to new cards; policy for existing assignments remains open.

### Exercise Assignment Lifecycle

- **Planned**: Assignment is attached to a card and can be edited.
- **Removed**: Assignment is deleted from the card; terminal for the prototype.

Invalid transitions include assigning without a valid card or exercise, accessing another user’s assignment, or adding a retired exercise.

---

## 4. Domain Rules and Constraints

### Business Rules

**BR-1: One Schedule per User** — Enforce a unique `Schedule.userId`; reject a second schedule.

**BR-2: Seven Fixed Weekdays** — Create exactly one card for each weekday; reject card creation or deletion through the product UI.

**BR-3: Own-Data Access** — Scope every schedule operation to the authenticated user; return an authorization error for another user’s data.

**BR-4: Valid Assignment** — An Exercise Assignment requires an existing Schedule Card and Exercise.

**BR-5: Ordered Assignments** — `order` is unique within a card; recalculate or reject conflicting values.

**BR-6: Basic Authentication** — Email/password authentication issues a JWT; social login, MFA, and password recovery are outside prototype scope.

### Constraints

| Constraint | Type | Impact | Rationale |
|---|---|---|---|
| One schedule per user | Business | Limits schedule creation | Prototype scope |
| Seven weekday cards | Business | Fixes primary schedule structure | Cards represent days |
| JWT-protected API | Technical | Requests require valid authentication | Simple protected access |
| Standard personal-data protection | Regulatory | Limits exposure and logging | Schedule data is personal |
| Web-only delivery | Business | No native mobile experience | Keeps prototype focused |

### Invariants

1. Every Schedule belongs to exactly one User; enforce with a foreign key and unique user ID.
2. Every Schedule has exactly seven Schedule Cards; enforce during schedule creation and validation.
3. Every Exercise Assignment belongs to one card and references one exercise; enforce with foreign keys.
4. A user can access only their own schedule; enforce in backend authorization checks.

### Calculations and Formulas

No domain calculations are required for the prototype. Workout volume or progress calculations are deferred.

### Validation Rules

| Entity/Field | Rule | Error Message | Severity |
|---|---|---|---|
| User.email | Must be valid and unique | Enter a valid email or use a different email. | Critical |
| User.password | Must meet the implementation security policy | Password does not meet the minimum requirements. | Critical |
| Schedule.userId | Must be unique | A schedule already exists for this user. | Critical |
| ScheduleCard.day | Must be one supported weekday | Select a valid day. | Critical |
| Exercise.name | Required | Enter an exercise name. | Critical |
| ExerciseAssignment.cardId/exerciseId | Both referenced records must exist | The exercise cannot be added to this day. | Critical |
| ExerciseAssignment.order | Non-negative and unique within card | Exercise order is invalid. | Warning |

---

## 5. User Roles and Responsibilities

### Role Definitions

**Gym Member** — Primary user responsible for one personal schedule.

- Create and access own account and schedule.
- Read, update, and remove own exercise assignments.
- Cannot access another user’s data or change the seven-day structure.

**Authentication System** — System role that verifies credentials, issues JWTs, and rejects invalid requests. It does not modify schedule content.

**Product Owner** — Oversight role that approves product scope and prototype acceptance. It is not an automatic administrator of private schedules.

### Role Relationships

- Gym Member → Authentication System: requests authentication.
- Gym Member → Schedule: manages personal schedule.
- Product Owner → Delivery Team: defines and approves scope.

### Permission Matrix

| Role | User | Schedule | Schedule Card | Exercise Assignment | Exercise |
|---|---|---|---|---|---|
| Gym Member | Create/read own | Read/update own | Read/update own | Create/read/update/delete own | Read |
| Authentication System | Read credentials for verification | None | None | None | None |
| Product Owner | Product oversight only | No automatic access | No automatic access | No automatic access | No automatic access |

---

## 6. Current State

### Current Processes

No GYM_SCHEDULER process exists yet; this is a prototype concept. The current gym-member planning workflow and tools are unknown, and no workaround has been evidenced.

### Current Systems

| System | Purpose | Limitations | Integration Points |
|---|---|---|---|
| GYM_SCHEDULER | Planned personal schedule platform | Not implemented | None currently |
| External fitness/calendar systems | No systems identified | Unknown | None planned |

### Current Data Flows

No current application data flow exists. The planned flow is user input → backend API → PostgreSQL.

### Known Pain Points

**Medium Priority: No confirmed personal scheduling workflow**

- Impact: Gym members may lack a focused way to organize workouts.
- Frequency: Unknown.
- Current mitigation: Unknown.

### What Works Well

- The desired outcome is clear: a member manages a weekly schedule and exercises.
- The initial scope is intentionally small: one user, one schedule, seven days, and basic authentication.

---

## 7. Domain Risks and Unknowns

### Unknowns

| ID | Unknown | Why It Matters | Resolution | Owner | Deadline | Priority |
|---|---|---|---|---|---|---|
| U-1 | Required exercise details | Determines forms and schema | Product-owner and tester review | Calin | Before PRD | High |
| U-2 | Reorder, duplicate, and move behavior | Defines core interactions | Workflow review with testers | Calin | Before development | Medium |
| U-3 | Account lifecycle beyond login | Defines auth scope | Product decision and technical review | Calin | Before PRD | High |
| U-4 | Membership-value metric | Makes business outcome measurable | Define usage or feedback measure | Calin | Before PRD | High |

### Assumptions

| ID | Assumption | Risk if Wrong | Validation | Status |
|---|---|---|---|---|
| A-1 | Basic email/password JWT authentication is sufficient | Auth scope expands | Compliance and feasibility review | NEEDS VALIDATION |
| A-2 | Users need no more than one schedule | Data model changes | Tester feedback | VALIDATED for prototype |
| A-3 | Seven cards represent the weekdays | Core UI redesign | Product-owner confirmation | VALIDATED |
| A-4 | No external integrations are needed initially | Architecture expands | Pilot feedback | VALIDATED for prototype |

### Domain Risks

| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|
| R-1 | Rigid schedule model becomes limiting | Low | Medium | Keep internal day mapping explicit | Calin | Open |
| R-2 | Exercise model lacks important details | Medium | Medium | Define minimum fields before implementation | Calin | Open |
| R-3 | Authentication requirements expand | Medium | Medium | Document and enforce prototype boundary | Calin | Open |

### Complexity Areas

1. **Exercise Assignment**: The same exercise can appear on multiple days with different workout details. Keep assignment-specific fields separate from the reusable Exercise record.
2. **Authorization**: Every schedule operation must be scoped to the authenticated User. Centralize ownership checks in the backend.

### Edge Cases

| Edge Case | Scenario | How to Handle | Priority |
|---|---|---|---|
| Second schedule | User attempts to create another schedule | Reject and return the existing schedule | High |
| Unauthorized schedule access | User requests another user’s schedule | Return authorization error without data | High |
| Empty day | Card has no exercises | Show an add-exercise action and empty state | Medium |
| Duplicate assignment | Same exercise added twice to one day | Allow only if product decision supports it; otherwise validate | Medium |
| Removed exercise | Exercise is removed while assignments exist | Define archive/reference policy before implementation | Medium |
| Expired JWT | User submits an expired token | Reject and require login again | High |

---

## 8. Domain Model Summary

### Core Entities (5 entities)

1. **User**: Authenticated owner of one Schedule.
2. **Schedule**: Weekly plan containing seven Schedule Cards.
3. **Schedule Card**: Daily container for Exercise Assignments.
4. **Exercise**: Reusable exercise reference data.
5. **Exercise Assignment**: Day-specific placement with workout details.

### Key Relationships

- User → Schedule: one-to-one; a user cannot create a second schedule.
- Schedule → Schedule Card: one-to-seven composition; cards represent weekdays.
- Schedule Card → Exercise Assignment: one-to-many composition.
- Exercise → Exercise Assignment: one-to-many reference relationship.

### Critical Business Rules (6 rules)

1. One schedule per user protects the prototype’s simple scope.
2. Seven fixed weekday cards define the weekly experience.
3. Own-data access protects private schedule data.
4. Assignments require valid card and exercise records.
5. Assignment order is unique within a card.
6. Basic email/password JWT authentication protects the API.

### Domain Complexity Drivers

1. Assignment-specific workout details must not be confused with reusable exercise data.
2. Ownership checks must apply consistently across nested schedule resources.
3. Account and exercise lifecycle decisions may affect persistence and UX.

### Implications for Product Design

1. Always show seven consistent day cards; do not expose card creation/deletion.
2. Make empty days easy to populate.
3. Show exercise details in the context of the selected day.
4. Communicate authentication and authorization failures without leaking data.

### Implications for Technical Architecture

1. Enforce one-to-one User/Schedule and seven-card invariants in the data and service layers.
2. Keep Exercise and Exercise Assignment separate to support day-specific details.
3. Centralize JWT validation and resource ownership checks in backend guards/services.

---

## 9. Assumptions to Validate

### High Priority — Before Design

1. **Exercise fields are sufficient for real workout planning** — Validate through product-owner review and tester walkthrough before Solution Design. Owner: Calin. Status: NEEDS VALIDATION.
2. **Basic email/password JWT authentication is sufficient** — Validate through compliance and technical feasibility review before PRD approval. Owner: Calin. Status: NEEDS VALIDATION.
3. **The schedule can increase perceived membership value** — Define usage and feedback measures before PRD approval. Owner: Calin. Status: NEEDS VALIDATION.

### Medium Priority — Before Development

4. **Users need only one schedule** — Validate with initial testers; owner Calin. Status: VALIDATED for prototype.
5. **Users need reorder, duplicate, or move actions** — Validate the workflow with gym members; owner Calin. Status: NEEDS VALIDATION.

### Low Priority — During Pilot

6. **No external calendar or fitness-device integrations are needed** — Collect pilot feedback; owner Calin. Status: VALIDATED for prototype scope.

### Validation Plan

| Activity | Method | Timeline | Owner | Dependencies |
|---|---|---|---|---|
| Exercise and schedule review | Product-owner review and tester walkthrough | Before Solution Design | Calin | Context baseline |
| Authentication and privacy review | Compliance and technical feasibility analysis | Before PRD approval | Calin | Context and domain model |
| Value measurement definition | Product decision and pilot feedback plan | Before PRD approval | Calin | Context baseline |
| Integration need review | Pilot feedback | During pilot | Calin | Prototype available |

---

## Related Artifacts

- **Signal**: [`../../signal/signals/20260907-gym-scheduler.md`](../../signal/signals/20260907-gym-scheduler.md)
- **Context**: [`context.md`](context.md)
- **Explore Bundle**: [`explore-bundle.md`](explore-bundle.md)
- **Glossary**: [`../glossary.md`](../glossary.md)
- **PRD**: [`../prds/gym-scheduler-prd.md`](../prds/gym-scheduler-prd.md)

---

**Last Updated**: 2026-09-07  
**Status**: Validated
