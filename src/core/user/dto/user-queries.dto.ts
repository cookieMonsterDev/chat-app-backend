import { IsOptional } from 'class-validator';
import { IsOrder } from 'src/common/validators';

type Order = 'ASC' | 'DESC';

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
