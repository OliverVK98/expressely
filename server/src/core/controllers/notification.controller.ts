import { Controller, Get, Param } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get('/id')
  async getUser(@Param('id') id: string) {
    const notification = await this.notificationService.findOne(+id);
    return notification;
  }
}
