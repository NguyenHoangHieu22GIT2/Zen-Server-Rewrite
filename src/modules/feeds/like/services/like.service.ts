import { Inject, Injectable } from '@nestjs/common';
import { Like } from '../entities/';
import { EndUserId, PostId } from 'src/common/types/utilTypes/';
import {
  DocumentMongodbType,
  LikeAggregation,
} from 'src/common/types/mongodbTypes/';
import { QueryLimitSkip } from 'src/cores/global-dtos/';
import { LookUpEndUserAggregate } from 'src/cores/mongodb-aggregations';
import { TryCatchDecorator } from 'src/cores/decorators';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { LikeRepository } from '../repository/like.repository';
import { ILikeService } from './like.interface';

@Injectable()
@TryCatchDecorator()
export class LikeService implements ILikeService {
  constructor(
    @Inject(BaseRepositoryName) private readonly likeRepository: LikeRepository,
  ) {}

  async getNumberOfLikes(postId: PostId): Promise<number> {
    const likesNumber = await this.likeRepository.countDocuments({ postId });
    return likesNumber;
  }

  async getLikes({
    postId,
    queryLimitSkip,
  }: {
    postId: PostId;
    queryLimitSkip: QueryLimitSkip;
  }): Promise<LikeAggregation[]> {
    const likes = await this.likeRepository.findByAggregation<LikeAggregation>([
      { $match: { postId } },
      {
        $skip: queryLimitSkip.skip,
      },
      {
        $limit: queryLimitSkip.limit,
      },
      ...LookUpEndUserAggregate,
    ]);
    return likes;
  }

  async toggleLike({
    postId,
    endUserId,
  }: {
    postId: PostId;
    endUserId: EndUserId;
  }): Promise<DocumentMongodbType<Like>> {
    let like = await this.likeRepository.findOne({ postId, endUserId });
    if (!like) {
      like = await this.likeRepository.create({ endUserId, postId });
    } else {
      await like.deleteOne();
    }
    return like;
  }
}
