import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JsonSettingsDto } from '../entities/user.entity';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { AccessTokenGuard } from '../guards';
import { UserSerializer } from '../serializers/user/user.serializer';
import { UpdateUserPreferencesDto } from '../dtos/user/updateUserPreferences.dto';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private userSerializer: UserSerializer,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getSelf(@CurrentUser('userId') userId: number) {
    const user = await this.userService.findOneById(userId);
    return this.userSerializer.serializeAuth(user);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/set-json')
  async setJsonSettings(
    @CurrentUser('userId') userId: number,
    @Body() body: JsonSettingsDto,
  ) {
    const user = await this.userService.setJsonSettings(userId, body);
    return this.userSerializer.serializeAuth(user);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/preferences')
  async updateUserPreferences(
    @CurrentUser('userId') userId: number,
    @Body() { action, preference }: UpdateUserPreferencesDto,
  ) {
    const user = await this.userService.updateUserPreferences(
      userId,
      preference,
      action,
    );

    return this.userSerializer.serializeAuth(user);
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.findOneById(+id);
    return this.userSerializer.serializePublic(user);
  }
}
