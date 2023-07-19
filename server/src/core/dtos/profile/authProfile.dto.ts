import { Expose, Transform } from 'class-transformer';

export class AuthProfileDto {
  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  age: number;

  @Expose()
  currency: string;

  @Expose()
  country: string;

  @Expose()
  city: string;

  @Expose()
  username: string;

  @Expose()
  avatar: string | null;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;
}
