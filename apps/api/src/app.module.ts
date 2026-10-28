import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { JsonRepository } from './repository/json.repository';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ScheduleController } from './schedule/schedule.controller';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { DemoAccessService } from './auth/demo-access.service';
import { DemoAccessGuard } from './auth/demo-access.guard';
import { ExerciseController } from './schedule/exercise.controller';
import { ChatController } from './chat/chat.controller';
import { LocalRagService } from './chat/local-rag.service';
import { LocalRagRetriever } from './chat/local-rag.retriever';
import { LocalChatAgent } from './chat/local-chat.agent';
import { AccountResolver } from './chat/account-resolver';

@Module({ controllers: [HealthController, AuthController, ScheduleController, ExerciseController, ChatController], providers: [JsonRepository, AuthService, JwtAuthGuard, DemoAccessService, DemoAccessGuard, AccountResolver, LocalRagRetriever, LocalChatAgent, LocalRagService], exports: [JsonRepository, AuthService, JwtAuthGuard, DemoAccessService, DemoAccessGuard, AccountResolver, LocalRagService] })
export class AppModule {}
