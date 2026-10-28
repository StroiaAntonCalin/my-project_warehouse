import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { DemoAccessGuard } from '../src/auth/demo-access.guard';
import { DemoAccessService, type DemoAccountResolution } from '../src/auth/demo-access.service';

describe('DemoAccessService', () => {
  const originalEnv = { ...process.env };
  let service: DemoAccessService;

  beforeEach(() => {
    process.env.NODE_ENV = 'development';
    process.env.CHATBOT_DEMO_ACCESS_ENABLED = 'true';
    process.env.DEMO_ACCESS_SECRET = 'test-demo-secret';
    service = new DemoAccessService();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('issues the isolated demo contract for a unique resolver result', () => {
    const resolution: DemoAccountResolution = { status: 'unique', user: { id: 'user-1', username: 'demo@gym.local' } };
    const token = service.issue(resolution);
    const decoded = jwt.decode(token, { complete: true }) as { header: jwt.JwtHeader; payload: jwt.JwtPayload };

    expect(decoded.header.typ).toBe('demo_access');
    expect(decoded.payload).toEqual(expect.objectContaining({
      iss: 'gym-scheduler-demo', aud: 'gym-scheduler-demo-access', demo: true,
      role: 'demo_member', sub: 'user-1', username: 'demo@gym.local'
    }));
    expect((decoded.payload.exp ?? 0) - (decoded.payload.iat ?? 0)).toBe(15 * 60);
    expect(service.verify(token)).toEqual(expect.objectContaining({ sub: 'user-1', username: 'demo@gym.local' }));
  });

  it.each([{ status: 'unknown' as const }, { status: 'ambiguous' as const }])('does not issue for a $status resolver result', (resolution) => {
    expect(() => service.issue(resolution)).toThrow(UnauthorizedException);
  });

  it('rejects demo access when disabled or outside development', () => {
    process.env.CHATBOT_DEMO_ACCESS_ENABLED = 'false';
    expect(() => service.issue({ status: 'unique', user: { id: 'user-1', username: 'demo@gym.local' } })).toThrow(UnauthorizedException);

    process.env.CHATBOT_DEMO_ACCESS_ENABLED = 'true';
    process.env.NODE_ENV = 'production';
    expect(() => service.issue({ status: 'unique', user: { id: 'user-1', username: 'demo@gym.local' } })).toThrow(UnauthorizedException);
  });

  it('rejects expired and tampered tokens', () => {
    const token = service.issue({ status: 'unique', user: { id: 'user-1', username: 'demo@gym.local' } });
    const expired = jwt.sign({ sub: 'user-1', username: 'demo@gym.local', demo: true, role: 'demo_member' }, 'test-demo-secret', {
      expiresIn: -1, issuer: 'gym-scheduler-demo', audience: 'gym-scheduler-demo-access', header: { typ: 'demo_access', alg: 'HS256' }
    });
    expect(() => service.verify(expired)).toThrow(UnauthorizedException);
    expect(() => service.verify(`${token}tampered`)).toThrow(UnauthorizedException);
  });

  it('accepts a valid token only through the explicit demo guard', () => {
    const guard = new DemoAccessGuard(service);
    const request = { headers: { authorization: `Bearer ${service.issue({ status: 'unique', user: { id: 'user-1', username: 'demo@gym.local' } })}` } } as { headers: { authorization: string }; user?: unknown };
    const context = { switchToHttp: () => ({ getRequest: () => request }) } as never;

    expect(guard.canActivate(context)).toBe(true);
    expect(request.user).toEqual({ sub: 'user-1', username: 'demo@gym.local', role: 'demo_member', demo: true });
  });

  it('rejects missing or malformed bearer credentials', () => {
    const guard = new DemoAccessGuard(service);
    const context = (authorization?: string) => ({ switchToHttp: () => ({ getRequest: () => ({ headers: authorization ? { authorization } : {} }) }) }) as never;

    expect(() => guard.canActivate(context())).toThrow(UnauthorizedException);
    expect(() => guard.canActivate(context('Basic abc'))).toThrow(UnauthorizedException);
    expect(() => guard.canActivate(context('Bearer '))).toThrow(UnauthorizedException);
  });
});
