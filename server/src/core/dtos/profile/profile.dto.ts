import { Expose } from 'class-transformer';

export class ProfileDto {
  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  age: number;

  @Expose()
  username: string;

  @Expose()
  avatar: string;
}
