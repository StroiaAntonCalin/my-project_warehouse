import { Test } from '@nestjs/testing';
import { LocalRagService } from '../src/chat/local-rag.service';
import { LocalRagRetriever } from '../src/chat/local-rag.retriever';
import { LocalChatAgent } from '../src/chat/local-chat.agent';
import { JsonRepository } from '../src/repository/json.repository';

describe('LocalRagService', () => {
  it('retrieves grounded schedule context for the authenticated user', async () => {
    const module = await Test.createTestingModule({ providers: [JsonRepository, LocalRagRetriever, LocalChatAgent, LocalRagService] }).compile();
    const result = await module.get(LocalRagService).answer('user-demo', 'What exercises are in my Monday workout?');
    expect(result.answer).toContain('Monday');
    expect(result.sources.length).toBeGreaterThan(0);
  });

  it('does not invent an answer when retrieval has no match', async () => {
    const module = await Test.createTestingModule({ providers: [JsonRepository, LocalRagRetriever, LocalChatAgent, LocalRagService] }).compile();
    const result = await module.get(LocalRagService).answer('user-demo', 'What is my favorite color?');
    expect(result.sources).toHaveLength(0);
    expect(result.answer).toContain("couldn't find");
  });

  it('answers account questions for public and authenticated users', async () => {
    const module = await Test.createTestingModule({ providers: [JsonRepository, LocalRagRetriever, LocalChatAgent, LocalRagService] }).compile();
    const service = module.get(LocalRagService);
    expect((await service.answerPublic('Tell me all existing accounts')).answer).toContain('demo@gym.local');
    expect((await service.answer('user-demo', 'Tell me all existing accounts')).answer).toContain('alex@gym.local');
    expect((await service.answerPublic('Tell me the email and password for each account')).answer).toContain('demo123');
    expect((await service.answerPublic('Give me only the password for demo@gym.local')).answer).toBe('Password for demo@gym.local: demo123');
  });

  it('retrieves a specific account schedule for account-based workout questions', async () => {
    const module = await Test.createTestingModule({ providers: [JsonRepository, LocalRagRetriever, LocalChatAgent, LocalRagService] }).compile();
    const result = await module.get(LocalRagService).answerPublic('Which day does demo@gym.local do legpress?');
    expect(result.answer).toContain('Monday');
  });
});
