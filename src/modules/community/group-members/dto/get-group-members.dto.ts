import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { GroupId } from 'src/common/types/utilTypes';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';
import { QueryLimitSkip } from 'src/cores/global-dtos';

export class GetGroupMembers extends QueryLimitSkip {
  @IsString()
  @Transform((opts) =>
    checkToConvertToMongoIdOrThrowError({ id: opts.value, returnError: true }),
  )
  groupId: GroupId;
}
