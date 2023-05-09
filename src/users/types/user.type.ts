export interface User {
  id: string;
  email: string;
  username: string;
  authProvider: string;
  hash: string;
  role: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PublicUser = Omit<User, 'hash'>;
