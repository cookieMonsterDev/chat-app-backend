import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async indexAll(): Promise<void> {
    const entities = await this.usersRepository.find();

    for (const entity of entities) {
      await this.elasticsearchService.index({
        index: 'your_index_name',
        body: {
          id: entity.id,
        },
      });
    }
  }

  async search(query: string): Promise<any> {
    const any = await this.elasticsearchService.search({
      index: 'your_index_name',
      body: {
        query: {
          match: {
            field_name: query,
          },
        },
      },
    });

    return any;
  }
}
