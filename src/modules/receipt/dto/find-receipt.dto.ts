import { Transform } from 'class-transformer';
import { ReceiptId } from 'src/common/types/utilTypes';
import { checkMongodbIdInTransformToThrowError } from 'src/common/utils';

export class FindReceiptDto {
  @Transform(checkMongodbIdInTransformToThrowError)
  receiptId: ReceiptId;
}
