import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Skill } from '@prisma/client';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  async createSkill(name: string): Promise<Skill> {
    return this.prisma.skill.create({ data: { name } });
  }

  async getSkills(): Promise<Skill[]> {
    return this.prisma.skill.findMany();
  }
}