import {
  Controller,
  Get,
  Param,
  Inject,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestUser } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { LoggedInGuard } from 'src/modules/auth';
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
import {
  FindByIdEndUserDto,
  IEndUserService,
  IEndUserServiceString,
} from 'src/modules/users/enduser';

@Controller('profile')
@ApiTags('Profile')
@UseGuards(LoggedInGuard)
export class ProfileController {
  constructor(
    @Inject(IFriendServiceString)
    private readonly friendService: IFriendService,
    @Inject(IEndUserServiceString)
    private readonly endUserService: IEndUserService,
    @Inject(IPostServiceString)
    private readonly postService: IPostService,
    @Inject(ILikeServiceString)
    private readonly likeService: ILikeService,
    @Inject(ICommentServiceString)
    private readonly commentService: ICommentService,
  ) {}

  @Get(':endUserId')
  public async getUserProfile(
    @Req() req: RequestUser,
    @Param() param: FindByIdEndUserDto,
    @Query() query: QueryLimitSkip,
  ) {
    const endUser = await this.endUserService.findById(param.endUserId);

    const isFriend = await this.friendService.isFriends(
      req.user._id,
      param.endUserId,
    );

    const posts = await this.postService.getUserPostsFromProfile<{
      hasLiked: boolean;
      numOfLikes: number;
    }>({
      endUserId: param.endUserId,
      queryLimitSkip: query,
    });

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      // TODO: REALLY SLOW / WILL OPTIMIZE THIS LATER!
      const like = await this.likeService.findLike(req.user._id, post._id);
      const numOfLikes = await this.likeService.getNumberOfLikes(post._id);

      post.hasLiked = like ? true : false;
      post.numOfLikes = numOfLikes;
    }

    return { endUser, isFriend, posts };
  }
}
