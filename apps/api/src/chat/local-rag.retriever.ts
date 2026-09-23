import { Injectable } from '@nestjs/common';
import type { Exercise, Schedule, User } from '@gym-scheduler/contracts';
import { JsonRepository } from '../repository/json.repository';

export type KnowledgeDocument = { id: string; title: string; text: string; userId: string };
export type RetrievedContext = { documents: KnowledgeDocument[]; sources: { id: string; title: string; text: string; score: number }[] };

const stopWords = new Set(['a', 'an', 'and', 'are', 'can', 'do', 'for', 'from', 'have', 'how', 'i', 'in', 'is', 'me', 'my', 'of', 'on', 'the', 'to', 'what', 'which', 'with']);

@Injectable()
export class LocalRagRetriever {
  constructor(private readonly repository: JsonRepository) {}

  retrieve(userId: string, question: string, publicScope = false): RetrievedContext {
    const includeAll = this.isAccountQuestion(question);
    const requestedUser = this.extractUsername(question);
    const credentialQuestion = /\b(password|passcode|email|credential|credentials)\b/i.test(question);
    const documents = requestedUser
      ? credentialQuestion ? this.accountDocuments().filter((document) => document.userId === this.repository.findUser(requestedUser)?.id) : this.userDocumentsByUsername(requestedUser)
      : includeAll ? this.accountDocuments() : publicScope ? this.publicDocuments() : this.userDocuments(userId);
    if ((includeAll && !requestedUser) || requestedUser) return this.context(documents, 1);

    const query = this.tokens(question);
    const scored = documents.map((document) => ({ document, score: this.score(query, `${document.title} ${document.text}`) }))
      .filter((item) => item.score > 0).sort((left, right) => right.score - left.score);
    const highestScore = scored[0]?.score ?? 0;
    const ranked = scored.filter((item) => item.score === highestScore || (highestScore === 1 && item.score > 0)).slice(0, 4);
    return this.context(ranked.map((item) => item.document), undefined, ranked.map((item) => item.score));
  }

  private context(documents: KnowledgeDocument[], defaultScore?: number, scores?: number[]): RetrievedContext {
    return { documents, sources: documents.map((document, index) => ({ ...document, score: scores?.[index] ?? defaultScore ?? 0 })) };
  }

  private accountDocuments(): KnowledgeDocument[] {
    return this.repository.snapshot().users.map((user) => ({ id: `account:${user.id}`, title: 'Registered account', userId: user.id, text: `Account ${user.username} has role ${user.role} and password ${user.password}.` }));
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
  private isAccountQuestion(question: string) { return /\b(account|accounts|user|users|member|members|registered|password|passcode|email|credential|credentials)\b/i.test(question); }
  private extractUsername(question: string) { return question.match(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i)?.[0]?.toLowerCase(); }
}
