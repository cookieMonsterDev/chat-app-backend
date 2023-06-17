import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm/repository/Repository';
import { v4 as uuid } from 'uuid';
import { MessageQueriesDto } from './dto/message-queries.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async create(data: CreateMessageDto) {
    try {
      const newMessage = await this.messageRepository.create({
        id: uuid(),
        text: data.text,
        user: { id: data.userId },
        chat: { id: data.chatId },
      });

      const message = await this.messageRepository.save(newMessage);

      return message;
    } catch (error) {
      throw error;
    }
  }

  async findAll(queries: MessageQueriesDto) {
    try {
      const messages = await this.messageRepository.find({
        where: {
          user: queries.userId && { id: queries.userId },
          chat: queries.chatId && { id: queries.chatId },
        },
        order: {
          createdAt: queries.orderByCreatedAt,
          updatedAt: queries.orderByUpdatedAt,
        },
      });

      return messages;
    } catch (error) {
      throw error;
    }
  }

  async findOneById(messageId: string) {
    try {
      const message = this.messageRepository.findOneOrFail({
        where: { id: messageId },
      });

      return message;
    } catch (error) {
      throw error;
    }
  }

  async updateOneById(messageId: string, data: UpdateMessageDto) {
    try {
      const message = this.messageRepository.update(messageId, {
        text: data.text,
      });

      return message;
    } catch (error) {
      throw error;
    }
  }

  async removeOneById(messageId: string) {
    try {
      const message = await this.messageRepository.findOneOrFail({
        where: { id: messageId },
      });
      await this.messageRepository.remove(message);

      return;
    } catch (error) {
      throw error;
    }
  }
}
