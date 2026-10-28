import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export type DemoAccountResolution =
  | { status: 'unique'; user: { id: string; username: string } }
  | { status: 'unknown' }
  | { status: 'ambiguous' };

export interface DemoAccessClaims extends jwt.JwtPayload {
  sub: string;
  username: string;
  role: 'demo_member';
  demo: true;
  iss: 'gym-scheduler-demo';
  aud: 'gym-scheduler-demo-access';
  iat: number;
  exp: number;
}

const issuer = 'gym-scheduler-demo' as const;
const audience = 'gym-scheduler-demo-access' as const;
const tokenType = 'demo_access' as const;

@Injectable()
export class DemoAccessService {
  issue(resolution: DemoAccountResolution): string {
    this.ensureEnabled();
    if (resolution.status !== 'unique') throw new UnauthorizedException('Demo account access unavailable');

    return jwt.sign(
      { sub: resolution.user.id, username: resolution.user.username, role: 'demo_member', demo: true },
      this.secret(),
      { algorithm: 'HS256', expiresIn: '15m', issuer, audience, header: { typ: tokenType, alg: 'HS256' } }
    );
  }

  verify(token: string): DemoAccessClaims {
    this.ensureEnabled();
    try {
      const decoded = jwt.decode(token, { complete: true });
      if (!decoded || typeof decoded === 'string' || decoded.header.typ !== tokenType) throw new Error('Invalid demo token type');
      const payload = jwt.verify(token, this.secret(), {
        algorithms: ['HS256'], issuer, audience
      });
      if (typeof payload === 'string' || !this.isDemoClaims(payload)) throw new Error('Invalid demo token claims');
      return payload;
    } catch {
      throw new UnauthorizedException('Invalid demo access token');
    }
  }

  private ensureEnabled() {
    if (process.env.NODE_ENV !== 'development' || process.env.CHATBOT_DEMO_ACCESS_ENABLED !== 'true') {
      throw new UnauthorizedException('Demo account access is disabled');
    }
  }

  private secret() {
    return process.env.DEMO_ACCESS_SECRET ?? 'gym-scheduler-demo-local-development-secret';
  }

  private isDemoClaims(payload: jwt.JwtPayload): payload is DemoAccessClaims {
    return payload.iss === issuer && payload.aud === audience && payload.sub !== undefined
      && typeof payload.sub === 'string' && typeof payload.username === 'string'
      && payload.role === 'demo_member' && payload.demo === true
      && typeof payload.iat === 'number' && typeof payload.exp === 'number';
  }
}
