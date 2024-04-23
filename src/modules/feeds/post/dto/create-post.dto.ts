import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class CreatePostDto {
  @ApiProperty({
    title: "post's title",
    required: true,
    example: 'Today I have a lovely day!',
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    title: "post's body",
    required: true,
    example: 'I love coding, and I will always code :) please stay tuned',
  })
  @IsString()
  @MinLength(1)
  body: string;

  @ApiProperty({
    title: 'Group Id',
    required: false,
    example: '1234',
  })
  @Transform(({ value }) => checkToConvertToMongoIdOrThrowError(value))
  @IsString()
  @IsOptional()
  groupId?: string;
}
