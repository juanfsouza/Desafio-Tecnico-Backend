import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session } from '@prisma/client';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  async createSession(@Body() createSessionDto: CreateSessionDto): Promise<Session> {
    return this.sessionsService.createSession(createSessionDto);
  }

  @Get()
  async getSessions(): Promise<Session[]> {
    return this.sessionsService.getSessions();
  }

  @Get(':id')
  async getSessionById(@Param('id', ParseIntPipe) id: number): Promise<Session> {
    return this.sessionsService.getSessionById(id);
  }

  @Put(':id')
  async updateSession(@Param('id', ParseIntPipe) id: number, @Body() updateSessionDto: CreateSessionDto): Promise<Session> {
    return this.sessionsService.updateSession(id, updateSessionDto);
  }

  @Delete(':id')
  async deleteSession(@Param('id', ParseIntPipe) id: number): Promise<Session> {
    return this.sessionsService.deleteSession(id);
  }
}
