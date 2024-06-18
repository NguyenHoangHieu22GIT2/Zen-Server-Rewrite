import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';
import { GroupId, PostId } from 'src/common/types/utilTypes';

export class ModifyPostDto {
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
  @IsOptional()
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
  @IsString()
  @IsOptional()
  groupId?: GroupId;

  // This is for testing with swagger, not used in normal codes
  @ApiProperty({
    title: 'existingImages',
    type: Array,
    required: true,
    example: [],
  })
  @IsOptional()
  existingImages?: string;

  @ApiProperty({
    title: 'images',
    type: Array,
    required: true,
    example: [],
  })
  @IsOptional()
  images: [];
}
