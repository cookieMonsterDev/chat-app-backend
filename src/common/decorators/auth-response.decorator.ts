import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth } from 'src/core/types/auth.type';

export const AuthResponse = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const auth = request.user as Auth;
    return auth;
  },
);
