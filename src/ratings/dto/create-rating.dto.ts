import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRatingDto {
  @ApiProperty({ description: 'ID of the session', example: 1 })
  @IsInt()
  sessionId: number;

  @ApiProperty({ description: 'Rating score', example: 5 })
  @IsInt()
  score: number;

  @ApiProperty({ description: 'Comments on the rating', example: 'Great session!' })
  @IsString()
  comment: string;
}
