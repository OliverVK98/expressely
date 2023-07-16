import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class RatingOptionsDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly userId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly articleId: number;
}
