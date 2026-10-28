import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { DemoAccessService } from './demo-access.service';

type DemoRequest = Request & { user?: { sub: string; username: string; role: 'demo_member'; demo: true } };

@Injectable()
export class DemoAccessGuard implements CanActivate {
  constructor(private readonly demoAccess: DemoAccessService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<DemoRequest>();
    const header = request.headers.authorization;
    if (!header?.startsWith('Bearer ') || header.slice(7).trim().length === 0) {
      throw new UnauthorizedException('Demo access token required');
    }

    const claims = this.demoAccess.verify(header.slice(7).trim());
    request.user = { sub: claims.sub, username: claims.username, role: claims.role, demo: claims.demo };
    return true;
  }
}
