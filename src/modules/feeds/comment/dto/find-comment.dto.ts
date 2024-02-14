import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { CommentId } from 'src/common/types/utilTypes/Brand';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class FindCommentDto {
  @ApiProperty({
    title: 'Comment Id',
    required: true,
  })
  @IsString()
  @Transform((data) => {
    const id = checkToConvertToMongoIdOrThrowError({
      id: data.value,
      returnError: true,
    });
    return id;
  })
  commentId: CommentId;
}
