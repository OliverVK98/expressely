import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { AccessTokenGuard } from '../guards';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { UserService } from '../services/user.service';
import { UpdateProfileDto } from '../dtos/profile/updateProfile.dto';
import { ProfileSerializer } from '../serializers/profile/profile.serializer';
import { GetPublicProfileDto } from '../dtos/profile/getPublicProfile.dto';

@Controller('profiles')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private profileSerializer: ProfileSerializer,
  ) {}

  @Get('/:id')
  async getUserProfile(@Param() { id }: GetPublicProfileDto) {
    const profile = await this.profileService.getUserProfile(+id);
    return this.profileSerializer.serializePublic(profile);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  async getAuthUserProfile(@CurrentUser('userId') userId: number) {
    const profile = await this.profileService.getAuthUserProfile(userId);
    return this.profileSerializer.serializeAuth(profile);
  }

  @Put('/update')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async updateUserProfile(
    @CurrentUser('userId') userId: number,
    @Body() body: UpdateProfileDto,
  ) {
    await this.userService.updateUser(userId, body);
    const profile = await this.profileService.updateUserProfile(userId, body);
    return this.profileSerializer.serializeAuth(profile);
  }
}
