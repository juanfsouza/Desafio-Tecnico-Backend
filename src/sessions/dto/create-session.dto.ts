import { IsNotEmpty, IsInt, IsISO8601 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty({ description: 'ID of the mentor', example: 6 })
  @IsNotEmpty()
  @IsInt()
  mentorId: number;

  @ApiProperty({ description: 'ID of the mentee', example: 5 })
  @IsNotEmpty()
  @IsInt()
  menteeId: number;

  @ApiProperty({ description: 'ID of the skill', example: 1 })
  @IsNotEmpty()
  @IsInt()
  skillId: number;

  @ApiProperty({ description: 'Start time of the session in ISO8601 format', example: '2024-08-01T10:00:00Z' })
  @IsNotEmpty()
  @IsISO8601()
  startTime: string;

  @ApiProperty({ description: 'End time of the session in ISO8601 format', example: '2024-08-01T11:00:00Z' })
  @IsNotEmpty()
  @IsISO8601()
  endTime: string;
}
