import { IsInt, IsDate } from 'class-validator';

export class CreateSessionDto {
  @IsInt()
  mentorId: number;

  @IsInt()
  menteeId: number;

  @IsInt()
  skillId: number;

  @IsDate()
  schedule: Date;
}
