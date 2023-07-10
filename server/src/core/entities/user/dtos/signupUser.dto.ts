import { IsEmail, IsJSON, IsString } from 'class-validator';
import { Features, JsonSettings } from '../user';

export class SignupUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  avatar?: string;

  @IsJSON()
  features: Features;

  @IsJSON()
  jsonSettings: JsonSettings;
}
