import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PublicUserDto } from '../../dtos/user/publicUser.dto';
import { AuthUserDto } from '../../dtos/user/authUser.dto';

@Injectable()
export class UserSerializer {
  serializePublic(user: PublicUserDto) {
    return plainToClass(PublicUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  serializeAuth(user: AuthUserDto) {
    return plainToClass(AuthUserDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
