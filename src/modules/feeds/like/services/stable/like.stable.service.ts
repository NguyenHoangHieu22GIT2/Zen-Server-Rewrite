import { Injectable } from '@nestjs/common';
import { Model, PipelineStage } from 'mongoose';
import { Like } from '../../entities/like.entity';
import { InjectModel } from '@nestjs/mongoose';
import { EndUserId, PostId } from 'src/common/types/utilTypes/Brand';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';

@Injectable()
export class LikeServiceStable {
  constructor(
    @InjectModel(Like.name) private readonly likeModel: Model<Like>,
  ) {}

  async createLike({
    postId,
    endUserId,
  }: {
    postId: PostId;
    endUserId: EndUserId;
  }) {
    return this.likeModel.create({ endUserId, postId });
  }

  async findLike({
    postId,
    endUserId,
  }: {
    postId: PostId;
    endUserId: EndUserId;
  }) {
    return this.likeModel.findOne({ postId, endUserId });
  }

  async getNumberOfLikes(postId: PostId): Promise<number> {
    return this.likeModel.countDocuments({ postId });
  }

  async getLikes({
    postId,
    queryLimitSkip,
    pipelineStages,
  }: {
    postId: PostId;
    queryLimitSkip: QueryLimitSkip;
    pipelineStages?: PipelineStage[];
  }): Promise<DocumentMongodbType<Like>[]> {
    const likes = await this.likeModel.aggregate([
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
