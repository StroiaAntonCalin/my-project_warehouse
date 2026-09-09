# Technical Feasibility and Trends: GYM_SCHEDULER

**Project**: GYM_SCHEDULER  
**Created**: 2026-09-07  
**Last Updated**: 2026-09-07  
**Status**: Validated for prototype planning

---

## 1. System Context

### Existing Platforms

No existing GYM_SCHEDULER platform exists. This is a new prototype. The planned platform is owned by GYM_SCHEDULER and Calin owns product and technical decisions.

### Dependencies

| Dependency | Purpose | Version | Criticality | Update Frequency | Constraints |
|---|---|---|---|---|---|
| React + Vite | Frontend runtime and build | Current supported stable | High | Project-controlled | Browser compatibility |
| NestJS + Node.js | REST API runtime | Current supported stable | High | Project-controlled | Runtime/security updates |
| JSON mock-data repository | Prototype storage | Project-controlled | High | Project-controlled | File mutation and multi-user persistence are prototype limitations |
| PostgreSQL/Neon | Deferred real persistence | Later integration | Deferred | Provider/project-managed | Provider and schema decisions remain future work |
| GitHub Actions | CI validation | Current hosted service | Medium | Provider-managed | Secrets and workflow configuration |

### Integrations

| System | Purpose | Method | Data Flow | Owner | SLA | Constraints |
|---|---|---|---|---|---|---|
| NestJS API | Frontend/backend communication | REST/JSON over HTTPS | Bidirectional | GYM_SCHEDULER | Prototype target under 2 seconds for normal actions | API contract must remain consistent |
| JSON mock-data repository | Prototype persistence | Repository interface/file access | Bidirectional | GYM_SCHEDULER | Local file availability | Do not treat the file as production storage |
| Vercel/Render/Neon | Runtime hosting | Deployment/platform APIs | Outbound deployment, runtime access | GYM_SCHEDULER/provider | Provider-dependent | Regions and limits not yet selected |

### Technology Stack

**Frontend**:
- Framework: React with TypeScript
- State: Local React state initially; server state close to API calls
- Styling: Small project stylesheet or CSS Modules
- Build: Vite

**Backend**:
- Runtime/language: Node.js with TypeScript
- Framework: NestJS
- API: REST/JSON
- Authentication: Email/password with JWT access tokens

**Storage**:
- Prototype: JSON mock-data file behind a repository interface
- Later integration: PostgreSQL; ORM/migrations to be selected then
- Caching/search: None initially

**Infrastructure**:
- Hosting: Vercel frontend and Render backend remain future deployment options; no database provider is used by the prototype
- Containers: Docker for backend
- CI/CD: GitHub Actions
- Monitoring: Provider logs and basic structured application logs initially

### Deployment Context

- **Development:** Local frontend, backend, and JSON mock-data file.
- **Staging:** Recommended before prototype acceptance; isolated environment variables and data.
- **Demo/production:** Vercel, Render, and Neon; exact URLs to be defined.
- **Process:** GitHub Actions runs lint, tests, and builds; deployment follows passing checks.
- **Approval:** Calin approves prototype deployments.
- **Rollback:** Revert to the previous successful deployment.
- **Downtime:** No planned downtime for normal deployments.

---

## 2. Data Realities

### Data Availability

| Data Type | Source | Quality | Latency | Ownership | Availability | Access |
|---|---|---|---|---|---|---|
| Account data | User registration | Medium; input validation required | Near real-time | GYM_SCHEDULER | When service is available | Backend API/database |
| Schedule data | User actions | User-generated | Near real-time | User/GYM_SCHEDULER | When service is available | Authenticated API |
| Exercise data | User-entered | Medium; names may vary | Near real-time | User/GYM_SCHEDULER | When service is available | Authenticated API |
| Weekday reference | Application constants | High | Real-time | GYM_SCHEDULER | Always in app | Application code |

### Data Quality Issues

- Exercise names may be duplicated or inconsistent. Start with text entry and exact matching; consider normalization later.
- Workout details may be incomplete. Require exercise name first and keep sets, repetitions, and duration optional until tester feedback.

### Data Latency

- **Real-time:** Weekday reference data.
- **Near real-time:** Login, schedule reads/updates, exercise creation/assignment.
- **Batch:** None required.
- **Historical:** No historical analytics or archived workout data required.

**UX implications:** Show loading, saved, unsaved, and error states; do not promise live multi-device synchronization; support empty days and user-created exercises.

### Data Ownership

Users own their personal schedule content. GYM_SCHEDULER owns application structures, weekday reference data, and operational controls. Access is through authenticated API operations; no external data-access SLA exists.

### Data Gaps

- No exercise catalog exists. Workaround: allow user-created exercise names; create a catalog later if needed.
- No business analytics baseline exists. Workaround: define minimal usage events and product feedback before measuring membership value.
- No existing user research dataset exists. Workaround: use prototype testers to validate workflows.

---

## 3. Technical Constraints

### Authentication and Authorization

