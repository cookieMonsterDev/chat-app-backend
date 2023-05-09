import { PublicUser } from 'src/users/types/user.type';

export interface Auth {
  user: PublicUser;
  accessToken: string;
  refreshToken: string;
}
