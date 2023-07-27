import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Serialize } from '../interceptors/serialize';
import { AuthUserDto } from '../dtos/user/authUser.dto';
import { JsonSettingsDto } from '../entities/user.entity';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { AccessTokenGuard } from '../guards';
import { UserSerializer } from '../serializers/user/user.serializer';

@Controller('users')
@Serialize(AuthUserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private userSerializer: UserSerializer,
  ) {}

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.findOneById(+id);
    return this.userSerializer.serializePublic(user);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  async getSelf(@CurrentUser('userId') userId) {
    const user = await this.userService.findOneById(+userId);
    return this.userSerializer.serializeAuth(user);
  }

  // TODO: add that can update only own settings
  @UseGuards(AccessTokenGuard)
  @Patch('/set-json')
  async setJsonSettings(
    @CurrentUser('userId') userId: number,
    @Body() body: JsonSettingsDto,
  ) {
    const user = await this.userService.setJsonSettings(userId, body);
    return this.userSerializer.serializeAuth(user);
  }
}
