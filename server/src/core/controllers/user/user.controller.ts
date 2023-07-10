import { Body, Controller, Get, Param, Post, Session } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { testUser } from '../../entities/test';
import { SignupUserDto } from '../../entities/user/dtos/signupUser.dto';
import { SessionData } from 'express-session';
import { AuthService } from '../../services/auth/auth.service';
import { SigninUserDto } from '../../entities/user/dtos/signinUser.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/id')
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

  @Get('create')
  async create() {
    return await this.userService.create(testUser);
  }
}
