import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { checkMongodbIdInTransformToThrowError } from 'src/common/utils';

export class ActionForRequestDto {
  @ApiProperty({
    title: 'groupId',
    name: 'groupId',
    type: String,
  })
  @Transform(checkMongodbIdInTransformToThrowError)
  groupId: GroupId;

  @Transform(checkMongodbIdInTransformToThrowError)
  @ApiProperty({
    title: 'endUserId',
    name: 'endUserId',
    type: String,
  })
  endUserId: EndUserId;
}
