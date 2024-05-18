import { Types } from 'mongoose';
import { NotificationType } from '../entities';
import { Transform } from 'class-transformer';
import { checkMongodbIdInTransformToThrowError } from 'src/common/utils';
import { IsEnum, IsString } from 'class-validator';

const notificationTypes: NotificationType[] = [
  'like',
  'comment',
  'mention',
  'friend_request',
];

export class NounDto {
  @Transform(checkMongodbIdInTransformToThrowError)
  _id: Types.ObjectId;

  @IsString()
  name: string;

  @IsEnum(notificationTypes)
  type: NotificationType;

  @IsString()
  image: string;
}
