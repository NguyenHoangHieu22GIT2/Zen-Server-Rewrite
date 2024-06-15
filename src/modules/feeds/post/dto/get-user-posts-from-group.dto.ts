import { Transform } from 'class-transformer';
import { GroupId } from 'src/common/types/utilTypes';
import { checkMongodbIdInTransformToThrowError } from 'src/common/utils';
import { QueryLimitSkip } from 'src/cores/global-dtos';

export class getUserPostsFromGroupDto extends QueryLimitSkip {
  @Transform(checkMongodbIdInTransformToThrowError)
  groupId: GroupId;
}
