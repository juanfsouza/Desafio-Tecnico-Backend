import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { Rating } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@ApiTags('ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @ApiOperation({ summary: 'Create a new rating' })
  @ApiBody({ type: CreateRatingDto })
  @ApiResponse({ status: 201, description: 'The rating has been successfully created.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post()
  async createRating(@Body() createRatingDto: CreateRatingDto): Promise<Rating> {
    const { sessionId, score, comment } = createRatingDto;
    return this.ratingsService.createRating(sessionId, score, comment);
  }

  @ApiOperation({ summary: 'Get all ratings' })
  @ApiResponse({ status: 200, description: 'List of ratings', type: [CreateRatingDto] })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get()
  async getAllRatings(): Promise<Rating[]> {
    return this.ratingsService.getAllRatings();
  }

  @ApiOperation({ summary: 'Get rating by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Rating ID' })
  @ApiResponse({ status: 200, description: 'The rating has been successfully retrieved.', type: [CreateRatingDto] })
  @ApiResponse({ status: 404, description: 'Rating not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get(':id')
  async getRatingById(@Param('id', ParseIntPipe) id: number): Promise<Rating> {
    const rating = await this.ratingsService.getRatingById(id);
    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} does not exist`);
    }
    return rating;
  }

  @ApiOperation({ summary: 'Update rating by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Rating ID' })
  @ApiBody({ type: UpdateRatingDto })
  @ApiResponse({ status: 200, description: 'The rating has been successfully updated.', type: [CreateRatingDto] })
  @ApiResponse({ status: 404, description: 'Rating not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Put(':id')
  async updateRating(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRatingDto: UpdateRatingDto
  ): Promise<Rating> {
    const { score, comment } = updateRatingDto;
    return this.ratingsService.updateRating(id, score, comment);
  }

  @ApiOperation({ summary: 'Delete rating by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Rating ID' })
  @ApiResponse({ status: 200, description: 'The rating has been successfully deleted.', type: [CreateRatingDto] })
  @ApiResponse({ status: 404, description: 'Rating not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Delete(':id')
  async deleteRating(@Param('id', ParseIntPipe) id: number): Promise<Rating> {
    return this.ratingsService.deleteRating(id);
  }
}
