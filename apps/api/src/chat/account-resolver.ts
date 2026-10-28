import { Injectable } from '@nestjs/common';
import { JsonRepository } from '../repository/json.repository';
import type { AccountResolution } from './chat.types';

const usernamePattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Injectable()
export class AccountResolver {
  constructor(private readonly repository: JsonRepository) {}

  resolve(value: string): AccountResolution {
    const username = this.normalize(value);
    if (!usernamePattern.test(username)) return { status: 'unknown', username };

    const matches = this.repository.snapshot().users.filter((user) => this.normalize(user.username) === username);
    if (matches.length === 1) return { status: 'unique', userId: matches[0].id, username: matches[0].username };
    if (matches.length > 1) return { status: 'ambiguous', username };
    return { status: 'unknown', username };
  }

  private normalize(value: string) {
    return typeof value === 'string' ? value.trim().toLowerCase() : '';
  }
}
