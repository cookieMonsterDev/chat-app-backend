import { IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  chatId: string;

  @IsNotEmpty()
  text: string;
}
