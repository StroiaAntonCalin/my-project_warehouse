+++
[metadata]
task_id = "GYM0009"
title = "Implement isolated chatbot demo-access token"
status = "01-pending-planning"
type = "implementation"

[sources]
epic = "../../../explore/epics/EPIC-GYM-005-chatbot-account-access.md"
documents = ["../../../explore/prds/chatbot-account-access-prd.md", "../../../explore/hlds/chatbot-account-access-design-sketch.md", "../../../explore/hlds/chatbot-account-access-decision-log.md"]

[links]
blocks = ["GYM0008"]
related = ["GYM0003"]
parent = []
child = []
+++

# Isolated chatbot demo-access token

## Problem

The prototype needs a usable access state after deterministic account resolution without allowing username-only access to satisfy normal JWT authentication.

## Goals

- Define claims and expiry for a separately named `demo_access` token.
- Keep demo access structurally distinct from normal JWTs.
- Reject demo tokens on normal protected schedule routes unless explicitly supported by the approved prototype boundary.
- Document local-only feature behavior.

## Acceptance criteria

- [ ] `demo_access` uses `typ=demo_access`, `iss=gym-scheduler-demo`, `aud=gym-scheduler-demo-access`, `demo=true`, `role=demo_member`, resolved `sub`/`username`, `iat`, and a 15-minute `exp`.
- [ ] Demo token issuance requires a successful resolver result.
- [ ] Unknown or ambiguous users cannot receive a demo token.
- [ ] Normal JWT guards reject `typ=demo_access`; only explicitly opted-in routes use `DemoAccessGuard`.
- [ ] `CHATBOT_DEMO_ACCESS_ENABLED` defaults false and is accepted as true only in `NODE_ENV=development`.
- [ ] Expired, malformed, and missing demo tokens are rejected.
- [ ] Security and regression tests pass.

## Non-goals

- Replacing normal JWT login.
- Production password recovery or identity verification.
- Public deployment.
