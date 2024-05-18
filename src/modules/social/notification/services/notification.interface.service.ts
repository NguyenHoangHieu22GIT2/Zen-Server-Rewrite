import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { CreateNotificationDto } from '../dto';
import { Notification } from '../entities';
import { EndUserId, NotificationId } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';

export const INotificationServiceString = 'INotificationService ';

export interface INotificationService<T = Notification> {
  createNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<DocumentMongodbType<T>>;

  getNotifications(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<DocumentMongodbType<T>[]>;

  deleteNotification(
    endUserId: EndUserId,
    notificationId: NotificationId,
  ): Promise<DocumentMongodbType<T>>;

  getNotification(
    endUserId: EndUserId,
    notificationId: NotificationId,
  ): Promise<DocumentMongodbType<T>>;
}
