import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Country, Currency } from '../../types/profile';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  readonly firstname: string;

  @IsOptional()
  @IsString()
  readonly lastname: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  readonly age: number;

  @IsOptional()
  @IsEnum(Country)
  country: Country;

  @IsOptional()
  @IsEnum(Currency)
  currency: Currency;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  avatar: string;
}
