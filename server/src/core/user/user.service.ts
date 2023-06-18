import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserQueriesDto } from './dto/user-queries.dto';
import publicUserSelect from 'src/common/selecrs/public-user.select';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(queries: UserQueriesDto) {
    try {
      const users = await this.usersRepository.find({
        where: {
          id: queries.id,
          username: queries.username,
          firstName: queries.firstName,
          lastName: queries.lastName,
        },
        order: {
          username: queries.orderByUsername,
          firstName: queries.orderByFirstName,
          lastName: queries.orderByLastName,
          createdAt: queries.orderByCreatedAt,
          updatedAt: queries.orderByUpdatedAt,
        },
        select: publicUserSelect,
      });

      return users;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async findOneById(userId: string) {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { id: userId },
        select: publicUserSelect,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteOneById(userId: string) {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { id: userId },
      });
      await this.usersRepository.remove(user);

      return;
    } catch (error) {
      throw error;
    }
  }
}
