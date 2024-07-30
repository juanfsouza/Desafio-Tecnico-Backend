import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: createUserDto });
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async deleteUser(id: number): Promise<User> {
    try {
      console.log(`Service: Deleting user with id: ${id}`);
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        console.log(`Service: User with id ${id} not found`);
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const deletedUser = await this.prisma.user.delete({
        where: { id },
      });

      console.log(`Service: Deleted user: ${JSON.stringify(deletedUser)}`);
      return deletedUser;
    } catch (error) {
      if (error.code === 'P2003') {
        throw new HttpException('Cannot delete user due to related records', HttpStatus.CONFLICT);
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
