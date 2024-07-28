import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Rating } from '@prisma/client';

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  async createRating(sessionId: number, score: number, comment: string): Promise<Rating> {
    const session = await this.prisma.session.findUnique({ where: { id: sessionId } });
    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} does not exist`);
    }

    return this.prisma.rating.create({
      data: {
        sessionId,
        score,
        comment,
      },
    });
  }

  async getAllRatings(): Promise<Rating[]> {
    return this.prisma.rating.findMany();
  }

  async getRatingById(id: number): Promise<Rating> {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
    });

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} does not exist`);
    }

    return rating;
  }

  async updateRating(id: number, score: number, comment: string): Promise<Rating> {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
    });

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} does not exist`);
    }

    return this.prisma.rating.update({
      where: { id },
      data: {
        score,
        comment,
      },
    });
  }

  async deleteRating(id: number): Promise<Rating> {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
    });

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} does not exist`);
    }

    return this.prisma.rating.delete({
      where: { id },
    });
  }
}
