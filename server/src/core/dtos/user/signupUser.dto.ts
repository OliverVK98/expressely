import {
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
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
import { Country, Currency } from '../../types/profile';

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

  @IsNotEmpty()
  @IsString()
  readonly firstname: string;

  @IsNotEmpty()
  @IsString()
  readonly lastname: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly age: number;

  @IsNotEmpty()
  @IsEnum(Country)
  country: Country;

  @IsNotEmpty()
  @IsEnum(Currency)
  currency: Currency;

  @IsNotEmpty()
  @IsString()
  city: string;
}
