import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Profile } from '../../entities/profile.entity';
import { ProfileDto } from '../../dtos/profile/profile.dto';
import { AuthProfileDto } from '../../dtos/profile/authProfile.dto';

@Injectable()
export class ProfileSerializer {
  serializePublic(profile: Profile) {
    return plainToClass(ProfileDto, profile, {
      excludeExtraneousValues: true,
    });
  }

  serializeAuth(profile: Profile) {
    return plainToClass(AuthProfileDto, profile, {
      excludeExtraneousValues: true,
    });
  }
}
