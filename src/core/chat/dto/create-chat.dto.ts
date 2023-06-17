import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ChatTypes } from '../types/chat-types';

export class CreateChatDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsEnum(ChatTypes)
  chatType: ChatTypes = ChatTypes.CHAT;

  @IsString({ each: true })
  @MinLength(1)
  users: string[];

  @IsOptional()
  @IsString({ each: true })
  messages: string[];
}
