import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { SignupUserDto } from '../dtos/user/signupUser.dto';
import { SessionData } from 'express-session';
import { AuthService } from '../services/auth.service';
import { SigninUserDto } from '../dtos/user/signinUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize';
import { UserDto } from '../dtos/user/user.dto';

@Controller('users')
@ApiTags('user')
@Serialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.findOneById(+id);
    return user;
  }

  @Post('auth/signup')
  async signup(@Body() body: SignupUserDto, @Session() session: SessionData) {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('auth/signin')
  async signin(@Body() body: SigninUserDto, @Session() session: SessionData) {
    const user = await this.authService.signin(body);
    session.userId = user.id;
    return user;
  }

  @Get('auth/signout')
  @UseGuards(AuthGuard)
  async signout(@Session() session: SessionData) {
    session.userId = undefined;
  }
}
