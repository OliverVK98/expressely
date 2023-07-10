import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from '../../services/profile/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/id')
  async getUser(@Param('id') id: string) {
    const profile = await this.profileService.findOne(+id);
    return profile;
  }
}
