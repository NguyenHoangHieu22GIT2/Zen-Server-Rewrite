import { Injectable } from '@nestjs/common';
import { Like } from '../../entities/';
import { EndUserId, PostId } from 'src/common/types/utilTypes/';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/';
import { LikeServiceStable } from '../stable/';
import { QueryLimitSkip } from 'src/cores/global-dtos/';
import { tryCatchModified } from 'src/common/utils/';
import { LookUpEndUserAggregate } from 'src/common/constants/';

@Injectable()
export class LikeServiceUnstable {
  constructor(private readonly likeServiceStable: LikeServiceStable) {}

  async getNumberOfLikes(postId: PostId): Promise<number> {
    return tryCatchModified(async () => {
      const likesNumber = await this.likeServiceStable.getNumberOfLikes(postId);
      return likesNumber;
    });
  }

  async getLikes({
    postId,
    queryLimitSkip,
  }: {
    postId: PostId;
    queryLimitSkip: QueryLimitSkip;
  }): Promise<DocumentMongodbType<Like>[]> {
    return tryCatchModified(async () => {
      const likes = await this.likeServiceStable.getLikes({
        postId,
        queryLimitSkip,
        pipelineStages: LookUpEndUserAggregate,
      });
      return likes;
    });
  }
  async toggleLike({
    postId,
    endUserId,
  }: {
    postId: PostId;
    endUserId: EndUserId;
  }): Promise<DocumentMongodbType<Like>> {
    return tryCatchModified(async () => {
      let like = await this.likeServiceStable.findLike({ postId, endUserId });
      if (!like) {
        like = await this.likeServiceStable.createLike({ endUserId, postId });
      } else {
        await like.deleteOne();
      }
      return like;
    });
  }
}
