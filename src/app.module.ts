import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module'; 
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SkillsModule } from './skills/skills.module';
import { SessionsModule } from './sessions/sessions.module';
import { RatingsModule } from './ratings/ratings.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UsersModule,
    AuthModule,
    SkillsModule,
    SessionsModule,
    RatingsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ]
})
export class AppModule {}
