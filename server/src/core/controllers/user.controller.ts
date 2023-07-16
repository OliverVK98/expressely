import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '../interceptors/serialize';
import { UserDto } from '../dtos/user/user.dto';
import { JsonSettingsDto, User } from '../entities/user.entity';
import { CurrentUser } from '../decorators/currentUser';

@Controller('users')
@ApiTags('user')
@Serialize(UserDto)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findOneById(+id);
  }

  // TODO: add that can update only own settings
  @Patch('/set-json')
  async setJsonSettings(
    @CurrentUser() user: User,
    @Body() body: JsonSettingsDto,
  ) {
    return await this.userService.setJsonSettings(user.id, body);
  }
}
