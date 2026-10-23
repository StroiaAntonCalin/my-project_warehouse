# Epic Formation Plan

## Epic analysis approach

1. Read the approved PRD and extract R-XXX and NFR-XXX requirements.
2. Cross-reference architecture components, decisions, blockers, and risks.
3. Group requirements by coherent future-state capability.
4. Ensure each group has a clear boundary and implementation outcome.

## Pattern analysis strategy

Review the existing authentication, schedule, exercise-management, and quality-foundation epics for naming, structure, epoch conventions, and acceptance-criteria style. Preserve the existing GYM_SCHEDULER vocabulary.

## Capability placement logic

- Create new epics for chatbot-specific capabilities not owned by existing schedule/auth epics.
- Amend an existing epic only when the capability is an inseparable extension of its ownership boundary.
- Keep demo-token isolation and resolver logic together only if their dependency remains coherent; otherwise split by ownership.
- Keep quality and regression coverage explicit rather than hiding it inside feature prose.

## Epic creation process

1. Analyze source material.
2. Review at least three existing epic patterns.
3. Decide new-versus-amend placement.
4. Draft epic shells and epochs.
5. Validate requirement, risk, and architecture traceability.
6. Update the epic index.
7. Run Govern readiness validation.

## Validation approach

- Check every R-XXX and NFR-XXX is mapped.
- Check boundaries match the approved design sketch.
- Check critical risks have mitigation acceptance criteria.
- Check DevOps is marked deferred rather than silently omitted.
- Check each epic remains future-state and implementation-plannable.

## Delivery allocation

The feature is intentionally unassigned to an iteration or release because it is a local prototype. No Jira key or deployment commitment exists. Govern planning must assign delivery allocation before implementation tasks are promoted out of pending planning.

## Indexing strategy

Add each new epic to `explore/epics/README.md` with capability, status, source PRD, and related architecture references. Link epics back to GYM0007 and the approved Explore artifacts.