- Primary authentication: email/password with JWT access tokens.
- Role model: one Gym Member role for the prototype.
- Session persistence and exact token storage require security review; tokens must not be stored in browser storage.
- Every schedule operation must verify authenticated ownership.
- Social login, MFA, and password recovery are excluded from the prototype.

### Performance and Scale

- Target normal API response: under two seconds.
- Target initial page readiness: under three seconds on a typical connection.
- Prototype scale: small user population; concurrent-user target remains open.
- Schedule queries must be scoped and indexed by user ownership.

### Offline and Connectivity

- Offline editing is not required.
- The UI must show a clear network-error state and preserve recoverable form input.
- Explicit save is preferred initially to avoid ambiguous synchronization.

### Device and Platform

- Responsive mobile and desktop web.
- Current major browser versions.
- Keyboard and touch input.
- Minimum design width approximately 320px; responsive breakpoints around 768px and 1024px.
- No camera, GPS, wearable, or sensor dependency.

### API and Integration

- REST/JSON over HTTPS with consistent validation errors.
- No external business API rate limits currently apply.
- Use timeouts and safe retries for reads; avoid duplicate writes.
- API versioning strategy remains open; initial prototype may use a single versioned base path.

### Security

- HTTPS in transit; provider/database encryption capabilities to be verified.
- Strong salted password hashing and protected secrets. [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- Least privilege and ownership checks.
- Structured security logs with provisional 90-day retention.
- Accessibility and privacy constraints from [`regulatory-compliance.md`](regulatory-compliance.md).

### Legacy Systems

No legacy systems or migration constraints exist.

---

## 4. Technical Opportunities

### Automation

| Opportunity | Feasibility | Effort | Impact | Priority |
|---|---:|---:|---:|---|
| Generate seven cards when a schedule is created | High | Small | High | Must have |
| Add validation and save-state feedback | High | Small | High | Must have |
| Autosave draft edits | Medium | Medium | Medium | Later |

### AI/ML

Exercise recommendations or generated training plans are technically possible but require product validation, training/quality controls, and additional risk review. Feasibility is low for the prototype; effort is large; priority is deferred.

### Personalization

Persisting each user’s schedule and exercise assignments is highly feasible with existing data. It has high impact, small effort, and is a must-have. Privacy boundary: use data only for the user’s scheduler unless separately approved.

### Instrumentation and Analytics

Track login, schedule creation, exercise add/edit/remove, and return usage only if the privacy/disclosure approach supports it. Feasibility is high, effort small, impact medium, priority recommended. Avoid recording workout content unnecessarily.

### Real-Time Capabilities

Live synchronization across devices is not needed. WebSockets or SSE would add complexity without prototype value; feasibility is medium, effort medium, impact low, priority deferred.

### Progressive Enhancement

Responsive layout and touch-friendly controls are high-feasibility, small-effort, high-impact requirements. Drag-and-drop ordering is optional, medium feasibility, medium effort, and must preserve a keyboard-accessible alternative.

---

## 5. Technical Risks and Unknowns

### Technical Risks

| Risk | Likelihood | Impact | Consequence | Mitigation | Detection | Response | Owner | Status |
|---|---|---|---|---|---|---|---|---|
| Insecure JWT/password handling | Low | High | Account compromise | OWASP-aligned implementation and review | Security tests | Revoke sessions and rotate secrets | Calin | Open |
| Missing ownership check | Medium | High | Privacy breach | Centralized guards and negative tests | API tests | Disable access and investigate | Calin | Open |
| Rigid seven-day model | Low | Medium | Rework if scope changes | Keep day mapping explicit | Domain review | Revisit model | Calin | Open |
| Environment configuration drift | Medium | Medium | Failed deployment/runtime | Document environment variables and staging | Deployment checks | Roll back and correct config | Calin | Open |
| Duplicate writes from retries | Medium | Medium | Duplicate assignments or updates | Explicit save and safe retry rules | Integration tests | Reconcile affected records | Calin | Open |

### Technical Unknowns

| Unknown | Why It Matters | Resolution | Owner | Deadline | Priority |
|---|---|---|---|---|---|
| Secure JWT storage | Affects auth security | Security spike/review | Calin | Before implementation | High |
| Minimum exercise fields | Affects schema and forms | Domain/tester review | Calin | Before PRD | High |
| Concurrent-user target | Affects performance tests | Product/engineering decision | Calin | Before deployment | Medium |
| Provider regions and limits | Affects privacy and operations | Provider review | Calin | Before public launch | Medium |
| Analytics consent/event design | Affects privacy scope | Compliance/product review | Calin | Before analytics | Low |

### Technical Debt

- No password recovery: document as a prototype limitation and revisit before public use.
- Minimal exercise catalog: begin with user-entered names; normalize or curate later.
- No offline mode: retain clear network-error handling.
- Minimal monitoring: use provider logs first and add observability as usage grows.

### Scalability Concerns

The JSON mock-data file is adequate only for a single-process demo. Before real usage, integrate PostgreSQL and reassess capacity, concurrency, API rate limiting, monitoring, caching, and connection pooling.

### Integration Risks

- Frontend/backend API contract mismatch: mitigate with shared request/response examples and integration tests.
- Vercel/Render/Neon environment mismatch: mitigate with staging deployment and documented secrets.
- Provider region/terms mismatch: review before public launch.

---

## 6. Design Constraints and Guardrails

### Must Constraints

| Constraint | Rationale | Design Impact | Validation |
|---|---|---|---|
| Authenticate and authorize every schedule operation | Protect private data | Hide protected content and scope API calls | Authorization tests |
| Exactly seven day cards | Product rule | No card creation/deletion UI | UI and domain tests |
| Keyboard and screen-reader access | Accessibility baseline | Semantic controls and visible focus | Automated/manual checks |
| No passwords, JWTs, or secrets in logs/browser storage | Security | Constrains token and logging implementation | Security review |
| Explicit network/loading/error states | Near-real-time API dependency | Preserve input and communicate status | Component/API tests |
| No offline requirement | Prototype boundary | Do not design sync/conflict flows | Scope review |

### Should Constraints

- Keep exercise entry minimal: challenge only if testers need richer data.
- Prefer explicit Save before autosave: challenge if users lose work or usage requires continuous drafts.
- Keep the seven-card view central: challenge only for accessibility or small-screen usability.
- Prefer standard HTML controls: challenge only where a custom interaction has a keyboard alternative.

### Performance Guardrails

| Metric | Target | Maximum | Measurement |
|---|---:|---:|---|
| Initial page readiness | 3 seconds | 5 seconds | Lighthouse/manual test |
| Normal API response | 2 seconds | 5 seconds | Integration test/provider logs |
| Interactive feedback | Immediate state change | 300ms perceived response | Browser testing |
| Bundle growth | Review every release | No unreviewed large dependency | Build report |

### Data Guardrails

- Load one authenticated user’s seven cards together.
- No pagination needed for seven cards; paginate only if exercise lists grow materially.
- Do not cache private schedule data outside a securely scoped client session.
- Show saved/unsaved state and refresh after confirmed writes.

### Interaction Guardrails

- No optimistic updates for destructive actions.
- Confirm removal actions.
- Retry reads safely; do not blindly retry writes.
- Use inline validation and preserve input after recoverable errors.
- Avoid drag-only interactions; provide buttons or keyboard alternatives.

### Accessibility Guardrails

- Logical keyboard order, no traps, visible focus.
- Semantic headings, labels, errors, and dynamic status announcements.
- WCAG 2.2 AA contrast baseline.
- Touch targets approximately 44×44 CSS pixels or larger.

### Device Guardrails

- Support approximately 320px minimum width and common mobile/desktop sizes.
- Test portrait and landscape layouts.
- Do not rely on hover-only actions.
- Use responsive layout rather than requiring horizontal scrolling for core schedule actions.

---

## 7. Questions for Engineering

### System Context

1. Are any existing identity, hosting, or repository systems required? — Prevents duplicate platform work. Owner: Calin. Priority: Medium.
2. Which provider regions and account ownership model will be used? — Affects privacy and operations. Owner: Calin. Priority: Medium.

### Data

3. What minimum fields are required for an exercise assignment? — Defines schema and forms. Owner: Calin. Priority: High.
4. Does the prototype need a seeded exercise catalog or only user-entered exercises? — Affects data setup and UX. Owner: Calin. Priority: High.
5. What data export/deletion behavior is needed before public launch? — Affects privacy implementation. Owner: Calin. Priority: Medium.

### Performance

6. What concurrent-user target should be tested? — Defines useful load testing. Owner: Calin. Priority: Medium.
7. Are the two-second API and three-second page targets acceptable? — Aligns UX expectations and testing. Owner: Calin. Priority: Medium.

### Feasibility

8. What secure JWT storage and refresh strategy will be used? — Prevents session theft. Owner: Calin. Priority: High.
9. Should explicit Save remain the first release interaction? — Avoids autosave complexity and duplicate writes. Owner: Calin. Priority: High.
10. Which browser versions must be supported? — Defines test matrix. Owner: Calin. Priority: Medium.

### Integration

11. Should the API use a versioned base path from its first release? — Reduces future breaking-change risk. Owner: Calin. Priority: Low.
12. What deployment environment variables and secrets are required per environment? — Prevents configuration drift. Owner: Calin. Priority: Medium.

### Timeline

13. Is a staging environment required before the prototype demo? — Affects delivery setup. Owner: Calin. Priority: Medium.
14. What dependencies must be complete before implementation starts? — Protects the prototype scope. Owner: Calin. Priority: High.

---

## Related Artifacts

- **Context**: [`context.md`](context.md)
- **Domain Analysis**: [`domain-analysis.md`](domain-analysis.md)
- **Regulatory and Compliance**: [`regulatory-compliance.md`](regulatory-compliance.md)
- **Explore Bundle**: [`explore-bundle.md`](explore-bundle.md)
- **Architecture Context**: `architecture-context.md`
- **PRD**: `../../prds/gym-scheduler-prd.md`

---

**Last Updated**: 2026-09-07  
**Status**: Validated for prototype planning  
**Engineering Review Date**: 2026-09-07  
**Reviewed By**: Calin — Product Owner, Architect, and Lead Engineer
