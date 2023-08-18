import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class GetNotApprovedArticleDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  articleId: number;
}
