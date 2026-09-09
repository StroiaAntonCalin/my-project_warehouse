import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { ConflictException, BadRequestException } from '@nestjs/common';
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
    if (!user || !this.passwordMatches(user.passwordHash, password, user.passwordHash === 'prototype-only' ? 'demo123' : undefined)) throw new UnauthorizedException('Invalid credentials');
    return this.issueSession(user);
  }

  register(username: string, password: string) {
    const normalized = username.trim().toLowerCase();
    if (!normalized.includes('@') || password.length < 6) throw new BadRequestException('Use a valid email and a password of at least 6 characters');
    if (this.repository.findUser(normalized)) throw new ConflictException('A user with this email already exists');
    const user = this.repository.createUser(normalized, this.hashPassword(password));
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
  private hashPassword(password: string) { const salt = randomBytes(16).toString('hex'); return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`; }
  private passwordMatches(stored: string, password: string, prototypePassword?: string) {
    if (prototypePassword) return password === prototypePassword;
    const [salt, expected] = stored.split(':'); if (!salt || !expected) return false;
    const actual = scryptSync(password, salt, 64); return timingSafeEqual(actual, Buffer.from(expected, 'hex'));
  }
}
