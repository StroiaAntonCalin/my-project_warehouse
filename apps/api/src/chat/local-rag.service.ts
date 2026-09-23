import { Injectable } from '@nestjs/common';
import { LocalChatAgent, type ChatResult } from './local-chat.agent';
import { LocalRagRetriever } from './local-rag.retriever';

@Injectable()
export class LocalRagService {
  constructor(private readonly retriever: LocalRagRetriever, private readonly agent: LocalChatAgent) {}

  async answer(userId: string, question: string): Promise<ChatResult> {
    return this.agent.run(question, this.retriever.retrieve(userId, question));
  }

  async answerPublic(question: string): Promise<ChatResult> {
    return this.agent.run(question, this.retriever.retrieve('', question, true));
  }
}
