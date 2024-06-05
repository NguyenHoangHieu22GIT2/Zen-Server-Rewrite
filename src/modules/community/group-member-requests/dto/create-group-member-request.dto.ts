import { Transform } from 'class-transformer';
import { checkMongodbIdInTransformToThrowError } from 'src/common/utils';

export class CreateGroupMemberRequestDto {
  @Transform(checkMongodbIdInTransformToThrowError)
  groupId: string;
}
