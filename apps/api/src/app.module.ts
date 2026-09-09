import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { JsonRepository } from './repository/json.repository';

@Module({ controllers: [HealthController], providers: [JsonRepository], exports: [JsonRepository] })
export class AppModule {}
