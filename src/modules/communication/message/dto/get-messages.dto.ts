import { Transform } from 'class-transformer';
import { ConversationId } from 'src/common/types/utilTypes';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';
import { QueryLimitSkip } from 'src/cores/global-dtos';

export class GetMessagesDto extends QueryLimitSkip {
  @Transform((opts) =>
    checkToConvertToMongoIdOrThrowError({ id: opts.value, returnError: true }),
  )
  conversationId: ConversationId;
}
