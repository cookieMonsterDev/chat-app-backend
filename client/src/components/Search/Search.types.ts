export interface SearchProps {
  className?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
}
