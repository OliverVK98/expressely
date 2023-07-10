import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  subtitle?: string;

  @IsString()
  img: string;

  @IsNumber()
  views: number;

  @IsArray()
  @IsString({ each: true })
  type: string[];

  @IsArray()
  @IsString({ each: true })
  blocks: string[];
}
