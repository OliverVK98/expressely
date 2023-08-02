import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateArticleDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsNumber()
  @IsOptional()
  views = 0;

  @IsString()
  @IsOptional()
  img: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  type: string[];

  @IsArray()
  @IsOptional()
  blocks: string[];
}
