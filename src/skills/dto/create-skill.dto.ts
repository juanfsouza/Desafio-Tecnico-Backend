import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty({ example: 'NestJs', description: 'skill of the user' })
  @IsString()
  name: string;
}
