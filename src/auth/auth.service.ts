import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpdto } from './dto/sign-up.dto';
import * as argon2 from 'argon2';
import { JwtPayload, UpdateRefreshTokenPayload } from './types';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private Jwt: JwtService) {}

  async signIn({ email, password }: SignInDto) {
    try {
      const { hash, id, role, refresh, ...rest } =
        await this.prisma.user.findUniqueOrThrow({
          where: { email },
        });

      const passMatches = await argon2.verify(hash, password);
      if (!passMatches)
        throw new ForbiddenException('Email or password is wrong');

      const { accessToken, refreshToken } = await this.generateTokens({
        userId: id,
        role: role,
      });

      await this.updateRefreshToken({ userId: id, token: refreshToken });

      return { user: { id, role, ...rest }, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async signUp({ password, ...rest }: SignUpdto) {
    try {
      const hash = await argon2.hash(password);

      const { id, role, ...other } = await this.prisma.user.create({
        data: {
          ...rest,
          hash,
        },
      });

      const { accessToken, refreshToken } = await this.generateTokens({
        userId: id,
        role: role,
      });

      await this.updateRefreshToken({ userId: id, token: refreshToken });

      return { user: { id, role, ...other }, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async refreshTokens(payload: UpdateRefreshTokenPayload) {
    try {
      const { id, refresh, role, hash, ...rest } = await this.prisma.user.findUnique({
        where: {
          id: payload.userId,
        },
      });

      if (!id) throw new NotFoundException('user not found');

      const rtMatches = await argon2.verify(refresh, payload.token);
      if (!rtMatches) throw new ForbiddenException('Access Denied');

      const { accessToken, refreshToken } = await this.generateTokens({
        userId: id,
        role,
      });

      await this.updateRefreshToken({ userId: id, token: refreshToken });

      return { user: {id, role, ...rest}, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async signOut(userId: string) {
    try {
      await this.updateRefreshToken({ userId, token: null });
    } catch (error) {
      throw error;
    }
  }

  private async updateRefreshToken(payload: UpdateRefreshTokenPayload) {
    try {
      const refresh = payload.token ? await argon2.hash(payload.token) : null;

      await this.prisma.user.update({
        where: {
          id: payload.userId,
        },
        data: {
          refresh,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  private async generateTokens(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.Jwt.sign(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '15m',
      }),
      this.Jwt.sign(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
