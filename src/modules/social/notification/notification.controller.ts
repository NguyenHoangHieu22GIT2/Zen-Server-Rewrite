import { Controller, Inject } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { INotificationServiceString } from './services/notification.interface.service';

@Controller('notification')
export class NotificationController {
  constructor(
    @Inject(INotificationServiceString)
    private readonly notificationService: NotificationService,
  ) {}
}
