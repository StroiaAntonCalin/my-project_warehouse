+++
[metadata]
task_id = "GYM0011"
title = "Implement chatbot demo-access frontend experience"
status = "04-implementing"
type = "implementation"

[sources]
epic = "../../../explore/epics/EPIC-GYM-005-chatbot-account-access.md"
documents = [
    "../../../explore/prds/chatbot-account-access-prd.md",
    "../../../explore/explore-chatbot-account-access/test-strategy.md",
    "../../../explore/hlds/chatbot-account-access-decision-log.md",
    "../../../explore/design/accessibility-gym-scheduler.md",
    "../../../explore/explore-gym-scheduler/test-strategy.md"
]

[links]
blocks = ["GYM0010", "GYM0009"]
related = ["GYM0004", "GYM0010", "GYM0012"]
parent = []
child = []

[workflow]
planned         = "2026-10-23"
spec_complete   = "2026-10-28"
implemented     = "2026-10-28"
impl_complete   = ""
completed       = ""

[assignments]
planning       = "anton-calin.stroia@endava.com"
implementation = "anton-calin.stroia@endava.com"
completed      = ""
+++

# Chatbot demo-access frontend experience

## Problem

The React chatbot needs to communicate successful, rejected, and fallback account-access results without implying production authentication.

## Goals

- Display a clear demo-only warning for access results.
- Handle loading, success, unknown, ambiguous, provider-failure, and fallback states.
- Preserve existing login and schedule navigation behavior.
- Support keyboard interaction, visible focus, labels, and announced status updates.

## Acceptance criteria

- [ ] Successful access displays the resolved demo account and prototype-only status.
- [ ] Demo access state displays: “Demo access only — local prototype; do not use real accounts.”
- [ ] Failure states do not expose passwords or other accounts.
- [ ] Provider fallback is distinguishable and understandable.
- [ ] Keyboard and accessibility checks pass.
- [ ] Frontend component tests and the selected E2E journeys pass.

## Non-goals

- Direct access to JSON data from the browser.
- Storing provider keys or normal credentials in the frontend.
