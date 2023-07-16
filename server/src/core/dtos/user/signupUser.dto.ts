import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FeaturesDto, JsonSettingsDto } from '../../entities/user.entity';
import { UserRole } from '../../types/user';
import { Type } from 'class-transformer';

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

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  roles?: UserRole[] = [UserRole.USER];

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => FeaturesDto)
  features?: FeaturesDto;

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => JsonSettingsDto)
  jsonSettings?: JsonSettingsDto;
}
