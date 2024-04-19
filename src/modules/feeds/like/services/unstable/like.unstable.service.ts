import { Inject, Injectable } from '@nestjs/common';
import { Like } from '../../entities/';
import { EndUserId, PostId } from 'src/common/types/utilTypes/';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/';
import { LikeServiceStable } from '../stable/';
import { QueryLimitSkip } from 'src/cores/global-dtos/';
import { LookUpEndUserAggregate } from 'src/cores/mongodb-aggregations';
import { ILikeServiceUnstable } from './like.unstable.interface';
import { TryCatchDecorator } from 'src/cores/decorators';
import { ILikeServiceStableString } from '../stable/like.stable.interface';

@Injectable()
@TryCatchDecorator()
export class LikeServiceUnstable implements ILikeServiceUnstable {
  constructor(
    @Inject(ILikeServiceStableString)
    private readonly likeServiceStable: LikeServiceStable,
  ) {}

  async getNumberOfLikes(postId: PostId): Promise<number> {
    const likesNumber = await this.likeServiceStable.getNumberOfLikes(postId);
    return likesNumber;
  }

  async getLikes({
    postId,
    queryLimitSkip,
  }: {
    postId: PostId;
    queryLimitSkip: QueryLimitSkip;
  }): Promise<DocumentMongodbType<Like>[]> {
    const likes = await this.likeServiceStable.getLikes({
      postId,
      queryLimitSkip,
      pipelineStages: LookUpEndUserAggregate,
    });
    return likes;
  }

  async toggleLike({
    postId,
    endUserId,
  }: {
    postId: PostId;
    endUserId: EndUserId;
  }): Promise<DocumentMongodbType<Like>> {
    let like = await this.likeServiceStable.findLike({ postId, endUserId });
    if (!like) {
      like = await this.likeServiceStable.createLike({ endUserId, postId });
    } else {
      await like.deleteOne();
    }
    return like;
  }
}
