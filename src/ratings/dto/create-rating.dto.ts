import { IsInt, IsString } from 'class-validator';

export class CreateRatingDto {
  @IsInt()
  sessionId: number;

  @IsInt()
  score: number;

  @IsString()
  comment: string;
}
