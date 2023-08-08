import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserArticleDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
