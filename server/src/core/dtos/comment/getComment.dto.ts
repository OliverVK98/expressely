import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCommentDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly articleId: number;
}
