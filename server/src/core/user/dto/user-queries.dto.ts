import { IsOptional } from 'class-validator';
import { Order } from 'src/common/types/order.types';
import { IsOrder } from 'src/common/validators';

export class UserQueriesDto {
  @IsOptional()
  id: string;

  @IsOptional()
  username: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  @IsOrder()
  orderByUsername: Order = 'ASC';

  @IsOptional()
  @IsOrder()
  orderByFirstName: Order;

  @IsOptional()
  @IsOrder()
  orderByLastName: Order;

  @IsOptional()
  @IsOrder()
  orderByCreatedAt: Order = 'ASC';

  @IsOptional()
  @IsOrder()
  orderByUpdatedAt: Order;
}
