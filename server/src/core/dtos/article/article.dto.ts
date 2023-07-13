import { Expose, Transform } from 'class-transformer';

export class ArticleDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  subtitle: string;

  @Expose()
  img: string;

  @Expose()
  views: number;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;

  @Expose()
  type: string[];

  @Expose()
  blocks: string[];
}
