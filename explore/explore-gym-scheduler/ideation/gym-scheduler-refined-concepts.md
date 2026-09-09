# Ideation Refined Concepts: GYM_SCHEDULER

## Session Summary

- **Signal**: [`20260907-gym-scheduler.md`](../../../signal/signals/20260907-gym-scheduler.md)
- **Problem**: Gym members need a simple way to organize and manage weekly training activities.
- **Framing used**: Turn weekly intention into a clear plan; make weekly maintenance effortless
- **Methods used**: Compressed constraint-aware divergence and lightweight comparison
- **Total ideas generated**: 18 raw ideas and 15 persistence variants
- **Clusters formed**: 3 selected directions; formal clustering skipped for ERC
- **Candidates evaluated**: 3
- **Concepts refined**: 1
- **Loops completed**: 0
- **Fixation interventions**: Category switching across planning, editing, saving, data, accessibility, responsive UX, onboarding, and value feedback

## Discovery Evidence Used

- **Context baseline**: A greenfield prototype for an authenticated gym member with one seven-day schedule and editable exercise content. [`context.md`](../context.md)
- **Hypothesis**: No standalone hypothesis artifact was selected; the approved business direction is to increase perceived gym membership value through a useful personal scheduler. **[OBS]**
- **Personas**: Not selected for this Explore Readiness Check.
- **Journey maps**: Not selected; the user flow below is an ideation inference from the confirmed login → schedule → edit workflow. **[INF]**
- **Domain analysis**: User owns one Schedule; each Schedule contains exactly seven Schedule Cards; cards contain Exercise Assignments. [`domain-analysis.md`](../domain-analysis.md)
- **Market research**: Not selected; no competitive differentiation claim is made.
- **Technical feasibility**: Fixed seven-card model, user-entered exercise names, explicit saves, responsive controls, and recoverable network errors are feasible prototype capabilities. [`technical-feasibility.md`](../technical-feasibility.md)
- **Regulatory compliance**: Ownership checks, protected credentials/tokens, keyboard access, accessible errors/statuses, and minimal data collection are hard guardrails. [`regulatory-compliance.md`](../regulatory-compliance.md)

## Refined Concepts

### Concept 1: Simple Weekly Board

#### Description

After successful authentication, the user lands on one schedule page containing exactly seven fixed weekday cards, Monday through Sunday. Each card shows its exercises or an empty state. The user can add an exercise directly in the relevant card, edit an existing assignment, remove it with confirmation, and save changes using a clear card-level Save action.

The first release keeps the exercise form deliberately small: exercise name is required, while sets, repetitions, duration, and notes are optional. The interface shows unsaved, saving, saved, and recoverable error states. On small screens cards stack vertically; on larger screens they use a multi-column layout.

This matters because it puts the user’s weekly plan immediately in view and makes the common maintenance action—changing one day—local to that day. It satisfies the product’s seven-card requirement without adding a wizard, extra navigation, external integrations, or live synchronization. **[INF]**

#### Mechanism

1. User opens the login page and submits credentials.
2. The authenticated user lands on the weekly schedule board.
3. The backend returns the user’s one schedule and seven cards.
4. The user expands or edits a card, adds/updates/removes exercises, and sees local validation.
5. The user saves the card; the API validates ownership and persists the change.
6. The UI confirms success or preserves input for retry after a recoverable failure.

No journey map was created, so these are inferred touchpoints from the confirmed product flow rather than validated journey findings. **[INF]**

#### Value proposition

The primary beneficiary is the gym member, who gets a clear personal place to organize planned exercises and maintain them with minimal effort. The business receives a focused digital membership benefit that can later be evaluated through usage or lightweight feedback, without adding business-management features. **[INF]**

No persona artifact exists; this value proposition is grounded in the approved target of general individual gym users. **[OBS]**

#### Key differentiator

No market research was selected, so no market-based differentiator is claimed. Within this prototype, the differentiating direction is a deliberately focused experience: one authenticated weekly board with exactly seven editable day cards and minimal exercise-entry friction. **[INF]**

#### Constraints addressed

- **Hard constraints met**: authentication before schedule access; one schedule per user; exactly seven weekday cards; ownership checks; protected credentials/tokens; HTTPS; keyboard-accessible controls; and no excluded integrations or workflows.
- **Soft constraints met**: simple familiar interactions; explicit Save; user-entered exercise names with minimal optional details; and responsive mobile/desktop layout.
- **Constraints not met or deferred**: target market and jurisdiction-specific legal review; export/deletion details and definitive retention rules; and success metrics for increased membership value.

## Risk and Assumption Analysis

### Risks

