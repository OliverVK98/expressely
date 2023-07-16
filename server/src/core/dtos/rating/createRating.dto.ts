import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRatingDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly articleId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly rate: number;

  @IsOptional()
  @IsString()
  readonly feedback?: string;
}
