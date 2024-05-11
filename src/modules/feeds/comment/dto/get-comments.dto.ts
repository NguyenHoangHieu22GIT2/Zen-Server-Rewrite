import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';
import { Mixin } from 'ts-mixer';
import { FindPostDto } from '../../post/dto/find-post.dto';
import { CommentId, PostId } from 'src/common/types/utilTypes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';
export class GetCommentsDto extends Mixin(QueryLimitSkip, FindPostDto) {
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
  @Transform(
    (data) => {
      const id = checkToConvertToMongoIdOrThrowError<PostId>({
        id: data.value,
        returnError: true,
      });
      return id;
    },
    { toClassOnly: true },
  )
  postId: PostId;

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
