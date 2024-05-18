import { Notification, NotificationType, noun } from '../entities';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { NounDto } from './noun.dto';

export class CreateNotificationDto implements Partial<Notification> {
  // We can use token from user to get the ID
  // @Transform(checkMongodbIdInTransformToThrowError)
  @ValidateNested({ each: true })
  @Type(() => NounDto)
  subject: noun;

  @IsString()
  verb: NotificationType;

  @ValidateNested({ each: true })
  @Type(() => NounDto)
  directObject: noun;

  @ValidateNested({ each: true })
  @Type(() => NounDto)
  indirectObject: noun;

  @ValidateNested({ each: true })
  @Type(() => NounDto)
  prepObject: noun;

  @IsString()
  referenceLink: string;
}
