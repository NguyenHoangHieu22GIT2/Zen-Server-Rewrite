import { Transform } from 'class-transformer';
import { GroupMemberRequestId } from 'src/common/types/utilTypes';
import { checkMongodbIdInTransformToThrowError } from 'src/common/utils';

export class GetGroupMemberRequestDto {
  @Transform(checkMongodbIdInTransformToThrowError)
  groupMemberRequestDto: GroupMemberRequestId;
}
