import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import type { KnowledgeDocument, RetrievedContext } from './local-rag.retriever';
import type { ChatIntent, ChatSource } from './chat.types';
import '../config/environment';

export type ChatResult = { answer: string; sources: ChatSource[]; source: 'openai' | 'local'; mode: 'answer' | 'fallback' | 'error' };
export type ChatProvider = { respond(question: string, context: KnowledgeDocument[]): Promise<string> };

@Injectable()
export class LocalChatAgent {
  private readonly client = process.env.NODE_ENV !== 'test' && process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : undefined;
  private readonly model = process.env.OPENAI_MODEL ?? 'gpt-5.2';
  private provider?: ChatProvider;

  setProvider(provider: ChatProvider | undefined) { this.provider = provider; }

  async run(question: string, context: RetrievedContext, intent: ChatIntent): Promise<ChatResult> {
    if (!context.documents.length && intent !== 'access_request') return this.fallback(question, context, intent);
    try {
      if (this.provider) {
        const answer = await this.provider.respond(question, context.documents);
        if (!answer?.trim()) throw new Error('Provider returned no answer');
        return { answer: answer.trim(), sources: context.sources, source: 'openai', mode: 'answer' };
      }
      if (this.client) return { answer: await this.generateWithOpenAi(question, context.documents), sources: context.sources, source: 'openai', mode: 'answer' };
      return this.fallback(question, context, intent);
    } catch {
      return this.fallback(question, context, intent);
    }
  }

  private async generateWithOpenAi(question: string, documents: KnowledgeDocument[]) {
    const context = documents.map((document) => `[${document.title}] ${document.text}`).join('\n');
    const response = await this.client!.responses.create({
      model: this.model,
      instructions: 'You are the GYM_SCHEDULER assistant. Answer only from the retrieved context. Do not invent or infer values. Follow the user requested output scope exactly: if they ask for only a password, return only the password; if they ask for one account, do not list other accounts. If the context does not contain the answer, say you could not find it in the gym data. Keep answers concise.',
      input: `User question:\n${question}\n\nRetrieved context:\n${context}`
    });
    const answer = response.output_text?.trim();
    if (!answer) throw new Error('Provider returned no answer');
    return answer;
  }

  private fallback(question: string, context: RetrievedContext, intent: ChatIntent): ChatResult {
    const documents = context.documents;
    if (intent === 'access_request') return { answer: 'I cannot provide or use passwords. I can only answer from safe gym information.', sources: context.sources, source: 'local', mode: 'fallback' };
    if (!documents.length) return { answer: "I couldn't find that information in your current gym data.", sources: [], source: 'local', mode: 'fallback' };
    const contextText = documents.map((document) => document.text).join(' ');
    if (intent === 'schedule_lookup') return { answer: `According to your schedule: ${contextText}`, sources: context.sources, source: 'local', mode: 'fallback' };
    return { answer: `According to the registered accounts: ${contextText}`, sources: context.sources, source: 'local', mode: 'fallback' };
  }
}
