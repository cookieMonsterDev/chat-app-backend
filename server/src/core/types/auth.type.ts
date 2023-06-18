import { User } from '../user/entities/user.entity';

export interface Auth {
  user: Partial<User>;
  accessToken: string;
  refreshToken: string;
}
