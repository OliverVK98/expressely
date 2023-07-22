import { Expose, Transform } from 'class-transformer';
import { format } from 'date-fns';

export class RatingDto {
  @Expose()
  id: number;

  @Expose()
  rate: number;

  @Expose()
  feedback: string;

  @Expose()
  @Transform(({ obj }) => format(obj.createdAt, 'MM/dd/yyyy'))
  createdAt: string;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;

  @Expose()
  @Transform(({ obj }) => obj.article.id)
  articleId: number;
}
