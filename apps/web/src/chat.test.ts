import { describe, expect, it } from 'vitest';
import { errorChatResponse, normalizeChatResponse } from './chat';

describe('chat response presentation contract', () => {
  it('whitelists supported metadata and ignores credentials or tokens', () => {
    const response = normalizeChatResponse({
      answer: 'Demo account found', source: 'local', mode: 'demo_access', intent: 'access_request',
      accountUsername: 'demo@gym.local', accessIssued: true, demoOnly: true,
      password: 'should-not-be-rendered', accessToken: 'should-not-be-rendered'
    });

    expect(response).toEqual({
      answer: 'Demo account found', source: 'local', mode: 'demo_access', intent: 'access_request',
      accountUsername: 'demo@gym.local', accessIssued: true, demoOnly: true
    });
    expect(response).not.toHaveProperty('password');
    expect(response).not.toHaveProperty('accessToken');
  });

  it('normalizes malformed provider payloads to a safe answer', () => {
    expect(normalizeChatResponse({ answer: '', mode: 'unknown', apiKey: 'secret' })).toEqual({
      answer: "I couldn't generate a safe response. Please try again.", source: undefined, mode: undefined,
      intent: undefined, accountUsername: undefined, accessIssued: undefined, demoOnly: undefined
    });
  });

  it('creates a generic UI error response', () => {
    expect(errorChatResponse()).toEqual({ answer: 'The assistant is unavailable right now. Please try again.', mode: 'error', source: 'local' });
  });
});
