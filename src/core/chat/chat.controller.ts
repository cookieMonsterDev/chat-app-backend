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
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { JwtGuard } from '../auth/guards';
import { UserOrAdminGuard } from 'src/common/guards';

@UseGuards(JwtGuard)
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() body: CreateChatDto) {
    return this.chatService.create(body);
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOneById(id);
  }

  @Put(':id')
  updateOne(@Param('id') id: string) {
    return id;
  }

  @UseGuards(UserOrAdminGuard)
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return id;
  }
}
