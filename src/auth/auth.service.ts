import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpdto } from './dto/sign-up.dto';
import * as argon2 from 'argon2';
import { JwtPayload, UpdateRefreshTokenPayload } from './types';
import { SignInDto } from './dto/sign-in.dto';
import { Auth } from './types/auth.type';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private Jwt: JwtService) {}

  async signIn({ email, password }: SignInDto): Promise<Auth> {
    try {
      const { hash, id, role, ...rest } =
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

      return { user: { id, role, ...rest }, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async signUp({ password, ...rest }: SignUpdto): Promise<Auth> {
    try {
      const passwordHash = await argon2.hash(password);

      const { id, role, hash, ...other } = await this.prisma.user.create({
        data: {
          ...rest,
          hash: passwordHash,
        },
      });

      const { accessToken, refreshToken } = await this.generateTokens({
        userId: id,
        role: role,
      });

      return { user: { id, role, ...other }, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async refreshTokens(payload: UpdateRefreshTokenPayload): Promise<Auth> {
    try {
      const { id, role, hash, ...rest } =
        await this.prisma.user.findUniqueOrThrow({
          where: {
            id: payload.userId,
          },
        });

      const { accessToken, refreshToken } = await this.generateTokens({
        userId: id,
        role,
      });

      return { user: { id, role, ...rest }, accessToken, refreshToken };
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
