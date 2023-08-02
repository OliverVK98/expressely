import { Expose, Transform } from 'class-transformer';
import { format } from 'date-fns';

export class NotificationDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  @Transform(({ obj }) => format(obj.createdAt, 'MM/dd/yyyy'))
  createdAt: string;

  @Expose()
  href: string | null;
}
