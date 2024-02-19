import { Controller, Get, Req, UseGuards, Query } from '@nestjs/common';
import { RequestUser } from 'src/common/types/utilTypes/';
import { LoggedInGuard } from 'src/modules/auth/passport/';
import { ApiTags } from '@nestjs/swagger';

import { GetPostsSwaggerAPIDecorators } from 'src/documents/swagger-api/posts/get-posts';
import { GroupPostsServiceUnstable } from './services/';
import { GetUserGroupPostsDto } from './dto/';

@ApiTags('Post')
@Controller('posts')
@UseGuards(LoggedInGuard)
export class GroupPostsController {
  constructor(
    private readonly postUnstableService: GroupPostsServiceUnstable,
  ) {}

  @Get('/user')
  @GetPostsSwaggerAPIDecorators()
  async getUserPosts(
    @Req() req: RequestUser,
    @Query() getUserGroupPostsDto: GetUserGroupPostsDto,
  ) {
    const posts = await this.postUnstableService.getUserGroupPosts({
      endUserId: req.user._id,
      getUserGroupPostsDto,
    });

    // await this.postRedisStableService.savePosts(posts);
    return posts;
  }
}
