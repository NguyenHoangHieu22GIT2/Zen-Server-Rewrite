import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';
import { PostId } from 'src/common/types/utilTypes';

export class GetCommentsDto {
  @ApiProperty({
    title: 'Limit for queries',
    required: true,
    example: 1,
    default: 1,
  })
  @IsNumber()
  @Min(1)
  @Transform((opts) => {
    return Number(opts.value);
  })
  limit: number;

  @ApiProperty({
    title: 'skip for queries',
    required: true,
    example: 0,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @Transform((opts) => {
    return Number(opts.value);
  })
  skip: 0;

  @ApiProperty({
    title: 'post Id',
    type: String,
    required: true,
    example: '6624493e85f7bdaedf3ca88f',
  })
  @Transform((data) => {
    console.log('THE DATA IS:', data);
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
