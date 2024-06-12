import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { PostId } from 'src/common/types/utilTypes/Brand';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils/';

export class FindPostDto {
  @ApiProperty({
    title: 'post Id',
    type: String,
    required: true,
    example: '6624493e85f7bdaedf3ca88f',
  })
  @Transform((data) => {
    const id = checkToConvertToMongoIdOrThrowError<PostId>({
      id: data.value,
      returnError: true,
    });
    return id;
  })
  // HOLY FUCK, the order of the decorators doesn't matter anymore,wtf?
  // How does it make sense? I don't know, but it seems like Transform will
  // always run before IsString, hence the error
  // @IsString()
  postId: PostId;
}
