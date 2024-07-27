import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Session } from '@prisma/client';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async createSession(mentorId: number, menteeId: number, skillId: number, schedule: Date): Promise<Session> {
    // Check if mentor, mentee, and skill exist
    const mentor = await this.prisma.user.findUnique({ where: { id: mentorId } });
    const mentee = await this.prisma.user.findUnique({ where: { id: menteeId } });
    const skill = await this.prisma.skill.findUnique({ where: { id: skillId } });

    if (!mentor) {
      throw new NotFoundException(`Mentor with ID ${mentorId} does not exist`);
    }

    if (!mentee) {
      throw new NotFoundException(`Mentee with ID ${menteeId} does not exist`);
    }

    if (!skill) {
      throw new NotFoundException(`Skill with ID ${skillId} does not exist`);
    }

    return this.prisma.session.create({
      data: {
        mentorId,
        menteeId,
        skillId,
        schedule,
      },
    });
  }

  async getAllSessions(): Promise<Session[]> {
    return this.prisma.session.findMany();
  }

  async getSessionById(id: number): Promise<Session> {
    const session = await this.prisma.session.findUnique({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException(`Session with ID ${id} does not exist`);
    }

    return session;
  }

  async updateSession(id: number, mentorId?: number, menteeId?: number, skillId?: number, schedule?: Date): Promise<Session> {
    const session = await this.prisma.session.findUnique({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException(`Session with ID ${id} does not exist`);
    }

    return this.prisma.session.update({
      where: { id },
      data: {
        mentorId,
        menteeId,
        skillId,
        schedule,
      },
    });
  }

  async deleteSession(id: number): Promise<Session> {
    const session = await this.prisma.session.findUnique({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException(`Session with ID ${id} does not exist`);
    }

    return this.prisma.session.delete({
      where: { id },
    });
  }
}
