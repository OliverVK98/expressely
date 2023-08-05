import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserPreference, UserPreferenceAction } from '../../types/user';

export class UpdateUserPreferencesDto {
  @IsNotEmpty()
  @IsEnum(UserPreference)
  preference: UserPreference;

  @IsNotEmpty()
  @IsEnum(UserPreferenceAction)
  action: UserPreferenceAction;
}
