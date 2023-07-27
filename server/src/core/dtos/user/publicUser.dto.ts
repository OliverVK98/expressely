import { Expose } from 'class-transformer';
import { FeaturesDto, JsonSettingsDto } from '../../entities/user.entity';

export class PublicUserDto {
  @Expose()
  username: string;

  @Expose()
  avatar: string | null;

  @Expose()
  roles: string[];

  @Expose()
  features: FeaturesDto;

  @Expose()
  jsonSettings: JsonSettingsDto;
}
