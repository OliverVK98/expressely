import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JsonSettingsDto, User } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/user/updateUser.dto';
import { CreateUserDto } from '../dtos/user/createUser.dto';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async createUser(user: CreateUserDto) {
    const userExist = await this.findOneByEmail(user.email);
    if (userExist) {
      throw new BadRequestException('Email already in use');
    }

    return this.repo.create(user);
  }

  saveUser(user: User, profile: Profile) {
    user.profile = profile;
    return this.repo.save(user);
  }

  findOneById(id: number) {
    return this.repo.findOneBy({ id });
  }

  async updateUser(id: number, updateFields: UpdateUserDto) {
    const user = await this.repo
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    return this.repo.save({ ...user, ...updateFields });
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
