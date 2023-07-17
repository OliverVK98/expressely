import { User } from '../../entities/user.entity';

export class UserTokenDto {
  userId: number;
  email: string;
}

export const userTokenDtoMapper = (user: User): UserTokenDto => {
  return {
    userId: user.id,
    email: user.email,
  };
};
