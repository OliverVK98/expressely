import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupUserDto } from '../../entities/user/dtos/signupUser.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { SigninUserDto } from '../../entities/user/dtos/signinUser.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(userData: SignupUserDto) {
    const user = await this.userService.findOneByEmail(userData.email);

    if (user) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPass: string = await bcrypt.hash(userData.password, 10);

    return await this.userService.create({
      ...userData,
      password: hashedPass,
    });
  }

  async signin(userData: SigninUserDto) {
    const user = await this.userService.findOneByEmail(userData.email);

    if (user) {
      throw new BadRequestException('Incorrect email or password');
    }

    const passwordMatch = await bcrypt.compare(
      userData.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new BadRequestException('Incorrect email or password');
    }

    return user;
  }
}
