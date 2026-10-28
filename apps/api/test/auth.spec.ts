import { Test } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../src/auth/auth.service';
import { JsonRepository } from '../src/repository/json.repository';

describe('AuthService', () => {
  let auth: AuthService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({ providers: [JsonRepository, AuthService] }).compile();
    auth = module.get(AuthService);
  });

  it('issues an access token and refresh token for the seeded user', () => {
    const result = auth.login('demo@gym.local', 'demo123');
    expect(result.accessToken).toEqual(expect.any(String));
    expect(result.refreshToken).toEqual(expect.any(String));
  });

  it('rotates refresh tokens and rejects reuse', () => {
    const first = auth.login('demo@gym.local', 'demo123');
    const second = auth.refresh(first.refreshToken);
    expect(second.refreshToken).not.toBe(first.refreshToken);
    expect(() => auth.refresh(first.refreshToken)).toThrow('Invalid refresh token');
  });

  it('rejects a demo-shaped token from the normal access-token verifier', () => {
    const token = jwt.sign({ sub: 'user-1', role: 'demo_member', demo: true }, process.env.JWT_SECRET ?? 'gym-scheduler-local-development-secret', {
      header: { typ: 'demo_access', alg: 'HS256' }
    });
    expect(() => auth.verifyAccessToken(token)).toThrow('Invalid access token');
  });
});
