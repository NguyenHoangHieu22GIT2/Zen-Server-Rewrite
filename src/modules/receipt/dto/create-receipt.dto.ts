import { Transform } from 'class-transformer';
import { SubscriptionId } from 'src/common/types/utilTypes';
import { checkMongodbIdInTransformToThrowError } from 'src/common/utils';

export class CreateReceiptDto {
  @Transform(checkMongodbIdInTransformToThrowError)
  subscriptionId: SubscriptionId;
}
