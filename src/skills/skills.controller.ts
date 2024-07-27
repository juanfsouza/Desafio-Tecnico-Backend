import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { Skill } from '@prisma/client';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  async createSkill(@Body() body: { name: string }): Promise<Skill> {
    return this.skillsService.createSkill(body.name);
  }

  @Get()
  async getSkills(): Promise<Skill[]> {
    return this.skillsService.getSkills();
  }

  @Get(':id')
  async getSkillById(@Param('id') id: string): Promise<Skill> {
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.skillsService.getSkillById(idNumber);
  }

  @Put(':id')
  async updateSkill(
    @Param('id') id: string,
    @Body() updateSkillDto: { name: string }
  ): Promise<Skill> {
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.skillsService.updateSkill(idNumber, updateSkillDto.name);
  }

  @Delete(':id')
  async deleteSkill(@Param('id') id: string): Promise<Skill> {
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.skillsService.deleteSkill(idNumber);
  }
}
