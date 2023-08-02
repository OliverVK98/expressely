import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { AccessTokenGuard } from '../guards';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { NotificationSerializer } from '../serializers/notification/notification.serializer';
import { SetViewedNotificationDto } from '../dtos/notification/setViewedNotification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private notificationSerializer: NotificationSerializer,
  ) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  async getUserNotifications(@CurrentUser('userId') userId: number) {
    const notifications = await this.notificationService.getUserNotifications(
      userId,
    );

    return this.notificationSerializer.serializeMany(notifications);
  }

  @Patch()
  @UseGuards(AccessTokenGuard)
  async setViewedToTrue(@Body() { id }: SetViewedNotificationDto) {
    return this.notificationService.setViewedToTrue(id);
  }
}
