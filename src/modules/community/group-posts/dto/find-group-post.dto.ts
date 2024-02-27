import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { GroupPostId } from 'src/common/types/utilTypes/Brand';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils/';

export class FindGroupPostDto {
  @ApiProperty({
    title: 'post Id',
    required: true,
  })
  @Transform((data) => {
    const id = checkToConvertToMongoIdOrThrowError<GroupPostId>({
      id: data.value,
      returnError: true,
    });
    return id;
  })
  groupPostId: GroupPostId;
}
