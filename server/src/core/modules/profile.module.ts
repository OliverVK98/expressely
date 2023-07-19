import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../entities/profile.entity';
import { ProfileController } from '../controllers/profile.controller';
import { ProfileService } from '../services/profile.service';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { ProfileSerializer } from '../serializers/profile/profile.serializer';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])],
  controllers: [ProfileController],
  providers: [ProfileService, UserService, ProfileSerializer],
})
export class ProfileModule {}
