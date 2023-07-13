import { Controller, Get, Body, Put, Param, Delete, Query, HttpCode, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageQueriesDto } from './dto/message-queries.dto';
import { JwtGuard } from '../auth/guards';

@UseGuards(JwtGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  findAll(@Query() queries: MessageQueriesDto) {
    return this.messageService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOneById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.updateOneById(id, updateMessageDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.messageService.removeOneById(id);
  }
}
