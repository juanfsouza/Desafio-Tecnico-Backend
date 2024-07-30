import { Injectable, Logger } from '@nestjs/common';
import { google } from 'googleapis';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GoogleCalendarService {
  private oauth2Client;
  private readonly logger = new Logger(GoogleCalendarService.name);

  constructor(private readonly prisma: PrismaService) {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000/google-calendar/callback',
    );
  }

  getAuthUrl(): string {
    const scopes = ['https://www.googleapis.com/auth/calendar'];
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
  }

  async getToken(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);

    await this.prisma.token.create({
      data: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        scope: tokens.scope,
        tokenType: tokens.token_type,
        expiryDate: new Date(tokens.expiry_date),
      },
    });

    return tokens;
  }

  async createEvent(accessToken: string, sessionId: number) {
    this.oauth2Client.setCredentials({ access_token: accessToken });
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        mentor: true,
        mentee: true,
        skill: true,
      },
    });

    if (!session) {
      throw new Error('Session not found');
    }

    const event = {
      summary: `Session with ${session.mentor.name} for ${session.mentee.name} on skill ${session.skill.name}`,
      description: `Session on skill ${session.skill.name}`,
      start: {
        dateTime: session.startTime.toISOString(),
        timeZone: 'America/Sao_Paulo',
      },
      end: {
        dateTime: session.endTime.toISOString(),
        timeZone: 'America/Sao_Paulo',
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    return response.data;
  }

  async getStoredTokens() {
    try {
      const tokens = await this.prisma.token.findMany();
      this.logger.log(`Retrieved tokens: ${JSON.stringify(tokens)}`);
      return tokens;
    } catch (error) {
      this.logger.error('Error retrieving tokens', error);
      throw new Error('Failed to retrieve tokens');
    }
  }
}