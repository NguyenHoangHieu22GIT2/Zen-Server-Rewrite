import { InjectModel } from '@nestjs/mongoose';
import { Notification } from '../entities';
import { Model } from 'mongoose';
import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';

export class NotificationRepository extends GenericRepositoryMongodb<Notification> {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
  ) {
    super(notificationModel);
  }
}
