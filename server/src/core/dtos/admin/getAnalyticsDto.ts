import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAnalyticsDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(2022)
  year: number;
}
