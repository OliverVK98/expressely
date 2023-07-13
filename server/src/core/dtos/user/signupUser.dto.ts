import {
  ArrayNotEmpty,
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Features, JsonSettings } from '../../entities/user.entity';

export class SignupUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  roles: string[];

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsJSON()
  @IsOptional()
  features?: Features;

  @IsJSON()
  @IsOptional()
  jsonSettings?: JsonSettings;
}
