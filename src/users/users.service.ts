import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

const retTypes = {
  id: true,
  username: true,
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

  async findAll() {
    try {
      const users = this.prisma.user.findMany({
        select: { ...retTypes },
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  async findOneById(userId: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id: userId },
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
