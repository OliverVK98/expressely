import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { UserRole } from '../../types/user';

export class UpdateUserRoleDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  userId: number;

  @IsEnum(UserRole)
  role: UserRole;
}
