import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHash, randomBytes } from 'node:crypto';
import * as jwt from 'jsonwebtoken';
import type { User } from '@gym-scheduler/contracts';
import { JsonRepository } from '../repository/json.repository';

type RefreshSession = { userId: string; expiresAt: number };

@Injectable()
export class AuthService {
  private readonly sessions = new Map<string, RefreshSession>();
  private readonly secret = process.env.JWT_SECRET ?? 'gym-scheduler-local-development-secret';
  private readonly refreshLifetimeMs = 7 * 24 * 60 * 60 * 1000;

  constructor(private readonly repository: JsonRepository) {}

  login(username: string, password: string) {
    const user = this.repository.findUser(username);
    if (!user || password !== 'demo123') throw new UnauthorizedException('Invalid credentials');
    return this.issueSession(user);
  }

  refresh(token: string | undefined) {
    if (!token) throw new UnauthorizedException('Refresh token required');
    const key = this.hash(token);
    const session = this.sessions.get(key);
    if (!session || session.expiresAt <= Date.now()) {
      this.sessions.delete(key);
      throw new UnauthorizedException('Invalid refresh token');
    }
    this.sessions.delete(key);
    const user = this.repository.findUserById(session.userId);
    if (!user) throw new UnauthorizedException('Invalid refresh token');
    return this.issueSession(user);
  }

  logout(token: string | undefined) { if (token) this.sessions.delete(this.hash(token)); }

  verifyAccessToken(token: string) {
    try { return jwt.verify(token, this.secret) as { sub: string; role: string }; }
    catch { throw new UnauthorizedException('Invalid access token'); }
  }

  private issueSession(user: User) {
    const accessToken = jwt.sign({ sub: user.id, role: user.role }, this.secret, { expiresIn: '15m' });
    const refreshToken = randomBytes(32).toString('hex');
    this.sessions.set(this.hash(refreshToken), { userId: user.id, expiresAt: Date.now() + this.refreshLifetimeMs });
    return { accessToken, refreshToken };
  }

  private hash(value: string) { return createHash('sha256').update(value).digest('hex'); }
}
