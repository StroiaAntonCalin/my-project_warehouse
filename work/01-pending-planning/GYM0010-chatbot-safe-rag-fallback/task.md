+++
[metadata]
task_id = "GYM0010"
title = "Implement safe chatbot orchestration and local fallback"
status = "01-pending-planning"
type = "implementation"

[sources]
epic = "../../../explore/epics/EPIC-GYM-005-chatbot-account-access.md"
documents = ["../../../explore/prds/chatbot-account-access-prd.md", "../../../explore/explore-chatbot-account-access/test-strategy.md", "../../../explore/hlds/chatbot-account-access-design-sketch.md"]

[links]
blocks = ["GYM0008"]
related = ["GYM0009"]
parent = []
child = []
+++

# Safe chatbot orchestration and local fallback

## Problem

The chatbot must combine deterministic account resolution, safe RAG context, and AI response generation without allowing the model to authorize access or receive credentials.

## Goals

- Resolve account identity before AI generation.
- Project only safe account and schedule fields into model context.
- Return a deterministic local response when OpenAI is unavailable or fails.
- Preserve clear handling for unknown, ambiguous, malformed, and prompt-injection requests.

## Acceptance criteria

- [ ] The agent is never asked to choose an account from raw account records.
- [ ] Password fields are absent from model context and normal responses.
- [ ] OpenAI 401, 429, network, and missing-key cases use the safe fallback.
- [ ] Fallback responses use `{ source: "local", mode: "fallback", message, intent, accountUsername?: string, accessIssued: boolean, demoOnly: true }`.
- [ ] Fallback output excludes passwords, password hashes, raw tokens, prompts, and provider error details.
- [ ] API tests cover provider success and failure paths.

## Non-goals

- Changing the existing RAG architecture beyond this feature boundary.
- Adding an event bus or remote database.
