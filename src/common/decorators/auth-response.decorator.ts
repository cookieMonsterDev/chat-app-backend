import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthResponsePayload } from 'src/auth/types';

export const AuthResponse = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const tokens = request.user as AuthResponsePayload;
    return tokens;
  },
);
