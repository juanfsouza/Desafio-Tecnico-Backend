import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from '@prisma/client';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async createSession(createSessionDto: CreateSessionDto): Promise<Session> {
    const { mentorId, menteeId, skillId, startTime, endTime } = createSessionDto;

    const mentor = await this.prisma.user.findUnique({ where: { id: mentorId } });
    const mentee = await this.prisma.user.findUnique({ where: { id: menteeId } });

    if (!mentor || mentor.role !== 'MENTOR') {
      throw new HttpException('Mentor not found or user is not a mentor', HttpStatus.BAD_REQUEST);
    }

    if (!mentee || mentee.role !== 'MENTEE') {
      throw new HttpException('Mentee not found or user is not a mentee', HttpStatus.BAD_REQUEST);
    }

    const skill = await this.prisma.skill.findUnique({ where: { id: skillId } });
    if (!skill) {
      throw new HttpException('Skill not found', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.session.create({
      data: {
        mentorId,
        menteeId,
        skillId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });
  }

  async getSessions(): Promise<any[]> {
    const sessions = await this.prisma.session.findMany({
      include: {
        mentor: true,
        mentee: true,
        skill: true,
      },
    });

    return sessions.map(session => ({
      id: session.id,
      mentor: session.mentor.name,
      mentee: session.mentee.name,
      skill: session.skill.name,
      startTime: session.startTime,
      endTime: session.endTime,
    }));
  }

  async getSessionById(id: number): Promise<any> {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: {
        mentor: true,
        mentee: true,
        skill: true,
      },
    });

    if (!session) {
      throw new HttpException('Session not found', HttpStatus.NOT_FOUND);
    }

    return {
      id: session.id,
      mentor: session.mentor.name,
      mentee: session.mentee.name,
      skill: session.skill.name,
      startTime: session.startTime,
      endTime: session.endTime,
    };
  }

  async updateSession(id: number, updateSessionDto: UpdateSessionDto): Promise<Session> {
    const existingSession = await this.prisma.session.findUnique({ where: { id } });

    if (!existingSession) {
      throw new HttpException('Session not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.session.update({
      where: { id },
      data: {
        ...(updateSessionDto.mentorId && { mentorId: updateSessionDto.mentorId }),
        ...(updateSessionDto.menteeId && { menteeId: updateSessionDto.menteeId }),
        ...(updateSessionDto.skillId && { skillId: updateSessionDto.skillId }),
        ...(updateSessionDto.startTime && { startTime: new Date(updateSessionDto.startTime) }),
        ...(updateSessionDto.endTime && { endTime: new Date(updateSessionDto.endTime) }),
      },
    });
  }

  async deleteSession(id: number): Promise<Session> {
    const session = await this.prisma.session.findUnique({ where: { id } });

    if (!session) {
      throw new HttpException('Session not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.session.delete({ where: { id } });
  }
}
