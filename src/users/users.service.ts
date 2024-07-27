import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { email: string; password: string; name: string; role: Role }): Promise<User> {
    console.log('Creating user with data:', data);
    return this.prisma.user.create({ data });
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
