import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { JsonRepository } from './repository/json.repository';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ScheduleController } from './schedule/schedule.controller';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ExerciseController } from './schedule/exercise.controller';
import { ChatController } from './chat/chat.controller';
import { LocalRagService } from './chat/local-rag.service';
import { LocalRagRetriever } from './chat/local-rag.retriever';
import { LocalChatAgent } from './chat/local-chat.agent';

@Module({ controllers: [HealthController, AuthController, ScheduleController, ExerciseController, ChatController], providers: [JsonRepository, AuthService, JwtAuthGuard, LocalRagRetriever, LocalChatAgent, LocalRagService], exports: [JsonRepository, AuthService, JwtAuthGuard, LocalRagService] })
export class AppModule {}
