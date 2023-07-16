import { Expose, Transform } from 'class-transformer';

export class RatingDto {
  @Expose()
  id: number;

  @Expose()
  rate: number;

  @Expose()
  feedback: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;

  @Expose()
  @Transform(({ obj }) => obj.article.id)
  articleId: number;
}
