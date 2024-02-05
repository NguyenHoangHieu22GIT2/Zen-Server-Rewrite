import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
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

  async getNumberOfLikes(postId: PostId): Promise<number> {
    const likesNumber = await this.likeModel.countDocuments({ postId });
    return likesNumber;
  }

  async getLikes({
    postId,
    queryLimitSkip,
  }: {
    postId: PostId;
    queryLimitSkip: QueryLimitSkip;
  }): Promise<DocumentMongodbType<Like>[]> {
    const likes = await this.likeModel.aggregate([
      { $match: { postId } },
      {
        $skip: queryLimitSkip.skip,
      },
      {
        $limit: queryLimitSkip.limit,
      },
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
    let isLiked = await this.likeModel.findOne({ endUserId, postId });

    if (!isLiked) {
      isLiked = await this.likeModel.create({ endUserId, postId });
    } else {
      await isLiked.deleteOne();
    }

    return isLiked;
  }
}
