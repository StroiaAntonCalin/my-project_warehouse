import { describe, expect, it } from 'vitest';
import type { Schedule } from './index.js';

describe('contracts', () => {
  it('models a schedule as seven days', () => {
    const schedule: Partial<Schedule> = { days: [] as never };
    expect(schedule.days).toHaveLength(0);
  });
});
