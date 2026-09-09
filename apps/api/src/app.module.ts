import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { JsonRepository } from './repository/json.repository';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ScheduleController } from './schedule/schedule.controller';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ExerciseController } from './schedule/exercise.controller';

@Module({ controllers: [HealthController, AuthController, ScheduleController, ExerciseController], providers: [JsonRepository, AuthService, JwtAuthGuard], exports: [JsonRepository, AuthService, JwtAuthGuard] })
export class AppModule {}
