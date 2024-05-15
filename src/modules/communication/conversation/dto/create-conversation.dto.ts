import { Transform } from 'class-transformer';
import { EndUserId } from 'src/common/types/utilTypes';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';
import { isArray } from 'src/common/utils/';

export class CreateConversationDto {
  @Transform((opts) => {
    const array = opts.value;
    if (isArray<string>(array)) {
      array.map((endUserId) =>
        checkToConvertToMongoIdOrThrowError({
          id: endUserId,
          returnError: true,
        }),
      );
    }
    return array;
  })
  userIds: EndUserId[];
}
