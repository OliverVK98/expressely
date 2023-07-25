import { FeaturesDto, JsonSettingsDto } from '../../entities/user.entity';
import { UserRole } from '../../types/user';

export class CreateUserDto {
  username: string;

  password: string;

  email: string;

  avatar?: string;

  roles: UserRole[] = [UserRole.USER];

  features?: FeaturesDto;

  jsonSettings?: JsonSettingsDto;
}
