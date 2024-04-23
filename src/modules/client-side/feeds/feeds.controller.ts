import { Controller, Get, Inject, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestUser } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { LoggedInGuard } from 'src/modules/auth';
import {
  ICommentUnstableService,
  ICommentUnstableServiceString,
} from 'src/modules/feeds/comment/services/unstable/comment.unstable.interface';
import {
  ILikeServiceUnstable,
  ILikeServiceUnstableString,
} from 'src/modules/feeds/like/services/unstable/like.unstable.interface';
import {
  IPostServiceUnstable,
  IPostServiceUnstableString,
} from 'src/modules/feeds/post/services/unstable/post.unstable.interface';

@ApiTags('Feeds')
@Controller('feeds')
@UseGuards(LoggedInGuard)
export class FeedsController {
  constructor(
    @Inject(IPostServiceUnstableString)
    private readonly postUnstableService: IPostServiceUnstable,
    @Inject(ICommentUnstableServiceString)
    private readonly commentUnstableService: ICommentUnstableService,
    @Inject(ILikeServiceUnstableString)
    private readonly likeUnstableService: ILikeServiceUnstable,
  ) {}
  @Get('recommended-posts')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getPosts(@Query() query: QueryLimitSkip, @Req() req: RequestUser) {
    const posts = await this.postUnstableService.getPostsAggregation({
      queryLimitSkip: query,
      pipelineStages: [
        // {
        //   $match: {
        //     endUserId: { $ne: req.user._id },
        //   },
        // },
        {
          $lookup: {
            from: 'likes',
            localField: '_id',
            foreignField: 'postId',
            as: 'likes',
          },
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'postId',
            as: 'comments',
            pipeline: [
              {
                $sort: { createdAt: -1 },
              },
              {
                $limit: 5,
              },
            ],
          },
        },
        {
          $addFields: {
            numOfLikes: { $size: '$likes' },
          },
        },
        { $sample: { size: 10 } },
      ],
    });
    return posts;
  }
}
