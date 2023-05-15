import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Registerdto } from './dto/register.dto';
import { JwtPayload } from './types/jwt-payload';
import { LoginDto } from './dto/login.dto';
import { Auth } from '../types/auth.type';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private Jwt: JwtService,
  ) {}

  async signIn({ email, password }: LoginDto): Promise<Auth> {
    try {
      const { hash, id, role, ...rest } =
        await this.usersRepository.findOneOrFail({
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

  async signUp({ password, ...rest }: Registerdto): Promise<Auth> {
    try {
      const passwordHash = await argon2.hash(password);

      const newUser = await this.usersRepository.create({
        hash: passwordHash,
        ...rest,
      });

      const { id, role, hash, ...other } = await this.usersRepository.save(
        newUser,
      );

      const { accessToken, refreshToken } = await this.generateTokens({
        userId: id,
        role: role,
      });

      return { user: { id, role, ...other }, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async refreshTokens(userId: string): Promise<Auth> {
    try {
      const { id, role, hash, ...rest } =
        await this.usersRepository.findOneOrFail({
          where: {
            id: userId,
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
        secret: 'secret1',
        expiresIn: '15m',
      }),
      this.Jwt.sign(payload, {
        secret: 'secret2',
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
