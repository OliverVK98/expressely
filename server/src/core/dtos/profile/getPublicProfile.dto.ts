import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPublicProfileDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}
