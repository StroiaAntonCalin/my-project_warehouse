# Regulatory and Compliance Focus: GYM_SCHEDULER

**Project**: GYM_SCHEDULER  
**Created**: 2026-09-07  
**Last Updated**: 2026-09-07  
**Status**: Draft — jurisdiction-specific legal review pending

---

## 1. Applicable Standards and Policies

### By Region

No target market has been selected. No jurisdiction-specific legal conclusion is made here. Before public launch, Calin must select target markets and review applicable privacy, accessibility, breach, retention, and transfer requirements.

### By Industry

GYM_SCHEDULER is a general fitness scheduling product. No healthcare, financial, or other regulated-industry requirements are currently identified. Medical advice, diagnosis, payment, and health-record features are out of scope.

### By Data Type

| Data Type | Applicability | Handling Baseline |
|---|---|---|
| Personal data | Email, account metadata, and schedule data | Minimize collection, restrict access, define retention and deletion |
| Sensitive data | Not intentionally collected | Do not collect medical, biometric, location, or similar data |
| Health data | Not collected; exercise plans are not medical records in current scope | Add legal review if health or injury data is introduced |
| Financial data | Not collected | Payments are out of scope |
| Children’s data | Not intentionally targeted | Adult-oriented prototype until age and jurisdiction rules are reviewed |

### Baseline Standards

