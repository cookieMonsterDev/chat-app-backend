import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { JwtPayload } from 'src/auth/types';
import { Reflector } from '@nestjs/core';

@Injectable()
export class IsSameIdOrAdminGuard extends JwtGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = req.user as JwtPayload;
    const userId = req.params.userId as string;
    return user.userId === userId || user.role === 'ADMIN';
  }
}
