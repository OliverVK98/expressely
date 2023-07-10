import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user/user';
import { SignupUserDto } from '../../entities/user/dtos/signupUser.dto';

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

  findOneByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }
}
