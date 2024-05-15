import { Transform } from 'class-transformer';
import { EndUserId, MessageId } from 'src/common/types/utilTypes';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class DeleteMessageDto {
  @Transform((opts) =>
    checkToConvertToMongoIdOrThrowError({ id: opts.value, returnError: true }),
  )
  messageId: MessageId;

  @Transform((opts) =>
    checkToConvertToMongoIdOrThrowError({ id: opts.value, returnError: true }),
  )
  endUserId: EndUserId;
}
