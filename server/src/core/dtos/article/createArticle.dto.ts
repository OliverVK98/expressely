import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ArticleType } from '../../types/article';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsNumber()
  @IsOptional()
  views = 0;

  @IsString()
  @IsNotEmpty()
  img: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(ArticleType, { each: true })
  type: ArticleType[];

  @ArrayNotEmpty()
  blocks: string[];
}
