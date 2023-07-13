import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { PageOrder, PageSort } from '../../types/page';
import { ArticleType } from '../../types/article';

export class PageOptionsDto {
  @IsEnum(PageOrder)
  @IsOptional()
  readonly order?: PageOrder = PageOrder.ASC;

  @IsEnum(PageSort)
  @IsOptional()
  readonly sort?: PageSort = PageSort.createdAt;

  @IsString()
  @IsOptional()
  readonly search?: string = '';

  @IsEnum(ArticleType)
  @IsOptional()
  readonly type?: ArticleType = ArticleType.All;

  @IsString()
  @IsOptional()
  readonly expand?: string = '';

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly limit?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
