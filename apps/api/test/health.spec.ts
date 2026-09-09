import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { HealthController } from '../src/health.controller';

describe('HealthController', () => {
  it('reports the seeded repository counts', async () => {
    const module = await Test.createTestingModule({ imports: [AppModule] }).compile();
    const result = module.get(HealthController).health();
    expect(result.status).toBe('ok');
    expect(result.users).toBeGreaterThan(0);
    expect(result.schedules).toBe(1);
  });
});
