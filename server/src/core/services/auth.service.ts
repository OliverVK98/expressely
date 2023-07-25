import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { SignupUserDto } from '../dtos/user/signupUser.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { SigninUserDto } from '../dtos/user/signinUser.dto';
import { defaultFeatures, defaultJsonSettings } from './const/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../entities/token.entity';
import { User } from '../entities/user.entity';
import { UserTokenDto, userTokenDtoMapper } from '../dtos/user/userToken.dto';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from './profile.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token) private repo: Repository<Token>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashString(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async checkHashMatch(checkString: string, hash: string) {
    return await bcrypt.compare(checkString, hash);
  }

  async generateTokens(payload: UserTokenDto) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: 60 * 15,
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: 60 * 60 * 24 * 7,
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveRefreshToken(user: User, refreshToken: string) {
    const tokenData = await this.repo
      .createQueryBuilder('token')
      .andWhere('token.userId = :userId', { userId: user.id })
      .getOne();

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await this.repo.save(tokenData);
    }

    const newToken = await this.repo.create({ refreshToken });
    newToken.user = user;
    return await this.repo.save(newToken);
  }

  async signUp(userData: SignupUserDto, profileService: ProfileService) {
    const {
      jsonSettings,
      password,
      age,
      features,
      avatar,
      city,
      firstname,
      lastname,
      country,
      username,
      currency,
      roles,
      email,
    } = userData;

    const user = await this.userService.createUser({
      email,
      password: await this.hashString(password),
      username,
      avatar,
      roles,
      jsonSettings: jsonSettings ?? defaultJsonSettings,
      features: features ?? defaultFeatures,
    });

    const profile = await profileService.createProfile(
      {
        age,
        avatar,
        city,
        firstname,
        lastname,
        country,
        username,
        currency,
      },
      user,
    );

    await this.userService.saveUser(user, profile);
    await profileService.saveProfile(profile, user);

    const { refreshToken, accessToken } = await this.generateTokens(
      userTokenDtoMapper(user),
    );
    await this.saveRefreshToken(user, refreshToken);

    return { user, refreshToken, accessToken };
  }

  async signIn(userData: SigninUserDto) {
    const user = await this.userService.findOneByEmail(userData.email);

    if (!user) {
      throw new BadRequestException('Incorrect email or password');
    }

    const passwordEqual = await this.checkHashMatch(
      userData.password,
      user.password,
    );

    if (!passwordEqual) {
      throw new BadRequestException('Incorrect email or password');
    }

    const { refreshToken, accessToken } = await this.generateTokens(
      userTokenDtoMapper(user),
    );

    await this.saveRefreshToken(user, refreshToken);

    return { user, refreshToken, accessToken };
  }

  async signOut(userId: number) {
    return await this.repo
      .createQueryBuilder()
      .delete()
      .where('user.id = :userId', { userId })
      .execute();
  }

  async refreshTokens(userId: number, oldRefreshToken: string) {
    if (!oldRefreshToken) throw new ForbiddenException(`Access denied`);
    const user = await this.userService.findOneByIdWithToken(userId);
    if (!user || user.token.refreshToken !== oldRefreshToken)
      throw new ForbiddenException(`Access denied`);
    const { refreshToken } = await this.generateTokens(
      userTokenDtoMapper(user),
    );
    await this.saveRefreshToken(user, refreshToken);
    return refreshToken;
  }
}
