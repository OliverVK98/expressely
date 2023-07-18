import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type CurrentUserArgs = 'userId' | 'email' | 'refreshToken';

export const CurrentUser = createParamDecorator(
  (data: CurrentUserArgs | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
