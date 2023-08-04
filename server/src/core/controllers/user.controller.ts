import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JsonSettingsDto } from '../entities/user.entity';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { AccessTokenGuard } from '../guards';
import { UserSerializer } from '../serializers/user/user.serializer';
import { ArticleService } from '../services/article.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private userSerializer: UserSerializer,
    private articleService: ArticleService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getSelf(@CurrentUser('userId') userId: number) {
    const user = await this.userService.findOneById(userId);
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

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.findOneById(+id);
    return this.userSerializer.serializePublic(user);
  }
}
