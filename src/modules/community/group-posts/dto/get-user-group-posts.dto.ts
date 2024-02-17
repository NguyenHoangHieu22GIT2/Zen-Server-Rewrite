import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { EndUserId, GroupId } from 'src/common/types/utilTypes/Brand';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';

export class GetUserGroupPostsDto extends QueryLimitSkip {
  @ApiProperty({
    title: 'end user Id',
    required: true,
  })
  @IsString()
  @Transform(({ value }) => {
    return checkToConvertToMongoIdOrThrowError({
      id: value,
      returnError: true,
    });
  })
  endUserId: EndUserId;
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
