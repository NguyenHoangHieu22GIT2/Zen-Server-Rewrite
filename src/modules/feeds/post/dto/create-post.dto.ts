import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';
import { GroupId } from 'src/common/types/utilTypes';

export class CreatePostDto {
  @ApiProperty({
    title: "post's title",
    required: true,
    example: 'Today I have a lovely day!',
  })
  @MinLength(1)
  @IsString()
  title: string;

  @ApiProperty({
    title: "post's body",
    required: true,
    example: 'I love coding, and I will always code :) please stay tuned',
  })
  @MinLength(1)
  @IsString()
  body: string;

  @ApiProperty({
    title: 'Group Id',
    type: String,
    required: false,
    example: '1234',
  })
  @Transform(({ value }) =>
    checkToConvertToMongoIdOrThrowError<GroupId>({
      id: value,
      returnError: false,
    }),
  )
  @IsOptional()
  groupId?: GroupId;
}
