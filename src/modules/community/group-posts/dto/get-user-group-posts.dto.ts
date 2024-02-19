import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { GroupId } from 'src/common/types/utilTypes/Brand';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';

export class GetUserGroupPostsDto extends QueryLimitSkip {
  @ApiProperty({
    title: 'Group Id',
    required: true,
  })
  @Transform((data) => {
    const id = checkToConvertToMongoIdOrThrowError<GroupId>({
      id: data.value,
      returnError: true,
    });
    return id;
  })
  groupId: GroupId;
}
