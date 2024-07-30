import { IsOptional, IsInt, IsISO8601 } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSessionDto } from './create-session.dto';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
  @ApiProperty({ description: 'ID of the mentor', example: 1, required: false })
  @IsOptional()
  @IsInt()
  mentorId?: number;

  @ApiProperty({ description: 'ID of the mentee', example: 2, required: false })
  @IsOptional()
  @IsInt()
  menteeId?: number;

  @ApiProperty({ description: 'ID of the skill', example: 3, required: false })
  @IsOptional()
  @IsInt()
  skillId?: number;

  @ApiProperty({ description: 'Start time of the session in ISO8601 format', example: '2024-08-01T10:00:00Z', required: false })
  @IsOptional()
  @IsISO8601()
  startTime?: string;

  @ApiProperty({ description: 'End time of the session in ISO8601 format', example: '2024-08-01T11:00:00Z', required: false })
  @IsOptional()
  @IsISO8601()
  endTime?: string;
}
