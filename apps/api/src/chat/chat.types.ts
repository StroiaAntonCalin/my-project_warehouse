export type ChatIntent = 'schedule_lookup' | 'account_lookup' | 'access_request' | 'unsupported';

export type AccountResolution =
  | { status: 'unique'; userId: string; username: string }
  | { status: 'unknown'; username: string }
  | { status: 'ambiguous'; username: string };

export type ChatSource = { id: string; title: string; text: string; score: number };

export type ChatResponse = {
  answer: string;
  sources: ChatSource[];
  source: 'openai' | 'local';
  mode: 'answer' | 'fallback' | 'error';
  intent: ChatIntent;
  accountUsername?: string;
  accessIssued: false;
  demoOnly: true;
};
