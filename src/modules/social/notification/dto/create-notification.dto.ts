import { Types } from 'mongoose';
import { NotificationType } from '../entities';
import { Transform } from 'class-transformer';
import { checkMongodbIdInTransformToThrowError } from 'src/common/utils';
import { IsString } from 'class-validator';

export class CreateNotificationDto {
  // We can use token from user to get the ID
  // @Transform(checkMongodbIdInTransformToThrowError)
  subjectId: Types.ObjectId;

  @IsString()
  verb: NotificationType;

  @Transform(checkMongodbIdInTransformToThrowError)
  directObjectId: Types.ObjectId;

  @Transform(checkMongodbIdInTransformToThrowError)
  indirectObjectId: Types.ObjectId;

  @Transform(checkMongodbIdInTransformToThrowError)
  prepObjectId: Types.ObjectId;

  @IsString()
  referenceLink: string;
}
