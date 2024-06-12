import { Inject, Injectable } from '@nestjs/common';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { NotificationRepository } from '../repository/notification.repository';
import { Notification } from '../entities';
import { INotificationService } from './notification.interface.service';
import { CreateNotificationDto } from '../dto';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { EndUserId, NotificationId } from 'src/common/types/utilTypes';
import { noObj } from 'src/common/utils';
import { QueryLimitSkip } from 'src/cores/global-dtos';

@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    @Inject(BaseRepositoryName)
    private readonly notificationRepository: NotificationRepository,
  ) {}

  public async createNotification(
    createNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationRepository.create(createNotificationDto);
  }

  public async getNotification(
    endUserId: EndUserId,
    notificationId: NotificationId,
  ): Promise<DocumentMongodbType<Notification>> {
    const notification = await this.notificationRepository.findOne({
      'indirectObject._id': endUserId,
      _id: notificationId,
    });
    return notification;
  }

  public async getNotifications(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<DocumentMongodbType<Notification>[]> {
    const notifications = await this.notificationRepository.find(
      { 'indirectObject._id': endUserId },
      noObj,
      { limit: queryLimitSkip.limit, skip: queryLimitSkip.skip },
    );
    return notifications;
  }

  public async deleteNotification(
    endUserId: EndUserId,
    notificationId: NotificationId,
  ): Promise<DocumentMongodbType<Notification>> {
    const notification = await this.notificationRepository.delete({
      'indirectObject._id': endUserId,
      _id: notificationId,
    });
    return notification;
  }
}
