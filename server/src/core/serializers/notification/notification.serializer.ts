import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Notification } from '../../entities/notification.entity';
import { NotificationDto } from '../../dtos/notification/notification.dto';

@Injectable()
export class NotificationSerializer {
  serialize(notification: Notification) {
    return plainToClass(NotificationDto, notification, {
      excludeExtraneousValues: true,
    });
  }

  serializeMany(notifications: Notification[]) {
    return notifications.map((notification) => this.serialize(notification));
  }
}
