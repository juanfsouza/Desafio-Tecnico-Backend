import { Controller, Get, Query, Post, Body, BadRequestException, Logger } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';

@Controller('google-calendar')
export class GoogleCalendarController {
  private readonly logger = new Logger(GoogleCalendarController.name);

  constructor(private readonly googleCalendarService: GoogleCalendarService) {}

  @Get('auth')
  async authenticate() {
    const authUrl = this.googleCalendarService.getAuthUrl();
    return { url: authUrl };
  }

  @Get('callback')
  async handleCallback(@Query('code') code: string) {
    if (!code) {
      throw new BadRequestException('Authorization code is missing');
    }

    try {
      const tokens = await this.googleCalendarService.getToken(code);
      return { message: 'Authorization successful', tokens };
    } catch (error) {
      this.logger.error('Failed to exchange authorization code', error);
      throw new BadRequestException('Failed to exchange authorization code');
    }
  }

  @Post('create-event')
  async createEvent(@Query('accessToken') accessToken: string, @Body('sessionId') sessionId: number) {
    if (!accessToken) {
      throw new BadRequestException('Access token is missing');
    }

    if (!sessionId) {
      throw new BadRequestException('Session ID is missing');
    }

    try {
      return await this.googleCalendarService.createEvent(accessToken, sessionId);
    } catch (error) {
      this.logger.error('Failed to create event', error);
      throw new BadRequestException('Failed to create event');
    }
  }

  @Get('tokens')
  async getTokens() {
    try {
      const tokens = await this.googleCalendarService.getStoredTokens();
      return tokens;
    } catch (error) {
      this.logger.error('Failed to retrieve tokens', error);
      throw new BadRequestException('Failed to retrieve tokens');
    }
  }
}