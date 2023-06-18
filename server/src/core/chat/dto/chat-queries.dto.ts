import { IsOptional } from 'class-validator';
import { Order } from 'src/common/types/order.types';
import { IsOrder } from 'src/common/validators';

export class ChatQueriesDto {
  @IsOptional()
  id: string;

  @IsOptional()
  userId: string;

  @IsOptional()
  messageId: string;

  @IsOptional()
  @IsOrder()
  orderByCreatedAt: Order = 'ASC';

  @IsOptional()
  @IsOrder()
  orderByUpdatedAt: Order;
}