import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { Transform } from 'class-transformer';
import { checkMongodbIdInTransformToThrowError } from 'src/common/utils';

export class DeleteGroupMember {
  @Transform(checkMongodbIdInTransformToThrowError)
  endUserId: EndUserId;

  @Transform(checkMongodbIdInTransformToThrowError)
  groupId: GroupId;
}
