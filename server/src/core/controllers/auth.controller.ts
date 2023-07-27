import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { SignupUserDto } from '../dtos/user/signupUser.dto';
import { SessionData } from 'express-session';
import { AuthService } from '../services/auth.service';
import { SigninUserDto } from '../dtos/user/signinUser.dto';
import { Serialize } from '../interceptors/serialize';
import { AuthDto } from '../dtos/auth/auth.dto';
import { Response } from 'express';
import { AccessTokenGuard, RefreshTokenGuard } from '../guards';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { setRefreshTokenCookie } from '../../config/jwt';
import { ProfileService } from '../services/profile.service';

@Controller('auth')
@Serialize(AuthDto)
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private profileService: ProfileService,
  ) {}

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() body: SignupUserDto,
    @Session() session: SessionData,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user, refreshToken } = await this.authService.signUp(
      body,
      this.profileService,
    );
    setRefreshTokenCookie(res, refreshToken);
    return { ...user, accessToken };
  }

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() body: SigninUserDto,
    @Session() session: SessionData,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, refreshToken, accessToken } = await this.authService.signIn(
      body,
    );
    setRefreshTokenCookie(res, refreshToken);
    return { ...user, accessToken };
  }

  @UseGuards(AccessTokenGuard)
  @Get('/sign-out')
  @HttpCode(HttpStatus.OK)
  async signOut(
    @Session() session: SessionData,
    @CurrentUser('userId') userId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.signOut(userId);
    res.clearCookie('refreshToken');
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @CurrentUser('userId') userId: number,
    @CurrentUser('refreshToken') oldRefreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, accessToken } = await this.authService.refreshTokens(
      userId,
      oldRefreshToken,
    );
    setRefreshTokenCookie(res, refreshToken);
    return { accessToken };
  }
}
