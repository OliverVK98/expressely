import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private repo: Repository<Notification>,
  ) {}

  create(user: Notification) {
    const newUser = this.repo.create(user);

    return this.repo.save(newUser);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
}
