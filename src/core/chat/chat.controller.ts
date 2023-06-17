import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { JwtGuard } from '../auth/guards';
import { ChatQueriesDto } from './dto/chat-queries.dto';

@UseGuards(JwtGuard)
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() body: CreateChatDto) {
    return this.chatService.create(body);
  }

  @Get()
  findAll(@Query() queries: ChatQueriesDto) {
    return this.chatService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOneById(id);
  }

  @Put(':id')
  updateOne(@Param('id') id: string, body: UpdateChatDto) {
    return this.chatService.updateOneById(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteOneById(@Param('id') id: string) {
    return this.chatService.deleteOneById(id);
  }
}
