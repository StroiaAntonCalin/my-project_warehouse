import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import OpenAI from 'openai';
import type { KnowledgeDocument, RetrievedContext } from './local-rag.retriever';
import '../config/environment';

export type ChatSource = { id: string; title: string; text: string; score: number };
export type ChatResult = { answer: string; sources: ChatSource[] };

@Injectable()
export class LocalChatAgent {
  private readonly client = process.env.NODE_ENV !== 'test' && process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : undefined;
  private readonly model = process.env.OPENAI_MODEL ?? 'gpt-5.2';

  async run(question: string, context: RetrievedContext): Promise<ChatResult> {
    if (!context.documents.length) return { answer: "I couldn't find that information in your current gym data.", sources: [] };
    let answer: string;
    try {
      answer = this.client ? await this.generateWithOpenAi(question, context.documents) : this.generateFallback(question, context.documents);
    } catch (error) {
      const status = typeof error === 'object' && error !== null && 'status' in error ? ` (${String(error.status)})` : '';
      throw new ServiceUnavailableException(`OpenAI request failed${status}. Check OPENAI_API_KEY, OPENAI_MODEL, billing, and model access.`);
    }
    return { answer, sources: context.sources };
  }

  private async generateWithOpenAi(question: string, documents: KnowledgeDocument[]) {
    const context = documents.map((document) => `[${document.title}] ${document.text}`).join('\n');
    const response = await this.client!.responses.create({
      model: this.model,
      instructions: 'You are the GYM_SCHEDULER assistant. Answer only from the retrieved context. Do not invent or infer values. Follow the user requested output scope exactly: if they ask for only a password, return only the password; if they ask for one account, do not list other accounts. If the context does not contain the answer, say you could not find it in the gym data. Keep answers concise.',
      input: `User question:\n${question}\n\nRetrieved context:\n${context}`
    });
    return response.output_text?.trim() || "I couldn't generate an answer from the retrieved gym data.";
  }

  private generateFallback(question: string, documents: KnowledgeDocument[]) {
    const context = documents.map((document) => document.text).join(' ');
    const lower = question.toLowerCase();
    const requestedField = lower.includes('password') || lower.includes('passcode') ? 'password' : lower.includes('email') ? 'email' : undefined;
    if (requestedField) {
      const matches = documents.filter((document) => document.id.startsWith('account:') && (!this.accountNameInQuestion(question) || question.toLowerCase().includes(document.text.split(' ')[1].toLowerCase())));
      const values = matches.map((document) => {
        const account = document.text.match(/^Account\s+(\S+)\s+has role\s+\S+\s+and password\s+(.+)\.$/i);
        if (!account) return undefined;
        return requestedField === 'password' ? `Password for ${account[1]}: ${account[2]}` : `Email: ${account[1]}`;
      }).filter((value): value is string => Boolean(value));
      if (values.length) return values.join(' ');
    }
    if (lower.includes('exercise') || lower.includes('workout') || lower.includes('train') || (documents.some((document) => document.id.includes(':day:')) && /\b(day|when|which|where|do|does)\b/.test(lower))) return `According to your schedule: ${context}`;
    if (this.isAccountQuestion(question)) return `According to the registered accounts: ${context}`;
    if (lower.includes('profile') || lower.includes('username') || lower.includes('account')) return `According to your profile: ${context}`;
    return `According to your gym data: ${context}`;
  }

  private isAccountQuestion(question: string) { return /\b(account|accounts|user|users|member|members|registered|password|passcode|email|credential|credentials)\b/i.test(question); }
  private accountNameInQuestion(question: string) { return /@/.test(question); }
}
