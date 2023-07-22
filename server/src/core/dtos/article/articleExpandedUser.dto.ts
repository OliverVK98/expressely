import { Expose, Transform } from 'class-transformer';
import { format } from 'date-fns';

export interface ExpandedUser {
  id: number;
  username: string;
  avatar: string;
}

export class ArticleExpandedUserDto {
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
  @Transform(({ obj }) => ({
    id: obj.user.id,
    avatar: obj.user.avatar,
    username: obj.user.username,
  }))
  user: ExpandedUser;

  @Expose()
  type: string[];

  @Expose()
  blocks: string[];
}
