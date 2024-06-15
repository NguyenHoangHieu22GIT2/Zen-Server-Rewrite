import { EndUserId } from 'src/common/types/utilTypes';
import { FindGroupDto } from './find-group.dto';
import { Transform } from 'class-transformer';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class DeleteGroupMember extends FindGroupDto {
  @Transform((opts) =>
    checkToConvertToMongoIdOrThrowError({ id: opts.value, returnError: true }),
  )
  endUserId: EndUserId;
}