- WCAG 2.2 Level AA is the accessibility target. [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- Passwords must use strong salted hashing such as Argon2id, bcrypt, or PBKDF2; plaintext storage is prohibited. [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- Authentication and session handling should follow OWASP guidance, including secure token handling. [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- Privacy handling should follow data-minimization and storage-limitation principles until a jurisdiction is selected. [ICO data-protection principles](https://ico.org.uk/for-organisations/advice-for-small-organisations/getting-started-with-gdpr/data-protection-principles-definitions-and-key-terms/)

### Certification Requirements

No formal certification is required for the prototype. Provider security documentation, a security review, accessibility test evidence, and data-processing agreements should be assessed before public launch.

---

## 2. Data Handling Rules

### Data Collection

- Collect email and password only for account authentication.
- Collect schedule, card, exercise, and workout-detail data only to provide scheduling functionality.
- Do not collect medical, payment, biometric, precise-location, or unnecessary profile data.
- Explain collection purposes in a privacy notice before registration.
- Terms acceptance must be recorded before account creation.
- The prototype is not intentionally targeted at minors.

### Data Retention

| Data Type | Minimum Retention | Maximum Retention | Rationale |
|---|---|---|---|
| Account data | While account is active | Until deletion request or justified legal/business need | Required to authenticate the user |
| Schedule data | While account is active | Until account deletion or user request | Required to provide the service |
| Security/audit logs | Provisional 90 days | 90 days pending jurisdiction review | Support prototype security review |
| Consent records | While policy acceptance must be evidenced | Pending jurisdiction review | Demonstrate policy acceptance |

Deletion requirements, legal holds, and response timelines remain jurisdiction-dependent. The implementation must make account and schedule records identifiable for deletion.

### Data Access and Portability

- Users may view their own account and schedule data through the service.
- Users cannot access another user’s data.
- A self-service export is deferred until a target jurisdiction is selected; JSON is the proposed format.
- Hosting and CI providers receive only data needed to operate the service and must be reviewed as processors before public launch.

### Data Security

- Use HTTPS for all application traffic.
- Store passwords only as strong salted hashes.
- Protect JWTs and secrets; do not store tokens in `localStorage`, `sessionStorage`, or logs. [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- Enforce least privilege and ownership checks on every schedule operation.
- Log security events without passwords, raw JWTs, or unnecessary workout details.
- Document incident detection, containment, investigation, and jurisdiction-specific notification before public launch.

### Cross-Border Data Transfers

No approved countries or localization requirements are defined because the target market and provider regions are not selected. Before public launch, review provider locations, contractual safeguards, transfer mechanisms, and applicable localization rules.

---

## 3. Accessibility Requirements

### Applicable Standards

| Standard | Level | Applicability | Rationale |
|---|---|---|---|
| WCAG 2.2 | AA | All prototype users | Internationally recognized web accessibility baseline |
| EN 301 549 | TBD | If an EU-covered market or procurement context applies | Assess after target market selection |
| Section 508 | TBD | If a US government procurement context applies | Not currently evidenced |

### Legal Obligations

No jurisdiction-specific legal obligation has been established. Calin must select target markets before making a compliance claim.

### Baseline Requirements

- All functionality works by keyboard without traps.
- Focus indicators and logical focus order are visible and usable.
- Semantic HTML, accessible names, labels, and screen-reader announcements are used.
- Normal text meets 4.5:1 contrast and large text meets 3:1; meaningful UI components meet applicable WCAG contrast requirements.
- Do not communicate meaning through color alone.
- Text reflows on small screens and at 200% zoom without loss of functionality.
- Login, schedule cards, forms, dialogs, buttons, and errors are accessible.
- Icons and non-text content have appropriate text alternatives.

### Exemptions

No exemptions are proposed for the prototype.

### Testing Requirements

| Test Type | Frequency | Method | Owner |
|---|---|---|---|
| Automated | Every pull request | axe or equivalent plus unit/component checks | Delivery team |
| Keyboard | Before each release | Manual end-to-end review | Delivery team |
| Screen reader | Before prototype acceptance | NVDA, VoiceOver, or equivalent | Delivery team |
| User testing | When testers are available | Include users with disabilities where possible | Calin |

### Documentation

An accessibility statement is deferred until a target market and public-launch plan exist. No VPAT/ACR is required for the current prototype scope.

---

## 4. Copy and Disclosure Requirements

### Required Disclosures

**Privacy notice**:

- Show before registration and link from login and authenticated pages.
- Explain collected data, purposes, sharing, retention, deletion, and contact details.
- Use clear, plain language and record the effective version.

**Terms of Service**:

- Show before account creation and link from the application.
- Describe service limits, acceptable use, termination, and fitness disclaimer.
- Record acceptance with user, version, and timestamp.

**Cookie notice**:

- Required before non-essential cookies or analytics are introduced.
- No non-essential analytics or marketing cookies are planned for the prototype.

### Consent Mechanisms

| Data Use | Mechanism | Record |
|---|---|---|
| Essential authentication and scheduling | Clear notice and Terms acceptance | User, policy version, timestamp |
| Marketing | Not in scope | No collection |
| Analytics/non-essential cookies | Not in scope; opt-in if later introduced | Consent choice and version |
| Third-party sharing | Not in scope beyond service providers | Provider, purpose, and legal review |

Consent withdrawal and account deletion procedures must be defined before public launch.

### Mandatory Notices

- Authentication errors must not disclose whether an account exists unnecessarily.
- Material policy changes require a documented notification approach.
- Breach notification timing and content are jurisdiction-dependent.
- No price-change notices are needed because billing is out of scope.

### Prohibited Claims

| Claim | Alternative |
|---|---|
| “100% secure” | “Uses security measures appropriate to the prototype.” |
| “Prevents injury” | “Helps organize planned workouts.” |
| “Provides medical advice” | “Consult a qualified professional for medical or injury-related advice.” |
| “Guarantees fitness results” | “May help users organize their planned exercises.” |

### Required Warnings

Display a concise fitness disclaimer near exercise-planning features and link to the Terms of Service. Do not present exercise plans as medical advice.

---

## 5. Evidence Requirements

### Audit Logs

Log login success/failure, logout or token invalidation, consent acceptance, schedule creation/updates, exercise additions/edits/removals, authorization failures, security events, and configuration changes. Exclude passwords, raw JWTs, and unnecessary workout details.

### Log Requirements

- Structured and searchable format.
- Secure storage with encryption where supported.
- Access restricted to the delivery team’s operational roles.
- Actor, timestamp, action, result, and affected resource type included.
- Provisional prototype retention: 90 days, subject to jurisdiction review.

### Confirmations and Records

Store policy version, user ID, timestamp, and acceptance action. Retain deployment, dependency, security, and accessibility test evidence with project records.

### Proof of Compliance

- Accessibility results for keyboard, screen-reader, automated, and contrast checks.
- Security review covering password storage, JWT handling, authorization, and secrets.
- Privacy impact assessment if data scope expands.
- Data-processing agreements with relevant hosting providers before public launch.
- Formal certification and penetration testing are not required for the prototype but should be reassessed before production.

### Retention and Retrieval

Account and schedule records must be identifiable for deletion. Export is deferred; JSON is the proposed format. Legal holds, regulator response times, redaction rules, and definitive retention periods require jurisdiction-specific review.

---

## 6. Compliance Risk Register

| Priority | Risk | Likelihood | Impact | Consequences | Mitigation | Detection | Response | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|
| Critical | Password or token exposure | Low | High | Security, legal, and reputational harm | Strong hashing, HTTPS, secure token handling | Security review and logs | Revoke sessions, rotate secrets, investigate | Calin | Open |
| High | User accesses another schedule | Medium | High | Privacy breach and loss of trust | Ownership checks on every API operation | Authorization tests | Disable access, investigate, notify as required | Calin | Open |
| High | Unnecessary data retention | Medium | Medium | Privacy and operational risk | Minimize fields and define deletion | Data review | Delete excess data and update policy | Calin | Open |
| High | Accessibility barriers | Medium | Medium | Exclusion and possible legal risk | WCAG 2.2 AA baseline and testing | Automated/manual audits | Fix blockers before launch | Calin | Open |
| Medium | Missing or unclear disclosures | Medium | Medium | User confusion and compliance risk | Privacy/Terms review before registration | Content review | Publish corrected disclosures | Calin | Open |
| Medium | Sensitive information in logs | Low | Medium | Secondary exposure | Structured log review and redaction | Log inspection | Remove/redact exposed records | Calin | Open |
| Low | Provider transfer requirements unknown | Medium | Medium | Future compliance rework | Review regions and agreements | Provider review | Change provider or add safeguards | Calin | Open |

---

## 7. Non-Negotiables List

The following requirements block prototype launch:

- Passwords are never stored in plaintext; validation: code/database review; owner: Calin.
- HTTPS protects application traffic; validation: deployment review; owner: Calin.
- JWTs and secrets are protected and excluded from browser storage/logs; validation: security test; owner: Calin.
- Users can access only their own schedules; validation: automated authorization tests; owner: Calin.
- Privacy notice is available before registration; validation: product review; owner: Calin.
- Terms acceptance is recorded before account creation; validation: registration-flow test; owner: Calin.
- Login and scheduling work by keyboard and meet the WCAG 2.2 AA baseline; validation: automated and manual accessibility tests; owner: Calin.
- Logs exclude passwords, raw JWTs, and unnecessary personal data; validation: log inspection; owner: Calin.
- An incident response process exists before public launch; validation: operational review; owner: Calin.

Formal jurisdiction-specific legal review remains a blocker for public launch, not for internal prototype work.

---

## 8. Compliance Acceptance Criteria

### Data Collection and Consent

- [ ] Registration collects only required authentication data.
- [ ] Schedule data is used only for scheduling functionality.
- [ ] Terms acceptance records user, version, and timestamp.
- [ ] No medical, payment, location, or biometric data is collected.
- [ ] The prototype does not intentionally target minors.

### Data Retention and Deletion

- [ ] Account and schedule records can be identified for deletion.
- [ ] No unnecessary personal data is retained.
- [ ] Prototype logs use the provisional 90-day retention period.
- [ ] Account deletion behavior is documented before public launch.

### Data Security

- [ ] Passwords use strong salted hashing.
- [ ] Application traffic uses HTTPS.
- [ ] JWTs and secrets are not stored in browser storage or logs.
- [ ] Every schedule endpoint enforces ownership.
- [ ] Invalid and expired tokens are rejected.

### Accessibility

- [ ] Login and schedule flows work by keyboard.
- [ ] Inputs have accessible labels and errors.
- [ ] Focus order and visibility are usable.
- [ ] Contrast meets the WCAG 2.2 AA baseline.
- [ ] Automated and manual accessibility checks pass.

### Disclosures

- [ ] Privacy notice is available before registration.
- [ ] Terms are accepted before account creation.
- [ ] Fitness disclaimer appears near exercise-planning features.
- [ ] No unsupported medical, safety, or guaranteed-results claims appear.

### Audit and Evidence

- [ ] Login, consent, authorization failures, and schedule changes are logged.
- [ ] Logs exclude passwords, raw JWTs, and unnecessary workout details.
- [ ] Logs are structured and access-controlled.
- [ ] Accessibility and security test results are retained.

### Regional Compliance

- [ ] Target market is selected before public launch.
- [ ] Jurisdiction-specific privacy, accessibility, retention, transfer, and breach requirements are reviewed.
- [ ] Hosting-provider agreements and data locations are reviewed.

These criteria should be included in the PRD, QA plan, and definition of done.

---

## Related Artifacts

- **Context**: [`context.md`](context.md)
- **Domain Analysis**: [`domain-analysis.md`](domain-analysis.md)
- **Explore Bundle**: [`explore-bundle.md`](explore-bundle.md)
- **PRD**: [`../../prds/gym-scheduler-prd.md`](../../prds/gym-scheduler-prd.md)

---

**Last Updated**: 2026-09-07  
**Status**: Draft — awaiting jurisdiction selection and legal review  
**Approved By**: Calin for prototype baseline
