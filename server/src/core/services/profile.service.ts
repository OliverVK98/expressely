import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../entities/profile.entity';
import { CreateProfileDto } from '../dtos/profile/createProfile.dto';
import { User } from '../entities/user.entity';
import { UpdateProfileDto } from '../dtos/profile/updateProfile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private repo: Repository<Profile>,
  ) {}

  async createProfile(profileDto: CreateProfileDto, user: User) {
    const profileExists = await this.repo
      .createQueryBuilder('profile')
      .where('profile.userId = :userId', { userId: user.id })
      .leftJoinAndSelect('profile.user', 'user')
      .getOne();

    if (profileExists) {
      throw new BadRequestException('Profile for that user already exists');
    }

    return this.repo.create(profileDto);
  }

  async saveProfile(profile: Profile, user: User) {
    profile.user = user;
    return this.repo.save(profile);
  }

  getUserProfile(userId: number) {
    return this.repo
      .createQueryBuilder('profile')
      .where('profile.userId = :userId', { userId })
      .getOne();
  }

  getAuthUserProfile(userId: number) {
    return this.repo
      .createQueryBuilder('profile')
      .where('profile.userId = :userId', { userId })
      .leftJoinAndSelect('profile.user', 'user')
      .getOne();
  }

  async updateUserProfile(userId: number, updateArgs: UpdateProfileDto) {
    const profile = await this.repo
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('profile.userId = :userId', { userId })
      .getOne();

    return this.repo.save({ ...profile, ...updateArgs });
  }
}
