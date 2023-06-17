import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Chat } from './entities/chat.entity';
import { ChatQueriesDto } from './dto/chat-queries.dto';
import publicUserSelect from 'src/common/selecrs/public-user.select';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}

  async create(data: CreateChatDto) {
    try {
      const users = data.users.map((e) => {
        return {
          id: e,
        };
      });

      const newChat = await this.chatRepository.create({
        name: data.name,
        chatType: data.chatType,
        users,
        id: uuid(),
      });

      const chat = await this.chatRepository.save(newChat);

      return chat;
    } catch (error) {
      throw error;
    }
  }

  async findAll(queries: ChatQueriesDto) {
    try {
      const chats = await this.chatRepository.find({
        where: {
          id: queries.id,
          users: queries.userId && { id: queries.userId },
          messages: queries.messageId && { id: queries.messageId },
        },
        order: {
          createdAt: queries.orderByCreatedAt,
          updatedAt: queries.orderByUpdatedAt,
        },
      });

      return chats;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOneById(chatId: string) {
    try {
      const chat = await this.chatRepository.findOneOrFail({
        where: { id: chatId },
        relations: ['messages', 'users'],
        select: {
          users: publicUserSelect,
        },
      });

      return chat;
    } catch (error) {
      throw error;
    }
  }

  async updateObneById(chatId: string, data: UpdateChatDto) {
    try {
      const users = data.users.map((e) => {
        return {
          id: e,
        };
      });

      const messages = data.messages.map((e) => {
        return {
          id: e,
        };
      });

      const newChat = await this.chatRepository.update(chatId, {
        name: data.name,
        chatType: data.chatType,
        messages,
        users,
      });

      return newChat;
    } catch (error) {
      throw error;
    }
  }

  async deleteOneById(chatId: string) {
    try {
      const user = await this.chatRepository.findOneOrFail({
        where: { id: chatId },
      });
      await this.chatRepository.remove(user);

      return;
    } catch (error) {
      throw error;
    }
  }
}
