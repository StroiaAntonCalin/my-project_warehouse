import { Test } from '@nestjs/testing';
import { ScheduleController } from '../src/schedule/schedule.controller';
import { JsonRepository } from '../src/repository/json.repository';
import { AuthService } from '../src/auth/auth.service';

describe('ScheduleController', () => {
  it('returns exactly seven days for the authenticated demo user', async () => {
    const module = await Test.createTestingModule({ controllers: [ScheduleController], providers: [JsonRepository, AuthService] }).compile();
    const schedule = module.get(ScheduleController).getMine({ user: { sub: 'user-demo' } } as never);
    expect(schedule.days).toHaveLength(7);
  });
});
