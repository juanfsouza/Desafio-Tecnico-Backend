import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @ApiOperation({ summary: 'Create a new session' })
  @ApiBody({ type: CreateSessionDto })
  @ApiResponse({ status: 201, description: 'The session has been successfully created.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post()
  async createSession(@Body() createSessionDto: CreateSessionDto): Promise<any> {
    return this.sessionsService.createSession(createSessionDto);
  }

  @ApiOperation({ summary: 'Get all sessions' })
  @ApiResponse({ status: 200, description: 'List of sessions', type: [CreateSessionDto] })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get()
  async getSessions(): Promise<any[]> {
    return this.sessionsService.getSessions();
  }

  @ApiOperation({ summary: 'Get session by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Session ID' })
  @ApiResponse({ status: 200, description: 'The session has been successfully retrieved.', type: CreateSessionDto })
  @ApiResponse({ status: 404, description: 'Session not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get(':id')
  async getSessionById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.sessionsService.getSessionById(id);
  }

  @ApiOperation({ summary: 'Update session by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Session ID' })
  @ApiBody({ type: UpdateSessionDto })
  @ApiResponse({ status: 200, description: 'The session has been successfully updated.', type: CreateSessionDto })
  @ApiResponse({ status: 404, description: 'Session not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Put(':id')
  async updateSession(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSessionDto: UpdateSessionDto
  ): Promise<any> {
    return this.sessionsService.updateSession(id, updateSessionDto);
  }

  @ApiOperation({ summary: 'Delete session by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Session ID' })
  @ApiResponse({ status: 200, description: 'The session has been successfully deleted.', type: CreateSessionDto })
  @ApiResponse({ status: 404, description: 'Session not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Delete(':id')
  async deleteSession(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.sessionsService.deleteSession(id);
  }
}
