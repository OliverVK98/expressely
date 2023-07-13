import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private repo: Repository<Profile>,
  ) {}

  create(profile: Profile) {
    const newProfile = this.repo.create(profile);

    return this.repo.save(newProfile);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
}
