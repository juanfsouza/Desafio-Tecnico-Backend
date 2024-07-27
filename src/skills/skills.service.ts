import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Skill } from '@prisma/client';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  async createSkill(name: string): Promise<Skill> {
    return this.prisma.skill.create({
      data: { name },
    });
  }

  async getSkills(): Promise<Skill[]> {
    return this.prisma.skill.findMany();
  }

  async getSkillById(id: number): Promise<Skill> {
    return this.prisma.skill.findUnique({
      where: {
        id: id, // ID como número
      },
    });
  }

  async updateSkill(id: number, name: string): Promise<Skill> {
    return this.prisma.skill.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  }

  async deleteSkill(id: number): Promise<Skill> {
    return this.prisma.skill.delete({
      where: {
        id: id,
      },
    });
  }
}
