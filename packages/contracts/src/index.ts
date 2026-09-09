export type Role = 'member' | 'admin';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface User { id: string; username: string; role: Role; passwordHash: string; }
export interface Exercise {
  id: string;
  name: string;
  order: number;
  muscleGroup?: string;
  sets?: number;
  repetitions?: number;
  restTimeSeconds?: number;
  difficulty?: Difficulty;
  instructions?: string;
}
export interface ScheduleDay { id: string; dayOfWeek: DayOfWeek; order: number; exercises: Exercise[]; }
export interface Schedule { id: string; userId: string; days: [ScheduleDay, ScheduleDay, ScheduleDay, ScheduleDay, ScheduleDay, ScheduleDay, ScheduleDay]; }
export interface MockData { users: User[]; schedules: Schedule[]; }
