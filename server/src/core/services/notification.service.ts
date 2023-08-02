import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../entities/notification.entity';
import { CreateNotificationDto } from '../dtos/notification/createNotification.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private repo: Repository<Notification>,
  ) {}

  create(data: CreateNotificationDto) {
    return this.repo.create(data);
  }

  save(notification: Notification) {
    return this.repo.save(notification);
  }

  async createNotification(data: CreateNotificationDto, user: User) {
    data.viewed = data.viewed ?? false;
    const notification = this.create(data);
    notification.user = user;
    return await this.save(notification);
  }

  async getUserNotifications(userId: number) {
    return await this.repo
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.user', 'user')
      .where('user.id = :userId AND notification.viewed = :viewed', {
        userId,
        viewed: false,
      })
      .getMany();
  }

  async setViewedToTrue(id: number) {
    const notification = await this.repo.findOne({
      where: {
        id,
      },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.viewed = true;

    return this.repo.save(notification);
  }
}
