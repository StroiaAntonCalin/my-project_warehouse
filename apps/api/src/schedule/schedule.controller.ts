import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JsonRepository } from '../repository/json.repository';

@Controller('schedules')
@UseGuards(JwtAuthGuard)
export class ScheduleController {
  constructor(private readonly repository: JsonRepository) {}

  @Get('me')
  getMine(@Req() request: Request & { user?: { sub: string } }) {
    const schedule = this.repository.findScheduleByUserId(request.user!.sub);
    if (!schedule) return { id: `schedule-${request.user!.sub}`, userId: request.user!.sub, days: [] };
    return schedule;
  }
}
