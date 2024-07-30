import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'userr@gmail.com', description: 'Email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'Password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'Julia', description: 'Name of the user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'MENTEE', enum: Role, description: 'Role of the user' })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
