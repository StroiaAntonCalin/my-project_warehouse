import { BadRequestException, Controller, Delete, Param, Patch, Post, Body, Req, UseGuards, NotFoundException } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JsonRepository } from '../repository/json.repository';

@Controller('schedules/me/days')
@UseGuards(JwtAuthGuard)
export class ExerciseController {
  constructor(private readonly repository: JsonRepository) {}
  @Post(':dayOrder/exercises') add(@Req() req: Request & { user?: { sub: string } }, @Param('dayOrder') day: string, @Body() body: Record<string, unknown>) {
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    if (!name) throw new BadRequestException('Exercise name is required');
    const dayOrder = Number(day); if (!Number.isInteger(dayOrder) || dayOrder < 1 || dayOrder > 7) throw new BadRequestException('Invalid day order');
    return this.repository.addExercise(req.user!.sub, dayOrder, this.validate(body, name));
  }
  @Patch(':dayOrder/exercises/:exerciseId') update(@Req() req: Request & { user?: { sub: string } }, @Param('dayOrder') day: string, @Param('exerciseId') id: string, @Body() body: Record<string, unknown>) {
    const input = this.validate(body, typeof body.name === 'string' ? body.name.trim() : undefined);
    const result = this.repository.updateExercise(req.user!.sub, Number(day), id, input); if (!result) throw new NotFoundException('Exercise not found'); return result;
  }
  @Delete(':dayOrder/exercises/:exerciseId') remove(@Req() req: Request & { user?: { sub: string } }, @Param('dayOrder') day: string, @Param('exerciseId') id: string) {
    if (!this.repository.removeExercise(req.user!.sub, Number(day), id)) throw new NotFoundException('Exercise not found'); return { success: true };
  }
  @Patch(':dayOrder/exercises/reorder') reorder(@Req() req: Request & { user?: { sub: string } }, @Param('dayOrder') day: string, @Body() body: { exerciseIds?: string[] }) {
    if (!Array.isArray(body.exerciseIds) || !this.repository.reorderExercises(req.user!.sub, Number(day), body.exerciseIds)) throw new BadRequestException('Invalid exercise order'); return { success: true };
  }
  private validate(body: Record<string, unknown>, name?: string) {
    if (name === '') throw new BadRequestException('Exercise name is required');
    const result: Record<string, unknown> = { ...body }; if (name) result.name = name; delete result.order; delete result.id;
    for (const field of ['sets', 'repetitions', 'restTimeSeconds']) if (result[field] !== undefined && (!Number.isInteger(result[field]) || Number(result[field]) < 1)) throw new BadRequestException(`Invalid ${field}`);
    if (result.difficulty !== undefined && !['beginner', 'intermediate', 'advanced'].includes(String(result.difficulty))) throw new BadRequestException('Invalid difficulty');
    return result as never;
  }
}
