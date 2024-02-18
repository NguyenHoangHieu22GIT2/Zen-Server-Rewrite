import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Min } from 'class-validator';
import { GroupId } from 'src/common/types/utilTypes/Brand';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class CreateGroupPostDto {
  @ApiProperty({
    title: "post's title",
    required: true,
    example: 'Today I have a lovely day!',
  })
  @IsString()
  @Min(1)
  title: string;

  @ApiProperty({
    title: "post's body",
    required: true,
    example: 'I love coding, and I will always code :) please stay tuned',
  })
  @IsString()
  @Min(1)
  body: string;

  @ApiProperty({
    title: 'Group Id',
    required: true,
  })
  @IsString()
  @Transform(({ value }) => {
    const groupId = checkToConvertToMongoIdOrThrowError({
      id: value,
      returnError: true,
    });
    return groupId;
  })
  groupId: GroupId;
}
