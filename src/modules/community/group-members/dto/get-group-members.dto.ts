import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { GroupId } from 'src/common/types/utilTypes';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class GetGroupMembersDto {
  @Transform((opts) =>
    checkToConvertToMongoIdOrThrowError({ id: opts.value, returnError: true }),
  )
  groupId: GroupId;
}
