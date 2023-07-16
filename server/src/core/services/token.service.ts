import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupUserDto } from '../dtos/user/signupUser.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { SigninUserDto } from '../dtos/user/signinUser.dto';
import { defaultFeatures, defaultJsonSettings } from './const/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../entities/token.entity';
import * as jwt from 'jsonwebtoken';
import { User } from '../entities/user.entity';
import { UserTokenDto, userTokenDtoMapper } from '../dtos/user/userToken.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private repo: Repository<Token>,
    private userService: UserService,
  ) {}

  generateTokens(payload: UserTokenDto) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: '30d',
      },
    );

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

  async signup(userData: SignupUserDto) {
    const user = await this.userService.findOneByEmail(userData.email);

    if (user) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPass: string = await bcrypt.hash(userData.password, 10);

    const newUser = await this.userService.create({
      ...userData,
      jsonSettings: userData.jsonSettings ?? defaultJsonSettings,
      features: userData.features ?? defaultFeatures,
      password: hashedPass,
    });

    const { refreshToken, accessToken } = this.generateTokens(
      userTokenDtoMapper(newUser),
    );
    await this.saveRefreshToken(newUser, refreshToken);

    return { ...newUser, refreshToken, accessToken };
  }

  async signin(userData: SigninUserDto) {
    const user = await this.userService.findOneByEmail(userData.email);

    if (!user) {
      throw new BadRequestException('Incorrect email or password');
    }

    const passwordEqual = await bcrypt.compare(
      userData.password,
      user.password,
    );

    if (!passwordEqual) {
      throw new BadRequestException('Incorrect email or password');
    }

    const { refreshToken, accessToken } = this.generateTokens(
      userTokenDtoMapper(user),
    );

    await this.saveRefreshToken(user, refreshToken);

    return { ...user, refreshToken, accessToken };
  }
}
