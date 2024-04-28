import { Injectable } from '@nestjs/common';
import { PipelineStage } from 'mongoose';
import { EndUserId, PostId } from 'src/common/types/utilTypes/Brand';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';
import { ILikeServiceStable } from './like.stable.interface';
import { LikeRepository } from '../../repository/like.repository';
import { LikeAggregation } from 'src/common/types/mongodbTypes';

@Injectable()
export class LikeServiceStable implements ILikeServiceStable {
  constructor(private readonly likeRepository: LikeRepository) {}

  async createLike({
    postId,
    endUserId,
  }: {
    postId: PostId;
    endUserId: EndUserId;
  }) {
    return this.likeRepository.create({ endUserId, postId });
  }

  async findLike({
    postId,
    endUserId,
  }: {
    postId: PostId;
    endUserId: EndUserId;
  }) {
    return this.likeRepository.findOne({ postId, endUserId });
  }

  async getNumberOfLikes(postId: PostId): Promise<number> {
    return this.likeRepository.countDocuments({ postId });
  }

  async getLikes({
    postId,
    queryLimitSkip,
    pipelineStages,
  }: {
    postId: PostId;
    queryLimitSkip: QueryLimitSkip;
    pipelineStages?: PipelineStage[];
  }): Promise<LikeAggregation[]> {
    const likes = await this.likeRepository.findByAggregation<LikeAggregation>([
      { $match: { postId } },
      {
        $skip: queryLimitSkip.skip,
      },
      {
        $limit: queryLimitSkip.limit,
      },
      ...pipelineStages,
    ]);
    return likes;
  }
}
