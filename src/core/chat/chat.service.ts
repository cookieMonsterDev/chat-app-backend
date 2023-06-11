import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}

  async create(data: CreateChatDto) {
    try {
      const newChat = await this.chatRepository.create({
        users: [
          { id: '0c1df6c4-5045-4b3d-8879-612ae2b0c93d' },
          { id: 'a8996662-d128-4299-868b-54e5bd401be5' },
        ],
        id: uuid()
      });

      const chat = await this.chatRepository.save(newChat);

      return chat;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const chats = await this.chatRepository.find();

      return chats;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async findOneById(chatId: string) {
    try {
      const chat = await this.chatRepository.findOneOrFail({
        where: { id: chatId },
        relations: ['messages', 'users'],
      });

      return chat;
    } catch (error) {
      throw error;
    }
  }
}