| Risk | Likelihood | Impact | Mitigation | Discovery source |
|---|---|---|---|---|
| Seven cards are crowded on small screens. | Medium | Medium | Stack cards responsively, keep summaries compact, and test at approximately 320px width. | Technical feasibility |
| Missing ownership check exposes another user’s schedule. | Medium | High | Centralize authorization guards and add negative API tests. | Technical feasibility/compliance |
| Users lose edits after a failed save. | Medium | Medium | Preserve form state, show an actionable error, and support safe retry. | Technical feasibility |
| Exercise form becomes too large or unclear. | Medium | Medium | Require only name; keep additional fields optional and progressive. | Domain analysis/technical feasibility |
| Token handling creates session exposure. | Low | High | Decide secure cookie/session approach before implementation; exclude tokens from browser storage and logs. | Technical feasibility/compliance |
| Value to membership is not demonstrated. | Medium | Medium | Define a lightweight usage or feedback measure before adding analytics. | Context |

### Assumptions

- **[ASSUMPTION] AS-2 / Context Assumption 2 — one schedule per user**: Partially validated by the product-owner decision. If wrong, the data model and navigation must change. Validate through PRD sign-off.
- **[ASSUMPTION] Context Assumption 4 — basic workout details are sufficient**: Untested. If wrong, forms and schema may need richer fields. Validate with a prototype tester or product-owner review.
- **[ASSUMPTION] New — direct weekly-board editing is faster for target users**: Untested. If wrong, the focused editor may be preferable. Validate with a short usability walkthrough comparing add/edit completion time.
- **[ASSUMPTION] Context Assumption 1 — the scheduler can increase perceived membership value**: Untested. If wrong, the product should not expand functionality without evidence. Validate with repeat-use observation and a lightweight user question.

## Next Steps

### Validate

Test whether a user can understand the seven-card board and add an exercise to the correct day without guidance. Use a short clickable or coded prototype with add, edit, and remove tasks. Observe completion, confusion, and perceived effort.

### Prototype

Implement the minimum flow: login, authenticated schedule retrieval, seven fixed cards, name-only exercise add/edit/remove, card-level Save, and loading/saved/error states. Add responsive layout and keyboard checks from the start.

### Stakeholders

- Calin: product acceptance, exercise fields, authentication lifecycle, and success measure.
- Delivery team: API ownership checks, schema invariants, token/session handling, and test coverage.
- Available gym-member testers: usability and clarity feedback when identified.

### Decision point

Proceed if a tester can complete add/edit/remove/save tasks on desktop and small-screen layouts, the API prevents cross-user access, and core accessibility/security checks pass. Reconsider the interaction model if users consistently miss the correct day or cannot recover from save errors.

## Concept Comparison

| Dimension | Simple Weekly Board | Focused Day Editor | Quick Schedule Builder |
|---|---|---|---|
| Impact | High | Medium | High |
| Feasibility | High | High | Medium |
| Novelty | Low | Low | Low |
| Risk | Low | Medium | Medium |
| Time to validate | Short | Short | Short-medium |
| Key assumption | Users prefer direct weekly editing | Users need focused day context | Guided setup is faster than free-form editing |

## Steering Team Decision

- **Selected for pursuit**: Simple Weekly Board
- **Rationale**: It most directly satisfies the seven-card requirement and minimizes screens, state, and implementation effort for a demo prototype.
- **Immediate next step**: Carry this concept into Solution Design and define the PRD, user flows, acceptance criteria, and detailed implementation direction.

## Solution Design Seeding

- **Experience design direction**: A single authenticated weekly board with seven responsive cards, inline exercise editing, clear Save status, and accessible feedback.
- **Architecture implications**: Preserve Identity & Access and Schedule Management boundaries; enforce one schedule/seven cards and ownership at the API/database boundary; use explicit writes with safe retry behavior.
- **Risk areas**: Secure token/session handling, authorization tests, small-screen card density, recoverable save failures, and minimal-data compliance.
- **User flow implications**: Login → schedule load → select/edit card → add/edit/remove exercise → Save → confirmed or recoverable error.
- **Open questions for Solution Design**: Exact exercise fields; registration/logout scope; JWT storage/refresh; API version path; browser matrix; staging requirement; membership-value measure.
- **Discovery outputs**: [`context.md`](../context.md), [`domain-analysis.md`](../domain-analysis.md), [`regulatory-compliance.md`](../regulatory-compliance.md), [`technical-feasibility.md`](../technical-feasibility.md), [`architecture-context.md`](../architecture-context.md), [`gym-scheduler-framing.md`](gym-scheduler-framing.md), [`gym-scheduler-ideas-raw.md`](gym-scheduler-ideas-raw.md), and [`gym-scheduler-evaluation.md`](gym-scheduler-evaluation.md).

## Session Assessment

| Condition | Status | Result |
|---|---|---|
| Top candidates all from same cluster | No | Candidates used different interaction structures. |
| Best idea has inherent contradiction | No | No contradiction found with confirmed prototype constraints. |
| Team says “fine but not exciting” | No | The selected concept is intentionally optimized for speed and simplicity. |
| Refinement reveals missing parameters | Yes | Exercise fields, token strategy, browser matrix, and success measure remain open; carry them into Solution Design. |
| Novelty low across the board | Yes | Appropriate for this incremental prototype; no forced novelty loop is needed. |

**Last Updated**: 2026-09-07  
**Status**: Approved for Solution Design
