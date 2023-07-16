import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { SignupUserDto } from '../dtos/user/signupUser.dto';
import { SessionData } from 'express-session';
import { TokenService } from '../services/token.service';
import { SigninUserDto } from '../dtos/user/signinUser.dto';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize';
import { AuthDto } from '../dtos/auth/auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
@Serialize(AuthDto)
export class TokenController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  @Post('/signup')
  async signup(
    @Body() body: SignupUserDto,
    @Session() session: SessionData,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = await this.tokenService.signup(body);
    res
      .cookie('refreshToken', user.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      })
      .send({ status: 'ok' });
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: SigninUserDto, @Session() session: SessionData) {
    const user = await this.tokenService.signin(body);
    session.userId = user.id;
    return user;
  }

  @Get('/signout')
  @UseGuards(AuthGuard)
  async signout(@Session() session: SessionData, @Req() req: Request) {
    const { refreshToken } = req.cookies;
    session.userId = undefined;
  }
}
