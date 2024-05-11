import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { CommentId, PostId } from 'src/common/types/utilTypes/Brand';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class CreateCommentDto {
  @ApiProperty({
    type: String,
    required: true,
    name: 'content',
  })
  content: string;

  @ApiProperty({
    type: String,
    required: true,
    name: 'postId',
  })
  @Transform((opts) => {
    const postId = checkToConvertToMongoIdOrThrowError<PostId>({
      id: opts.value,
      returnError: true,
    });
    return postId;
  })
  // @IsString()
  postId: PostId;

  @ApiProperty({
    type: String,
    required: false,
    name: 'parentCommentId',
  })
  @IsOptional()
  @Transform((opts) => {
    const commentId = checkToConvertToMongoIdOrThrowError<CommentId>({
      id: opts.value,
      returnError: false,
    });
    return commentId;
  })
  parentCommentId?: CommentId;
}
