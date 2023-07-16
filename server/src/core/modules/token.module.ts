import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '../entities/token.entity';
import { TokenService } from '../services/token.service';
import { TokenController } from '../controllers/token.controller';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token, User])],
  controllers: [TokenController],
  providers: [TokenService, UserService],
})
export class TokenModule {}
