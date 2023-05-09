import { Injectable, ExecutionContext } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { JwtPayload } from 'src/auth/types';

@Injectable()
export class IsSameIdOrAdminForFileGuard extends JwtGuard {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = req.user as JwtPayload;
    const userIdFromFile = req.params.id.split('_')[1];
    return user.userId === userIdFromFile || user.role === 'ADMIN';
  }
}
