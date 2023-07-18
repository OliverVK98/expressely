import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '../interceptors/serialize';
import { UserDto } from '../dtos/user/user.dto';
import { JsonSettingsDto } from '../entities/user.entity';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { AccessTokenGuard } from '../guards';

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
  @UseGuards(AccessTokenGuard)
  @Patch('/set-json')
  async setJsonSettings(
    @CurrentUser('userId') userId: number,
    @Body() body: JsonSettingsDto,
  ) {
    return await this.userService.setJsonSettings(userId, body);
  }
}
