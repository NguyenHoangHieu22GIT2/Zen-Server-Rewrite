import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { PostId } from 'src/common/types/utilTypes/Brand';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils/';

export class FindPostDto {
  @ApiProperty({
    title: 'post Id',
    required: true,
  })
  @Transform((data) => {
    const id = checkToConvertToMongoIdOrThrowError<PostId>({
      id: data.value,
      returnError: true,
    });
    return id;
  })
  postId: PostId;
}
