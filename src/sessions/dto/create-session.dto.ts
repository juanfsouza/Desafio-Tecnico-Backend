import { IsInt, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateSessionDto {
  @IsInt()
  @IsNotEmpty()
  mentorId: number;

  @IsInt()
  @IsNotEmpty()
  menteeId: number;

  @IsInt()
  @IsNotEmpty()
  skillId: number;

  @IsDateString()
  @IsNotEmpty()
  schedule: string;
}
