import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      return false;
    }

    const token = authorizationHeader.split(' ')[1];

    try {
      const userPayload = jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECRET,
      ) as any;
      const isAdmin = await this.userService.isUserAdmin(userPayload.userId);
      if (isAdmin) {
        return true;
      } else {
        throw new ForbiddenException(
          'You do not have permission to access this resource.',
        );
      }
    } catch (error) {
      return false;
    }
  }
}
