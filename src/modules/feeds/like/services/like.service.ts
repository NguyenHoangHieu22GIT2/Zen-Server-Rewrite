import { Inject, Injectable } from '@nestjs/common';
import { Like } from '../entities/';
import { EndUserId, PostId } from 'src/common/types/utilTypes/';
import {
  DocumentMongodbType,
  PopulateEndUserAggregation,
} from 'src/common/types/mongodbTypes/';
import { QueryLimitSkip } from 'src/cores/global-dtos/';
import { LookUpEndUserAggregate } from 'src/cores/mongodb-aggregations';
import { TryCatchDecorator } from 'src/cores/decorators';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { LikeRepository } from '../repository/like.repository';
import { ILikeService } from './like.interface';
import { noObj } from 'src/common/utils';

@Injectable()
@TryCatchDecorator()
export class LikeService implements ILikeService {
  constructor(
    @Inject(BaseRepositoryName) private readonly likeRepository: LikeRepository,
  ) {}

  public async getPostLikesOfUser(
    endUserId: EndUserId,
    { limit, skip }: QueryLimitSkip,
  ) {
    const likes = await this.likeRepository.find({ endUserId }, noObj, {
      limit,
      skip,
    });

    return likes;
  }

  public async findLike(
    endUserId: EndUserId,
    postId: PostId,
  ): Promise<DocumentMongodbType<Like>> {
    const like = await this.likeRepository.findOne({ endUserId, postId });
    return like;
  }

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
  }): Promise<PopulateEndUserAggregation<Like>[]> {
    const likes = await this.likeRepository.findByAggregation<
      PopulateEndUserAggregation<Like>
    >([
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
