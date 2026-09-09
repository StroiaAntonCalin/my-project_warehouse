import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { JsonRepository } from './repository/json.repository';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({ controllers: [HealthController, AuthController], providers: [JsonRepository, AuthService], exports: [JsonRepository, AuthService] })
export class AppModule {}
