import { Test } from '@nestjs/testing';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../src/auth/auth.service';
import { DemoAccessGuard } from '../src/auth/demo-access.guard';
import { DemoAccessService } from '../src/auth/demo-access.service';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { ChatController } from '../src/chat/chat.controller';
import { LocalChatAgent } from '../src/chat/local-chat.agent';
import { LocalRagRetriever } from '../src/chat/local-rag.retriever';
import { LocalRagService } from '../src/chat/local-rag.service';
import { AccountResolver } from '../src/chat/account-resolver';
import { JsonRepository } from '../src/repository/json.repository';

const contextFor = (request: unknown) => ({ switchToHttp: () => ({ getRequest: () => request }) }) as never;

describe('GYM0012 chatbot account-access regressions', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.NODE_ENV = 'development';
    process.env.CHATBOT_DEMO_ACCESS_ENABLED = 'true';
    process.env.DEMO_ACCESS_SECRET = 'regression-demo-secret';
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('keeps the public chat contract safe and rejects blank messages', async () => {
    const module = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [JsonRepository, AuthService, JwtAuthGuard, AccountResolver, LocalRagRetriever, LocalChatAgent, LocalRagService]
    }).compile();
    const controller = module.get(ChatController);
    const response = await controller.publicAsk({ message: 'Tell me all existing accounts' });

    expect(response.answer).toContain('demo@gym.local');
    expect(response.sources.every((source) => !/password|hash|token/i.test(source.text))).toBe(true);
    expect(response.accessIssued).toBe(false);
    await expect(controller.publicAsk({ message: ' ' })).rejects.toThrow(BadRequestException);
  });

  it('rejects ambiguous account schedule lookup without guessing', async () => {
    const repository = new JsonRepository();
    const original = repository.findUser('demo@gym.local')!;
    repository.snapshot().users.push({ ...original, id: 'duplicate-demo-user' });
    const module = await Test.createTestingModule({
      providers: [
        { provide: JsonRepository, useValue: repository },
        AccountResolver, LocalRagRetriever, LocalChatAgent, LocalRagService
      ]
    }).compile();

    const response = await module.get(LocalRagService).answerPublic('Which day does demo@gym.local do legpress?');
    expect(response.sources).toHaveLength(0);
    expect(response.answer).toContain("couldn't find");
    expect(response.accessIssued).toBe(false);
  });

  it.each([
    { name: 'wrong issuer', issuer: 'other-issuer', audience: 'gym-scheduler-demo-access', role: 'demo_member', demo: true },
    { name: 'wrong audience', issuer: 'gym-scheduler-demo', audience: 'other-audience', role: 'demo_member', demo: true },
    { name: 'wrong role', issuer: 'gym-scheduler-demo', audience: 'gym-scheduler-demo-access', role: 'member', demo: true },
    { name: 'wrong marker', issuer: 'gym-scheduler-demo', audience: 'gym-scheduler-demo-access', role: 'demo_member', demo: false }
  ])('rejects a token with $name', ({ issuer, audience, role, demo }) => {
    const service = new DemoAccessService();
    const token = jwt.sign({ sub: 'user-1', username: 'demo@gym.local', role, demo }, process.env.DEMO_ACCESS_SECRET!, {
      issuer, audience, expiresIn: '15m', header: { typ: 'demo_access', alg: 'HS256' }
    });

    expect(() => service.verify(token)).toThrow(UnauthorizedException);
  });

  it('rejects demo access when disabled or outside development', () => {
    const service = new DemoAccessService();
    const resolution = { status: 'unique' as const, user: { id: 'user-1', username: 'demo@gym.local' } };
    process.env.CHATBOT_DEMO_ACCESS_ENABLED = 'false';
    expect(() => service.issue(resolution)).toThrow(UnauthorizedException);
    process.env.CHATBOT_DEMO_ACCESS_ENABLED = 'true';
    process.env.NODE_ENV = 'test';
    expect(() => service.issue(resolution)).toThrow(UnauthorizedException);
  });

  it('keeps normal JWT authorization isolated from demo tokens', () => {
    const auth = new AuthService(new JsonRepository());
    const guard = new JwtAuthGuard(auth);
    const token = jwt.sign({ sub: 'user-1', role: 'demo_member', demo: true }, process.env.JWT_SECRET ?? 'gym-scheduler-local-development-secret', {
      header: { typ: 'demo_access', alg: 'HS256' }
    });

    expect(() => guard.canActivate(contextFor({ headers: { authorization: `Bearer ${token}` } }))).toThrow(UnauthorizedException);
  });

  it('accepts a valid demo token only through DemoAccessGuard', () => {
    const service = new DemoAccessService();
    const token = service.issue({ status: 'unique', user: { id: 'user-1', username: 'demo@gym.local' } });
    const guard = new DemoAccessGuard(service);
    const request = { headers: { authorization: `Bearer ${token}` } } as { headers: { authorization: string }; user?: unknown };

    expect(guard.canActivate(contextFor(request))).toBe(true);
    expect(request.user).toEqual({ sub: 'user-1', username: 'demo@gym.local', role: 'demo_member', demo: true });
  });
});
