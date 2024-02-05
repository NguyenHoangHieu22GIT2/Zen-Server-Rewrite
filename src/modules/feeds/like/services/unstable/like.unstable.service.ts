import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Like } from '../../entities/like.entity';
import { EndUserId, PostId } from 'src/common/types/utilTypes/Brand';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
import { LikeServiceStable } from '../stable/like.stable.service';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';

@Injectable()
export class LikeServiceUnstable {
  constructor(private readonly likeServiceStable: LikeServiceStable) {}

  async getNumberOfLikes(postId: PostId): Promise<number> {
    try {
      const likesNumber = await this.likeServiceStable.getNumberOfLikes(postId);
      return likesNumber;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getLikes({
    postId,
    queryLimitSkip,
  }: {
    postId: PostId;
    queryLimitSkip: QueryLimitSkip;
  }): Promise<DocumentMongodbType<Like>[]> {
    try {
      const likesNumber = await this.likeServiceStable.getLikes({
        postId,
        queryLimitSkip,
      });
      return likesNumber;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async toggleLike({
    postId,
    endUserId,
  }: {
    postId: PostId;
    endUserId: EndUserId;
  }): Promise<DocumentMongodbType<Like>> {
    try {
      return this.likeServiceStable.toggleLike({ postId, endUserId });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
