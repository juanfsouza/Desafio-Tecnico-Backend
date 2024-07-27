import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { Rating } from '@prisma/client';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  async createRating(@Body() createRatingDto: { sessionId: number; score: number; comment: string }): Promise<Rating> {
    const { sessionId, score, comment } = createRatingDto;
    return this.ratingsService.createRating(sessionId, score, comment);
  }

  @Get()
  async getAllRatings(): Promise<Rating[]> {
    return this.ratingsService.getAllRatings();
  }

  @Get(':id')
  async getRatingById(@Param('id', ParseIntPipe) id: number): Promise<Rating> {
    const rating = await this.ratingsService.getRatingById(id);
    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} does not exist`);
    }
    return rating;
  }

  @Put(':id')
  async updateRating(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRatingDto: { score: number; comment: string },
  ): Promise<Rating> {
    const { score, comment } = updateRatingDto;
    return this.ratingsService.updateRating(id, score, comment);
  }

  @Delete(':id')
  async deleteRating(@Param('id', ParseIntPipe) id: number): Promise<Rating> {
    return this.ratingsService.deleteRating(id);
  }
}
