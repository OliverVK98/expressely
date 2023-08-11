import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteCommentDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  commentId: number;
}
