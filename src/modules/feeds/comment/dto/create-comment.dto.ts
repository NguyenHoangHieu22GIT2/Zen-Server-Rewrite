import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { CommentId, PostId } from 'src/common/types/utilTypes/Brand';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class CreateCommentDto {
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
  @Transform((opts) => {
    const postId = checkToConvertToMongoIdOrThrowError<PostId>({
      id: opts.value,
      returnError: true,
    });
    return postId;
  })
  // I DON"T KNOW WHY IT DOESN"T WORK, PLEASE HELP ME!!!
  // HELP HELP HELP, NO WORKAROUND!!!
  // @IsString()
  postId: PostId;

  @ApiProperty({
    type: String,
    required: false,
    name: 'Comment Id',
  })
  @IsString()
  @IsOptional()
  @Transform((opts) => {
    const commentId = checkToConvertToMongoIdOrThrowError<CommentId>({
      id: opts.value,
      returnError: false,
    });
    return commentId;
  })
  parentCommentId: CommentId;
}
