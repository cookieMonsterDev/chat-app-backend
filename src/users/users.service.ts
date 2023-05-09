import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PublicUser } from './types/user.type';
import { unlink } from 'fs';

const userFields = {
  id: true,
  role: true,
  email: true,
  username: true,
  authProvider: true,
  avatar: true,
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

  async updateOneById(userId: string, { filename, ...body }: any) {
    try {
      const { avatar } = await this.prisma.user.findFirstOrThrow({
        where: { id: userId },
      });

      if (avatar) {
        const currentFile = avatar.substring(
          avatar.indexOf('files/') + 'files/'.length,
        );

        unlink(`./uploads/${currentFile}`, (err) => {
          if (err) console.log('Something went wrong');
        });
      }

      const newAvatar = `${process.env.ROOT_URL}files/${filename}`;

      const user = await this.prisma.user.update({
        where: { id: userId },
        data: { ...body, avatar: newAvatar },
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
