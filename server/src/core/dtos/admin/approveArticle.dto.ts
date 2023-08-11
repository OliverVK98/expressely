import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class ApproveArticleDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  articleId: number;
}
