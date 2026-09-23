# Local RAG Chatbot

The prototype now includes a local RAG-style assistant on both the start page and the authenticated schedule page.

## Request flow

```text
POST /api/v1/chat
        ↓
JWT user identity
        ↓
JSON repository snapshot
        ↓
User-specific knowledge documents
        ↓
Keyword retrieval and ranking
        ↓
Grounded response + source records
```

The implementation is intentionally split into an explicit RAG-to-agent workflow:

1. `LocalRagRetriever` reads the repository data, converts records into knowledge documents, and ranks/selects the context.
2. `LocalRagService` orchestrates the request and passes only the retrieved context to the agent.
3. `LocalChatAgent` sends the question and retrieved context to the OpenAI Responses API and returns the model response plus the retrieved source records.

The current repository is JSON-backed for the prototype. A database repository can replace `JsonRepository` later without changing the retrieval-to-agent boundary.

## OpenAI configuration

Copy `.env.example` to `.env` and set a real server-side API key:

```text
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-5.2
```

The API key is loaded only by the NestJS backend. It is never sent to the React frontend. The `OPENAI_MODEL` value can be changed without code changes.

The start page uses `POST /api/v1/chat/public`, and the authenticated page uses `POST /api/v1/chat`. Both routes are available to all users without question restrictions. The public prototype assistant can retrieve the full contents of the mock dataset, including registered account fields and demo credentials.

The assistant reads from `data/mock-data.json`. It does not access MongoDB, MySQL, PostgreSQL, a vector database, or a remote AI provider.

## Example

Request:

```json
{ "message": "What exercises are in my Monday workout?" }
```

Response includes an answer and the retrieved source document:

```json
{
  "answer": "According to your schedule: Monday has 1 exercises: 1. Squat.",
  "sources": [{ "title": "Monday workout", "score": 3 }]
}
```

## Why this is called RAG

- Retrieval: schedule records are converted into small knowledge documents and ranked against the question.
- Augmentation: the selected documents become the answer context.
- Generation: the local response generator composes a grounded answer and refuses to answer when no context matches.

This keeps the prototype deterministic and private. A future local or hosted language model can replace `LocalRagService.generate()` without changing the API or retrieval boundary.
