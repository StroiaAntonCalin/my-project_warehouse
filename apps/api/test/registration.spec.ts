import { Test } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { JsonRepository } from '../src/repository/json.repository';

describe('registration', () => {
  it('rejects duplicate seeded email and creates sessions for a new email', async () => {
    const repository = { findUser: jest.fn((username: string) => username === 'demo@gym.local' ? { id: 'user-demo', username, role: 'member', passwordHash: 'prototype-only' } : undefined), createUser: jest.fn((username: string, passwordHash: string) => ({ id: 'user-new', username, role: 'member', passwordHash })) };
    const module = await Test.createTestingModule({ providers: [AuthService, { provide: JsonRepository, useValue: repository }] }).compile();
    const auth = module.get(AuthService);
    expect(() => auth.register('demo@gym.local', 'another123')).toThrow('already exists');
    const result = auth.register(`new-${Date.now()}@gym.local`, 'another123');
    expect(result.accessToken).toEqual(expect.any(String));
  });
});
