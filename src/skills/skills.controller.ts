import { Controller, Get, Post, Body } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { Skill } from '@prisma/client';

@Controller('skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  @Post()
  async createSkill(@Body('name') name: string): Promise<Skill> {
    return this.skillsService.createSkill(name);
  }

  @Get()
  async getSkills(): Promise<Skill[]> {
    return this.skillsService.getSkills();
  }
}