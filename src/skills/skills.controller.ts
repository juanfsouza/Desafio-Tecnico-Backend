import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { Skill } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @ApiOperation({ summary: 'Create a new skill' })
  @ApiBody({ type: CreateSkillDto })
  @ApiResponse({ status: 201, description: 'The skill has been successfully created.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post()
  async createSkill(@Body() createSkillDto: CreateSkillDto): Promise<Skill> {
    return this.skillsService.createSkill(createSkillDto.name);
  }

  @ApiOperation({ summary: 'Get all skills' })
  @ApiResponse({ status: 200, description: 'List of skills' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get()
  async getSkills(): Promise<Skill[]> {
    return this.skillsService.getSkills();
  }

  @ApiOperation({ summary: 'Get skill by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Skill ID' })
  @ApiResponse({ status: 200, description: 'The skill has been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get(':id')
  async getSkillById(@Param('id') id: string): Promise<Skill> {
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.skillsService.getSkillById(idNumber);
  }

  @ApiOperation({ summary: 'Update skill by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Skill ID' })
  @ApiBody({ type: CreateSkillDto })
  @ApiResponse({ status: 200, description: 'The skill has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Put(':id')
  async updateSkill(
    @Param('id') id: string,
    @Body() updateSkillDto: CreateSkillDto
  ): Promise<Skill> {
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.skillsService.updateSkill(idNumber, updateSkillDto.name);
  }

  @ApiOperation({ summary: 'Delete skill by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Skill ID' })
  @ApiResponse({ status: 200, description: 'The skill has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Delete(':id')
  async deleteSkill(@Param('id') id: string): Promise<Skill> {
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.skillsService.deleteSkill(idNumber);
  }
}
