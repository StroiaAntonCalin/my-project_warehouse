import { describe, expect, it } from 'vitest';
import { WEEKDAYS } from './schedule';

describe('weekly schedule foundation', () => {
  it('contains exactly seven ordered weekdays', () => {
    expect(WEEKDAYS).toHaveLength(7);
    expect(WEEKDAYS[0]).toBe('Monday');
    expect(WEEKDAYS[6]).toBe('Sunday');
  });
});
