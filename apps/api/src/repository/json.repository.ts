import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Exercise, MockData } from '@gym-scheduler/contracts';

@Injectable()
export class JsonRepository {
  private readonly data: MockData;
  private readonly file: string;

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
    this.file = file;
    this.data = JSON.parse(readFileSync(file, 'utf8')) as MockData;
  }

  userCount() { return this.data.users.length; }
  scheduleCount() { return this.data.schedules.length; }
  findUser(username: string) { return this.data.users.find((user) => user.username === username); }
  findUserById(id: string) { return this.data.users.find((user) => user.id === id); }
  findScheduleByUserId(userId: string) { return this.data.schedules.find((schedule) => schedule.userId === userId); }
  addExercise(userId: string, dayOrder: number, input: Omit<Exercise, 'id' | 'order'>) {
    const day = this.findDay(userId, dayOrder);
    const exercise: Exercise = { ...input, id: `exercise-${Date.now()}`, order: day.exercises.length + 1 };
    day.exercises.push(exercise); this.persist(); return exercise;
  }
  updateExercise(userId: string, dayOrder: number, exerciseId: string, input: Partial<Omit<Exercise, 'id' | 'order'>>) {
    const exercise = this.findDay(userId, dayOrder).exercises.find((item) => item.id === exerciseId);
    if (!exercise) return undefined;
    Object.assign(exercise, input); this.persist(); return exercise;
  }
  removeExercise(userId: string, dayOrder: number, exerciseId: string) {
    const day = this.findDay(userId, dayOrder); const index = day.exercises.findIndex((item) => item.id === exerciseId);
    if (index < 0) return false; day.exercises.splice(index, 1); day.exercises.forEach((item, i) => { item.order = i + 1; }); this.persist(); return true;
  }
  reorderExercises(userId: string, dayOrder: number, exerciseIds: string[]) {
    const day = this.findDay(userId, dayOrder); const items = exerciseIds.map((id) => day.exercises.find((item) => item.id === id));
    if (items.some((item) => !item) || items.length !== day.exercises.length) return false;
    day.exercises = items.map((item, index) => ({ ...item!, order: index + 1 })); this.persist(); return true;
  }
  snapshot() { return this.data; }
  private findDay(userId: string, dayOrder: number) {
    const day = this.findScheduleByUserId(userId)?.days.find((item) => item.order === dayOrder);
    if (!day) throw new Error('Schedule day not found'); return day;
  }
  private persist() { writeFileSync(this.file, `${JSON.stringify(this.data, null, 2)}\n`); }
}
