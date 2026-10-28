import { Test } from '@nestjs/testing';
import { AccountResolver } from '../src/chat/account-resolver';
import { JsonRepository } from '../src/repository/json.repository';

describe('AccountResolver', () => {
  let resolver: AccountResolver;
  let repository: JsonRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({ providers: [JsonRepository, AccountResolver] }).compile();
    resolver = module.get(AccountResolver);
    repository = module.get(JsonRepository);
  });

  it('resolves a unique username using normalized exact matching', () => {
    expect(resolver.resolve('  DEMO@GYM.LOCAL ')).toEqual({ status: 'unique', userId: 'user-demo', username: 'demo@gym.local' });
  });

  it.each(['', '   ', 'demo', 'demo@', 'demo@gym', 'display name'])('returns unknown for malformed input: %s', (value) => {
    expect(resolver.resolve(value)).toEqual({ status: 'unknown', username: value.trim().toLowerCase() });
  });

  it('returns unknown for an account that does not exist', () => {
    expect(resolver.resolve('missing@gym.local')).toEqual({ status: 'unknown', username: 'missing@gym.local' });
  });

  it('returns ambiguous for duplicate normalized usernames', () => {
    const original = repository.findUser('demo@gym.local')!;
    repository.snapshot().users.push({ ...original, id: 'user-demo-duplicate', username: ' DEMO@GYM.LOCAL ' });

    expect(resolver.resolve('demo@gym.local')).toEqual({ status: 'ambiguous', username: 'demo@gym.local' });
  });

  it('returns only safe identity fields', () => {
    const result = resolver.resolve('demo@gym.local');
    expect(result).toEqual({ status: 'unique', userId: 'user-demo', username: 'demo@gym.local' });
    expect(result).not.toHaveProperty('password');
    expect(result).not.toHaveProperty('passwordHash');
    expect(result).not.toHaveProperty('token');
  });
});
