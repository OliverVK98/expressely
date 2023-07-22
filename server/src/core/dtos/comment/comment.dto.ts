import { Expose, Transform } from 'class-transformer';
import { format } from 'date-fns';

export class CommentDto {
  @Expose()
  id: number;

  @Expose()
  text: string;

  @Expose()
  @Transform(({ obj }) => format(obj.createdAt, 'MM/dd/yyyy'))
  createdAt: string;

  @Expose()
  @Transform(({ obj }) => ({
    id: obj.user.id,
    username: obj.user.username,
    avatar: obj.user.avatar,
  }))
  user: { id: number; username: string; avatar: string | null };
}
