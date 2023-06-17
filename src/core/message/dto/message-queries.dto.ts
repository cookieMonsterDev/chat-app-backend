import { IsOptional } from 'class-validator';
import { Order } from 'src/common/types/order.types';
import { IsOrder } from 'src/common/validators';

export class MessageQueriesDto {
  @IsOptional()
  userId: string;

  @IsOptional()
  chatId: string;

  @IsOptional()
  @IsOrder()
  orderByCreatedAt: Order = 'ASC';

  @IsOptional()
  @IsOrder()
  orderByUpdatedAt: Order;
}