import { BadRequestException, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalRagService } from './local-rag.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly rag: LocalRagService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async ask(@Req() request: Request & { user?: { sub: string } }, @Body() body: { message?: string }) {
    const message = body.message?.trim();
    if (!message) throw new BadRequestException('Message is required');
    return this.rag.answer(request.user!.sub, message);
  }

  @Post('public')
  async publicAsk(@Body() body: { message?: string }) {
    const message = body.message?.trim();
    if (!message) throw new BadRequestException('Message is required');
    return this.rag.answerPublic(message);
  }
}
