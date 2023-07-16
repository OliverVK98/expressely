import { User } from '../../entities/user.entity';

export class UserTokenDto {
  userId: number;
}

export const userTokenDtoMapper = (user: User): UserTokenDto => {
  return {
    userId: user.id,
  };
};
