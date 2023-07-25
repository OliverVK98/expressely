import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '../entities/token.entity';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from '../../config/jwt';
import { JwtModule } from '@nestjs/jwt';
import { Profile } from '../entities/profile.entity';
import { ProfileService } from '../services/profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token, User, Profile]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    ProfileService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
