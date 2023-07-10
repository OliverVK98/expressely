import { Injectable } from '@nestjs/common';
import { NestMiddleware } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { User } from '../../entities/user/user';
import { NextFunction, Request, Response } from 'express';

declare global {
  namespace Express {
    interface Request {
      currentUser: User | null;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    userId?: number;
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    const user = await this.userService.findOneById(+userId);
    req.currentUser = user ?? null;

    next();
  }
}
