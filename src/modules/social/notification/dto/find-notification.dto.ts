import { Transform } from 'class-transformer';
import { NotificationId } from 'src/common/types/utilTypes';
import { checkMongodbIdInTransformToThrowError } from 'src/common/utils';

export class FindNotificationDto {
  @Transform(checkMongodbIdInTransformToThrowError)
  notificationId: NotificationId;
}
