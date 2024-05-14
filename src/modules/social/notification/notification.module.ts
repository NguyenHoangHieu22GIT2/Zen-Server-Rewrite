import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Notification,
  NotificationSchema,
} from './entities/notification.entity';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { NotificationRepository } from './repository/notification.repository';
import { INotificationServiceString } from './services/notification.interface.service';
import { NotificationService } from './services/notification.service';

@Module({
  controllers: [NotificationController],
  providers: [
    {
      provide: INotificationServiceString,
      useClass: NotificationService,
    },
    {
      provide: BaseRepositoryName,
      useClass: NotificationRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
})
export class NotificationModule {}
