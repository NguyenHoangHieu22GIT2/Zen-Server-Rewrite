import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { GroupId } from 'src/common/types/utilTypes';
import { checkMongodbIdInTransformToThrowError } from 'src/common/utils';

export class CreateGroupMemberRequestDto {
  @Transform(checkMongodbIdInTransformToThrowError)
  @ApiProperty({
    title: 'groupId',
    name: 'groupId',
    type: String,
  })
  groupId: GroupId;
}
