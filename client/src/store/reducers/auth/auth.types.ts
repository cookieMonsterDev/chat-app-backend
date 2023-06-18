export interface AuthTypes {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export interface User {
  id: string;
  role: string;
  email: string;
  username: string | null;
  authProvider: string;
  avatarUrl: string | null;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}
