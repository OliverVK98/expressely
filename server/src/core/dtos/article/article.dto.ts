import { Expose, Transform } from 'class-transformer';
import { format } from 'date-fns';

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
  @Transform(({ obj }) => format(obj.createdAt, 'MM/dd/yyyy'))
  createdAt: string;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;

  @Expose()
  type: string[];

  @Expose()
  blocks: string[];
}
