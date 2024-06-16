import {
  DocumentMongodbType,
  PopulateEndUserAggregation,
} from 'src/common/types/mongodbTypes';
import { EndUserId, PostId } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { Like } from '../entities';

export const ILikeServiceString = 'ILikeService';

export interface ILikeService {
  findLike(
    endUserId: EndUserId,
    postId: PostId,
  ): Promise<DocumentMongodbType<Like>>;

  getPostLikesOfUser(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<DocumentMongodbType<Like>[]>;

  getNumberOfLikes(postId: PostId): Promise<number>;

  getLikes({
    postId,
    queryLimitSkip,
  }: {
    postId: PostId;
    queryLimitSkip: QueryLimitSkip;
  }): Promise<PopulateEndUserAggregation<Like>[]>;

  toggleLike({
    postId,
    endUserId,
  }: {
    postId: PostId;
    endUserId: EndUserId;
  }): Promise<DocumentMongodbType<Like>>;
}
