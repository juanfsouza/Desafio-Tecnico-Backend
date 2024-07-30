import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRatingDto } from './create-rating.dto';

export class UpdateRatingDto extends PartialType(CreateRatingDto) {
  @ApiProperty({ description: 'Rating score', example: 5, required: false })
  @IsOptional()
  @IsInt()
  score?: number;

  @ApiProperty({ description: 'Comments on the rating', example: 'Great session!', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}
