# Risk Register: GYM_SCHEDULER

**Status**: Draft — minimal prototype risk assessment  
**Created**: 2026-09-07  
**Owner**: Calin  
**Evidence basis**: Approved context, technical feasibility, compliance baseline, journey map, and refined concept

## Risk Register

| Code | Risk | Impact | Likelihood | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|
| RISK-001 | Missing ownership checks could expose another user’s schedule. | High | Medium | Enforce ownership in every schedule API operation and add negative authorization tests. | Calin / Delivery team | Open |
| RISK-002 | Insecure password or JWT handling could compromise accounts. | High | Low | Use strong password hashing, HTTPS, secure session/token handling, and security review. | Calin / Delivery team | Open |
| RISK-003 | Seven cards may be difficult to use on small screens. | Medium | Medium | Stack cards responsively, test around 320px width, and avoid hover-only actions. | Delivery team | Open |
| RISK-004 | A failed save could cause users to lose entered exercises. | Medium | Medium | Preserve form values, show clear error state, and support intentional retry. | Delivery team | Open |
| RISK-005 | Exercise fields may be too limited or too complex. | Medium | Medium | Require only exercise name initially; keep other fields optional and validate with testers. | Calin | Open |
| RISK-006 | The prototype may not demonstrate increased membership value. | Medium | Medium | Measure task completion and collect a lightweight usefulness response before expanding scope. | Calin | Open |
| RISK-007 | Jurisdiction-specific privacy or accessibility requirements may be missed before public launch. | High | Medium | Keep the current release prototype-only and complete target-market legal review before public launch. | Calin | Deferred |

## Accepted Risks

No risks are formally accepted yet. The following prototype limitations are proposed for acceptance, pending product-owner review:

- No offline editing or live multi-device synchronization.
- No password recovery, social login, or MFA.
- No external gym, calendar, device, payment, or trainer integrations.
- No advanced analytics or curated exercise catalog.
- No target-market-specific legal certification for the internal demo.

These limitations are consistent with the approved prototype scope but should not be treated as acceptable for a public launch without renewed review. **[OBS]**

## Mitigation Tracking

| Mitigation | Related risks | Owner | Target point | Status |
|---|---|---|---|---|
| Add API ownership and cross-user denial tests. | RISK-001 | Delivery team | Before PRD completion | Planned |
| Decide secure JWT storage/session strategy. | RISK-002 | Calin / Delivery team | Before implementation | Open question |
| Test responsive and keyboard interactions. | RISK-003 | Delivery team | Before prototype acceptance | Planned |
| Implement saved, unsaved, saving, and recoverable error states. | RISK-004 | Delivery team | During frontend implementation | Planned |
| Validate minimum exercise fields with a tester. | RISK-005 | Calin | During prototype validation | Planned |
| Define usefulness question and task measures. | RISK-006 | Calin | Before analytics or evaluation | Planned |
| Select target market and review privacy/accessibility obligations. | RISK-007 | Calin | Before public launch | Deferred |

## Validation Scenarios

- Attempt to retrieve and update another user’s schedule; the API must deny the request.
- Submit invalid credentials and confirm safe, actionable feedback.
- Add/edit/remove an exercise, simulate a failed save, and confirm input remains recoverable.
- Complete the core flow at desktop and approximately 320px mobile width using keyboard navigation.
- Refresh and re-authenticate after a successful save; confirm the schedule persists.

## Enrichment Log

| Date | Update |
|---|---|
| 2026-09-07 | Created minimal risk register from approved discovery and ideation outputs. |

**Last Updated**: 2026-09-07  
**Prepared By**: Explore Agent, fallback mode due unavailable specialized skill
