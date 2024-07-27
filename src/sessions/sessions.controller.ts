import { Controller, Get, Post, Body } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Session, Rating } from '@prisma/client';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Post()
  async createSession(@Body() sessionData: { mentorId: number; menteeId: number; skillId: number; schedule: Date }): Promise<Session> {
    return this.sessionsService.createSession(sessionData);
  }

  @Post('rate')
  async rateSession(@Body() ratingData: { sessionId: number; score: number; comment: string }): Promise<Rating> {
    return this.sessionsService.rateSession(ratingData.sessionId, ratingData.score, ratingData.comment);
  }

  @Get()
  async getSessions(): Promise<Session[]> {
    return this.sessionsService.getSessions();
  }
}
