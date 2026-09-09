import { Controller, Get } from '@nestjs/common';
import { JsonRepository } from './repository/json.repository';

@Controller('health')
export class HealthController {
  constructor(private readonly repository: JsonRepository) {}

  @Get()
  health() { return { status: 'ok', service: 'gym-scheduler-api', users: this.repository.userCount(), schedules: this.repository.scheduleCount() }; }
}
