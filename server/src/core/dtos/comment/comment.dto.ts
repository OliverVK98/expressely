import { Expose, Transform } from 'class-transformer';

export class CommentDto {
  @Expose()
  id: number;

  @Expose()
  text: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj }) => ({
    userId: obj.user.id,
    username: obj.user.username,
    avatar: obj.user.avatar,
  }))
  user: { userId: number; username: string; avatar: string | null };
}
