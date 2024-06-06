import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestUser } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { LoggedInGuard } from 'src/modules/auth';
import { FindGroupDto } from 'src/modules/community/group-members';
import {
  ICommentService,
  ICommentServiceString,
} from 'src/modules/feeds/comment/services/comment.interface';
import { ILikeService, ILikeServiceString } from 'src/modules/feeds/like';
import {
  IPostService,
  IPostServiceString,
} from 'src/modules/feeds/post/services/post.interface';
import {
  IFriendService,
  IFriendServiceString,
} from 'src/modules/social/friend';

@ApiTags('posts-for-client')
@Controller('posts')
@UseGuards(LoggedInGuard)
export class PostsController {
  constructor(
    @Inject(IPostServiceString) private readonly postService: IPostService,
    @Inject(ICommentServiceString)
    private readonly commentService: ICommentService,
    @Inject(ILikeServiceString) private readonly likeService: ILikeService,
    @Inject(IFriendServiceString)
    private readonly friendService: IFriendService,
  ) {}

  @Get()
  public async getPosts(
    @Req() req: RequestUser,
    @Query() queryLimitSkip: QueryLimitSkip,
  ) {
    const posts = await this.postService.getRecommendedPosts<{
      hasLiked: boolean;
      numOfLikes: number;
    }>({
      endUserId: req.user._id,
      queryLimitSkip,
    });

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      // TODO: REALLY SLOW / WILL OPTIMIZE THIS LATER!
      const like = await this.likeService.findLike(req.user._id, post._id);
      const numOfLikes = await this.likeService.getNumberOfLikes(post._id);

      post.hasLiked = like ? true : false;
      post.numOfLikes = numOfLikes;
    }
    return posts;
  }

  @Get(':groupId')
  public async getGroupPosts(
    @Req() req: RequestUser,
    @Query() queryLimitSkip: QueryLimitSkip,
    @Param() param: FindGroupDto,
  ) {
    const posts = await this.postService.getGroupPosts<{
      hasLiked: boolean;
      numOfLikes: number;
    }>({
      groupId: param.groupId,
      queryLimitSkip,
    });

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      // TODO: REALLY SLOW / WILL OPTIMIZE THIS LATER!
      const like = await this.likeService.findLike(req.user._id, post._id);
      const numOfLikes = await this.likeService.getNumberOfLikes(post._id);

      post.hasLiked = like ? true : false;
      post.numOfLikes = numOfLikes;
    }

    return posts;
  }

  //TODO: IT"S HARDDDD
  @Get('friend-posts')
  public async getFriendPosts(
    @Req() req: RequestUser,
    @Query() queryLimitSkip: QueryLimitSkip,
  ) {
    const endUserFriends = await this.friendService.getFriendList(
      req.user._id,
      queryLimitSkip,
    );

    for (let i = 0; i < endUserFriends.length; i++) {
      const friend = endUserFriends[i];
    }
  }
}
