import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsNotEmpty()
  @IsString({ each: true })
  type: string[];

  @ArrayNotEmpty()
  blocks: string[];
}
