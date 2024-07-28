import { IsNotEmpty, IsInt, IsISO8601 } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsInt()
  mentorId: number;

  @IsNotEmpty()
  @IsInt()
  menteeId: number;

  @IsNotEmpty()
  @IsInt()
  skillId: number;

  @IsNotEmpty()
  @IsISO8601()
  startTime: string;

  @IsNotEmpty()
  @IsISO8601()
  endTime: string;
}
