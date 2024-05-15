import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { FriendRequestId } from 'src/common/types/utilTypes';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class FindFriendRequestDto {
  @ApiProperty({
    title: 'friendRequestId',
    required: true,
    type: String,
  })
  @Transform((opts) =>
    checkToConvertToMongoIdOrThrowError({ id: opts.value, returnError: true }),
  )
  friendRequestId: FriendRequestId;
}
