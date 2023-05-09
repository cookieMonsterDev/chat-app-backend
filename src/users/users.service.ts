import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PublicUser } from './types/user.type';

const userFields = {
  id: true,
  role: true,
  email: true,
  username: true,
  authProvider: true,
  avatarUrl: true,
  firstName: true,
  lastName: true,
  bio: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<PublicUser[]> {
    try {
      const users = this.prisma.user.findMany({ select: { ...userFields } });

      return users;
    } catch (error) {
      throw error;
    }
  }

  async findOneById(userId: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: { ...userFields },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateOneById(userId: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: { ...updateUserDto },
        select: { ...userFields },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async removeOneById(userId: string) {
    try {
      await this.prisma.user.delete({ where: { id: userId } });
    } catch (error) {
      throw error;
    }
  }
}
