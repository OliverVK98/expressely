import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserHistoryDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  articleId: number;
}
