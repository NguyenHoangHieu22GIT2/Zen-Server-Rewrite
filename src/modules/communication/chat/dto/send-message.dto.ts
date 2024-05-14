import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { ConversationId } from 'src/common/types/utilTypes';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class SendMessageDto {
  @IsString()
  content: string;

  @Transform((opts) =>
    checkToConvertToMongoIdOrThrowError({ id: opts.value, returnError: true }),
  )
  endUserId: string;

  @Transform((opts) =>
    checkToConvertToMongoIdOrThrowError({ id: opts.value, returnError: true }),
  )
  conversationId: ConversationId;
}
