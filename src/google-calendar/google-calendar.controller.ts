import { BadRequestException, Controller, Get, Post, Put, Delete, Query, Body, Redirect, Res } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';

@Controller('google-calendar')
export class GoogleCalendarController {
  constructor(private googleCalendarService: GoogleCalendarService) {}

  @Get('auth')
  @Redirect()
  getAuthUrl() {
    const url = this.googleCalendarService.generateAuthUrl();
    return { url };
  }

  @Get('callback')
  async googleCallback(@Query('code') code: string, @Res() res) {
    try {
      const tokens = await this.googleCalendarService.getToken(code);
      res.redirect(`/google-calendar/create-event?accessToken=${tokens.access_token}`);
    } catch (error) {
      throw new BadRequestException('Failed to retrieve access token from Google');
    }
  }

  @Post('create-event')
  async createEvent(@Query('accessToken') accessToken: string, @Body() event: any) {
    if (!accessToken) {
      throw new BadRequestException('Access token is missing');
    }

    if (!event) {
      throw new BadRequestException('Event parameter is missing');
    }

    try {
      return this.googleCalendarService.createEvent(accessToken, event);
    } catch (error) {
      throw new BadRequestException('Failed to create event');
    }
  }

  @Get('list-events')
  async listEvents(@Query('accessToken') accessToken: string) {
    if (!accessToken) {
      throw new BadRequestException('Access token is missing');
    }

    try {
      return this.googleCalendarService.listEvents(accessToken);
    } catch (error) {
      throw new BadRequestException('Failed to list events');
    }
  }

  @Put('update-event')
  async updateEvent(@Query('accessToken') accessToken: string, @Query('eventId') eventId: string, @Body() event: any) {
    if (!accessToken) {
      throw new BadRequestException('Access token is missing');
    }

    if (!eventId) {
      throw new BadRequestException('Event ID is missing');
    }

    if (!event) {
      throw new BadRequestException('Event parameter is missing');
    }

    try {
      return this.googleCalendarService.updateEvent(accessToken, eventId, event);
    } catch (error) {
      throw new BadRequestException('Failed to update event');
    }
  }

  @Delete('delete-event')
  async deleteEvent(@Query('accessToken') accessToken: string, @Query('eventId') eventId: string) {
    if (!accessToken) {
      throw new BadRequestException('Access token is missing');
    }

    if (!eventId) {
      throw new BadRequestException('Event ID is missing');
    }

    try {
      await this.googleCalendarService.deleteEvent(accessToken, eventId);
      return { message: 'Event deleted successfully' };
    } catch (error) {
      throw new BadRequestException('Failed to delete event');
    }
  }
}
