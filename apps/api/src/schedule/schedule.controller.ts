import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DemoAccessGuard } from '../auth/demo-access.guard';
import { JsonRepository } from '../repository/json.repository';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly repository: JsonRepository) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMine(@Req() request: Request & { user?: { sub: string } }) {
    return this.getByUserId(request.user!.sub);
  }

  @Get('demo')
  @UseGuards(DemoAccessGuard)
  getDemo(@Req() request: Request & { user?: { sub: string } }) {
    return this.getByUserId(request.user!.sub);
  }

  private getByUserId(userId: string) {
    const schedule = this.repository.findScheduleByUserId(userId);
    if (!schedule) return { id: `schedule-${userId}`, userId, days: [] };
    return schedule;
  }
}
