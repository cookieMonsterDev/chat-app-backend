import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(userId: string) {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { id: userId },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
