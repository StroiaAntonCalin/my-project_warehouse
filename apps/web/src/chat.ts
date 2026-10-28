export type ChatSource = 'openai' | 'local';
export type ChatMode = 'answer' | 'fallback' | 'demo_access' | 'error';

export type ChatResponse = {
  answer: string;
  source?: ChatSource;
  mode?: ChatMode;
  intent?: string;
  accountUsername?: string;
  accessIssued?: boolean;
  demoOnly?: boolean;
};

export type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
  response?: ChatResponse;
};

const fallbackAnswer = "I couldn't generate a safe response. Please try again.";

export function normalizeChatResponse(payload: unknown): ChatResponse {
  const value = typeof payload === 'object' && payload !== null ? payload as Record<string, unknown> : {};
  const answer = typeof value.answer === 'string' && value.answer.trim() ? value.answer.trim() : fallbackAnswer;
  const source = value.source === 'openai' || value.source === 'local' ? value.source : undefined;
  const mode = value.mode === 'answer' || value.mode === 'fallback' || value.mode === 'demo_access' || value.mode === 'error' ? value.mode : undefined;
  const intent = typeof value.intent === 'string' ? value.intent : undefined;
  const accountUsername = typeof value.accountUsername === 'string' ? value.accountUsername : undefined;
  const accessIssued = typeof value.accessIssued === 'boolean' ? value.accessIssued : undefined;
  const demoOnly = typeof value.demoOnly === 'boolean' ? value.demoOnly : undefined;
  return { answer, source, mode, intent, accountUsername, accessIssued, demoOnly };
}

export function errorChatResponse(): ChatResponse {
  return { answer: 'The assistant is unavailable right now. Please try again.', mode: 'error', source: 'local' };
}
