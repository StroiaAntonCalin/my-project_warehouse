import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { MockData } from '@gym-scheduler/contracts';

@Injectable()
export class JsonRepository {
  private readonly data: MockData;

  constructor() {
    const configured = process.env.GYM_DATA_FILE;
    const candidates = configured ? [configured] : [
      join(process.cwd(), 'data/mock-data.json'),
      join(process.cwd(), '../../data/mock-data.json'),
      join(__dirname, '../../../../data/mock-data.json'),
      join(__dirname, '../../../../../data/mock-data.json')
    ];
    const file = candidates.find(existsSync);
    if (!file) throw new Error('Mock data file not found');
    this.data = JSON.parse(readFileSync(file, 'utf8')) as MockData;
  }

  userCount() { return this.data.users.length; }
  scheduleCount() { return this.data.schedules.length; }
  snapshot() { return this.data; }
}
