import { Transform } from 'class-transformer';
import { GroupId } from 'src/common/types/utilTypes';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class FindGroupDto {
  @Transform(({ value }) =>
    checkToConvertToMongoIdOrThrowError({ id: value, returnError: true }),
  )
  groupId: GroupId;
}
