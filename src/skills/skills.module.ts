import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma.module';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';

@Module({
  imports: [PrismaModule],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
