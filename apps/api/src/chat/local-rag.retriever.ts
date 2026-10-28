import { Injectable } from '@nestjs/common';
import type { Exercise, Schedule, User } from '@gym-scheduler/contracts';
import { JsonRepository } from '../repository/json.repository';
import type { AccountResolution, ChatIntent } from './chat.types';

export type KnowledgeDocument = { id: string; title: string; text: string; userId: string };
export type RetrievedContext = { documents: KnowledgeDocument[]; sources: { id: string; title: string; text: string; score: number }[] };

const stopWords = new Set(['a', 'an', 'and', 'are', 'can', 'do', 'for', 'from', 'have', 'how', 'i', 'in', 'is', 'me', 'my', 'of', 'on', 'the', 'to', 'what', 'which', 'with']);

@Injectable()
export class LocalRagRetriever {
  constructor(private readonly repository: JsonRepository) {}

  retrieve(userId: string, question: string, publicScope = false, resolution?: AccountResolution): RetrievedContext {
    const intent = this.classify(question);
    const requestedUser = this.extractUsername(question);
    if (intent === 'unsupported') return this.context([]);

    let documents: KnowledgeDocument[];
    if (requestedUser) {
      documents = resolution?.status === 'unique' ? this.userDocumentsById(resolution.userId) : [];
    } else if (intent === 'account_lookup' || intent === 'access_request') {
      documents = this.accountDocuments();
    } else {
      documents = publicScope ? this.publicDocuments() : this.userDocuments(userId);
    }
    if (requestedUser || intent === 'account_lookup' || intent === 'access_request') return this.context(documents, 1);

    const query = this.tokens(question);
    const scored = documents.map((document) => ({ document, score: this.score(query, `${document.title} ${document.text}`) }))
      .filter((item) => item.score > 0).sort((left, right) => right.score - left.score);
    const highestScore = scored[0]?.score ?? 0;
    const ranked = scored.filter((item) => item.score === highestScore || (highestScore === 1 && item.score > 0)).slice(0, 4);
    return this.context(ranked.map((item) => item.document), undefined, ranked.map((item) => item.score));
  }

  classify(question: string): ChatIntent {
    if (/\b(password|passcode|credential|credentials|log\s*in|login|sign\s*in|access|forgot)\b/i.test(question)) return 'access_request';
    if (/\b(account|accounts|user|users|member|members|registered|email|username)\b/i.test(question)) return 'account_lookup';
    if (/\b(exercise|exercises|workout|workouts|train|training|schedule|day|legpress|leg press)\b/i.test(question)) return 'schedule_lookup';
    return 'unsupported';
  }

  extractUsername(question: string) { return question.match(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i)?.[0]?.toLowerCase(); }

  resolveUsername(username: string): AccountResolution {
    const matches = this.repository.snapshot().users.filter((user) => user.username.toLowerCase() === username.toLowerCase());
    if (matches.length === 1) return { status: 'unique', userId: matches[0].id, username: matches[0].username };
    if (matches.length > 1) return { status: 'ambiguous', username };
    return { status: 'unknown', username };
  }

  private context(documents: KnowledgeDocument[], defaultScore?: number, scores?: number[]): RetrievedContext {
    return { documents, sources: documents.map((document, index) => ({ ...document, score: scores?.[index] ?? defaultScore ?? 0 })) };
  }

  private accountDocuments(): KnowledgeDocument[] {
    return this.repository.snapshot().users.map((user) => ({ id: `account:${user.id}`, title: 'Registered account', userId: user.id, text: `Account ${user.username} has role ${user.role}.` }));
  }

  private publicDocuments(): KnowledgeDocument[] {
    return this.repository.snapshot().users.flatMap((user) => {
      const schedule = this.repository.findScheduleByUserId(user.id);
      return [this.userDocument(user), ...((schedule?.days ?? []).map((day) => this.dayDocument(schedule!, day.order, day.dayOfWeek, day.exercises)))];
    }).concat(this.accountDocuments());
  }

  private userDocuments(userId: string): KnowledgeDocument[] {
    const user = this.repository.findUserById(userId);
    return user ? this.documentsForUser(user) : [];
  }

  private userDocumentsById(userId: string): KnowledgeDocument[] {
    return this.userDocuments(userId);
  }

  private userDocumentsByUsername(username: string): KnowledgeDocument[] {
    const user = this.repository.findUser(username);
    return user ? this.documentsForUser(user) : [];
  }

  private documentsForUser(user: User): KnowledgeDocument[] {
    const schedule = this.repository.findScheduleByUserId(user.id);
    if (!user || !schedule) return [];
    const documents = [this.userDocument(user), ...schedule.days.map((day) => this.dayDocument(schedule, day.order, day.dayOfWeek, day.exercises))];
    return documents;
  }

  private userDocument(user: User): KnowledgeDocument { return { id: `user:${user.id}`, title: 'Profile', userId: user.id, text: `The member username is ${user.username} and role is ${user.role}.` }; }

  private dayDocument(schedule: Schedule, order: number, day: string, exercises: Exercise[]): KnowledgeDocument {
    const exerciseText = exercises.length ? exercises.map((exercise) => `${exercise.order}. ${exercise.name}${exercise.muscleGroup ? ` (${exercise.muscleGroup})` : ''}`).join('; ') : 'no exercises';
    const displayDay = day.charAt(0).toUpperCase() + day.slice(1);
    return { id: `${schedule.id}:day:${order}`, title: `${displayDay} workout`, userId: schedule.userId, text: `${displayDay} has ${exercises.length} exercises: ${exerciseText}.` };
  }

  private tokens(value: string) { return [...new Set(value.toLowerCase().split(/[^a-z0-9]+/).filter((token) => token.length > 1 && !stopWords.has(token)))]; }
  private score(query: string[], text: string) { const words = new Set(this.tokens(text)); const compactText = text.toLowerCase().replace(/[^a-z0-9]/g, ''); return query.reduce((score, token) => score + (words.has(token) || compactText.includes(token) ? 1 : 0), 0); }
}
