import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Session } from '@prisma/client';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  async createSession(@Body() createSessionDto: { mentorId: number; menteeId: number; skillId: number; schedule: Date }): Promise<Session> {
    const { mentorId, menteeId, skillId, schedule } = createSessionDto;
    return this.sessionsService.createSession(mentorId, menteeId, skillId, schedule);
  }

  @Get()
  async getAllSessions(): Promise<Session[]> {
    return this.sessionsService.getAllSessions();
  }

  @Get(':id')
  async getSessionById(@Param('id', ParseIntPipe) id: number): Promise<Session> {
    const session = await this.sessionsService.getSessionById(id);
    if (!session) {
      throw new NotFoundException(`Session with ID ${id} does not exist`);
    }
    return session;
  }

  @Put(':id')
  async updateSession(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSessionDto: { mentorId?: number; menteeId?: number; skillId?: number; schedule?: Date },
  ): Promise<Session> {
    const { mentorId, menteeId, skillId, schedule } = updateSessionDto;
    return this.sessionsService.updateSession(id, mentorId, menteeId, skillId, schedule);
  }

  @Delete(':id')
  async deleteSession(@Param('id', ParseIntPipe) id: number): Promise<Session> {
    return this.sessionsService.deleteSession(id);
  }
}
