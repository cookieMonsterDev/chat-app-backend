export interface JwtPayload {
  userId: string;
  role: string;
}

export interface UpdateRefreshTokenPayload {
  userId: string;
  token: string | null;
}

export interface AuthResponsePayload {
  user: any;
  accessToken: string;
  refreshToken: string;
}
