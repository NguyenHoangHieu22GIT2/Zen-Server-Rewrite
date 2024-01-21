import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { PostId } from 'src/common/types/utilTypes/Brand';
import { checkToConvertToMongoIdOrThrowError  } from 'src/common/utils/convertToMongodbId';

export class FindPostDto {
  @ApiProperty()
  @Transform((data) => {
    const id = checkToConvertToMongoIdOrThrowError <PostId>({ id: data.value, returnError: true });
    return id;
  })
  postId: PostId;
}
