import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts-for-client')
@Controller('posts')
export class PostsController {
  // constructor(@Inject(PostServi)){}
}
