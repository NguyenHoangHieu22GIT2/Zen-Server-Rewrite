import { Transform } from 'class-transformer';
import { FriendRequestId } from 'src/common/types/utilTypes';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class FindFriendRequestDto {
  @Transform((opts) =>
    checkToConvertToMongoIdOrThrowError({ id: opts.value, returnError: true }),
  )
  endUserId: FriendRequestId;
}
