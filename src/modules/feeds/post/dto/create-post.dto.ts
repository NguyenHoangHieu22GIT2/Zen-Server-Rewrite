import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { Post } from '../entities/post.entity';

export class CreatePostDto implements Partial<Post> {
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
}
