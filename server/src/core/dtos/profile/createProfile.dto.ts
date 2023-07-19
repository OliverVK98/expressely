import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Country, Currency } from '../../types/profile';

export class CreateProfileDto {
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

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
  avatar: string;
}
