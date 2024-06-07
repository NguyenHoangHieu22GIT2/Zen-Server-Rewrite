import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { EndUserId } from 'src/common/types/utilTypes';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';
import { FindGroupDto } from './find-group.dto';

export class FindGroupMemberDto extends FindGroupDto {
  @Transform(({ value }) =>
    checkToConvertToMongoIdOrThrowError<EndUserId>({
      id: value,
      returnError: true,
    }),
  )
  endUserId: EndUserId;
}
