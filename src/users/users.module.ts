// users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service'; // Ajuste o caminho conforme necessário

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService], // Certifique-se de que PrismaService está incluído
})
export class UsersModule {}
