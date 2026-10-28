+++
[metadata]
task_id = "GYM0008"
title = "Implement deterministic chatbot account resolver"
status = "03-pending-implementation"
type = "implementation"

[sources]
epic = "../../../explore/epics/EPIC-GYM-005-chatbot-account-access.md"
documents = [
    "../../../explore/prds/chatbot-account-access-prd.md",
    "../../../explore/hlds/chatbot-account-access-design-sketch.md",
    "../../../explore/hlds/chatbot-account-access-decision-log.md",
    "../../../apps/api/src/repository/json.repository.ts",
    "../../../apps/api/src/auth/demo-access.service.ts"
]

[links]
blocks = ["GYM0009", "GYM0010"]
related = ["GYM0007", "GYM0003", "GYM0006", "GYM0012"]
parent = []
child = []

[workflow]
planned         = "2026-10-28"
spec_complete   = "2026-10-28"
implemented     = ""
impl_complete   = ""
completed       = ""

[assignments]
planning       = "anton-calin.stroia@endava.com"
implementation = ""
completed      = ""
+++

# Deterministic chatbot account resolver

## Problem

The chatbot needs a safe, deterministic way to resolve a requested username against local mock accounts before any AI response is generated.

## Goals

- Resolve exactly one known username.
- Reject unknown, duplicate, empty, or malformed usernames safely.
- Return a credential-free structured result.
- Preserve the existing User and Schedule ownership rules.

## Acceptance criteria

- [ ] Known unique usernames resolve to the correct user ID.
- [ ] Unknown and ambiguous usernames never produce an access result.
- [ ] Duplicate usernames are rejected as ambiguous; no token or account access is issued.
- [ ] Password and credential fields are excluded from the result.
- [ ] Unit and API tests cover success, failure, and edge cases.

## Non-goals

- Issuing JWTs or demo tokens.
- Changing normal login behavior.
- Adding remote persistence.
