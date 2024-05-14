import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ConversationId } from 'src/common/types/utilTypes';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class FindConversationDto {
  @ApiProperty({
    title: 'conversation Id',
    name: 'conversationId',
    required: true,
  })
  @Transform((opts) =>
    checkToConvertToMongoIdOrThrowError({ id: opts.value, returnError: true }),
  )
  conversationId: ConversationId;
}
