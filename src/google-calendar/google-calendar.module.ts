import { Module } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';
import { GoogleCalendarController } from './google-calendar.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [GoogleCalendarController],
  providers: [GoogleCalendarService, PrismaService],
  exports: [GoogleCalendarService], 
})
export class GoogleCalendarModule {}
