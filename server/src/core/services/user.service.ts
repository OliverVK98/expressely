import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JsonSettingsDto, User } from '../entities/user.entity';
import { SignupUserDto } from '../dtos/user/signupUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(user: SignupUserDto) {
    const newUser = this.repo.create(user);

    return this.repo.save(newUser);
  }

  findOneById(id: number) {
    return this.repo.findOneBy({ id });
  }

  async findOneByIdWithToken(id: number) {
    return await this.repo
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.token', 'token')
      .getOne();
  }

  findOneByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async setJsonSettings(id: number, jsonSettings: JsonSettingsDto) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    user.jsonSettings = jsonSettings;

    return this.repo.save(user);
  }
}
