import { Expose, Transform } from 'class-transformer';

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
  createdAt: Date;

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
