import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { CommentId, PostId } from 'src/common/types/utilTypes/Brand';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class ModifyCommentDto {
  @ApiProperty({
    type: String,
    required: true,
    name: 'Comment Id',
  })
  @IsString()
  @Transform((opts) => {
    const commentId = checkToConvertToMongoIdOrThrowError<CommentId>({
      id: opts.value,
      returnError: true,
    });
    return commentId;
  })
  commentId: CommentId;

  @ApiProperty({
    type: String,
    required: true,
    name: 'Content of the comment',
  })
  content: string;

  @ApiProperty({
    type: String,
    required: true,
    name: 'Post Id',
  })
  @IsString()
  @Transform((opts) => {
    const postId = checkToConvertToMongoIdOrThrowError<PostId>({
      id: opts.value,
      returnError: true,
    });
    return postId;
  })
  postId: PostId;
}
