import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min } from 'class-validator';
import { Post } from '../entities/post.entity';

export class CreatePostDto implements Partial<Post> {
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
}
