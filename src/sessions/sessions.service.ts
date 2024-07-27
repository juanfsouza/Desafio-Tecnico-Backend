import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Session, Rating } from '@prisma/client';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async createSession(data: { mentorId: number; menteeId: number; skillId: number; schedule: Date }): Promise<Session> {
    return this.prisma.session.create({ data });
  }

  async rateSession(sessionId: number, score: number, comment: string): Promise<Rating> {
    return this.prisma.rating.create({ data: { sessionId, score, comment } });
  }

  async getSessions(): Promise<Session[]> {
    return this.prisma.session.findMany();
  }
}
