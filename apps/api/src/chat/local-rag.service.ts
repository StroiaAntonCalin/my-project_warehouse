import { Injectable } from '@nestjs/common';
import { LocalChatAgent, type ChatResult } from './local-chat.agent';
import { LocalRagRetriever } from './local-rag.retriever';
import type { ChatResponse } from './chat.types';

@Injectable()
export class LocalRagService {
  constructor(private readonly retriever: LocalRagRetriever, private readonly agent: LocalChatAgent) {}

  async answer(userId: string, question: string): Promise<ChatResponse> {
    return this.orchestrate(userId, question, false);
  }

  async answerPublic(question: string): Promise<ChatResponse> {
    return this.orchestrate('', question, true);
  }

  private async orchestrate(userId: string, question: string, publicScope: boolean): Promise<ChatResponse> {
    const intent = this.retriever.classify(question);
    const requestedUsername = this.retriever.extractUsername(question);
    const resolution = requestedUsername ? this.retriever.resolveUsername(requestedUsername) : undefined;
    const context = this.retriever.retrieve(userId, question, publicScope, resolution);
    const result: ChatResult = await this.agent.run(question, context, intent);
    return {
      ...result,
      intent,
      accountUsername: resolution?.status === 'unique' ? resolution.username : undefined,
      accessIssued: false,
      demoOnly: true
    };
  }
}
