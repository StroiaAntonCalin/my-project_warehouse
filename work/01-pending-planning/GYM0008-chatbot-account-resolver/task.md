+++
[metadata]
task_id = "GYM0008"
title = "Implement deterministic chatbot account resolver"
status = "01-pending-planning"
type = "implementation"

[sources]
epic = "../../../explore/epics/EPIC-GYM-005-chatbot-account-access.md"
documents = ["../../../explore/prds/chatbot-account-access-prd.md", "../../../explore/hlds/chatbot-account-access-design-sketch.md"]

[links]
blocks = []
related = ["GYM0007", "GYM0003", "GYM0006"]
parent = []
child = []
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
