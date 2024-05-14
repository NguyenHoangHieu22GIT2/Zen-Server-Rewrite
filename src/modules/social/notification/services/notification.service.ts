import { Inject, Injectable } from '@nestjs/common';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { NotificationRepository } from '../repository/notification.repository';
import { Types } from 'mongoose';
import { NotificationType } from '../entities';
import { QueryLimitSkip } from 'src/cores/global-dtos';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(BaseRepositoryName)
    private readonly notificationRepository: NotificationRepository,
  ) {}

  public async createNotification(
    subjectId: Types.ObjectId,
    verb: NotificationType,
    directObjectId: Types.ObjectId,
    indirectObjectId: Types.ObjectId,
    prepObjectId: Types.ObjectId,
    referenceLink: string,
  ) {
    return this.notificationRepository.create({
      subjectId,
      verb,
      directObjectId,
      indirectObjectId,
      prepObjectId,
      referenceLink,
    });
  }
}
