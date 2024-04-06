import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { EndUserId, PostId } from 'src/common/types/utilTypes';
import { Like } from '../../entities';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { PipelineStage } from 'mongoose';

export const ILikeServiceStableString = 'ILikeServiceStable';

export interface ILikeServiceStable {
  getNumberOfLikes(postId: PostId): Promise<number>;

  getLikes({
    postId,
    queryLimitSkip,
    pipelineStages,
  }: {
    postId: PostId;
    queryLimitSkip: QueryLimitSkip;
    pipelineStages?: PipelineStage[];
  }): Promise<DocumentMongodbType<Like>[]>;

  findLike({
    postId,
    endUserId,
  }: {
    postId: PostId;
    endUserId: EndUserId;
  }): Promise<DocumentMongodbType<Like>>;

  createLike({
    postId,
    endUserId,
  }: {
    postId: PostId;
    endUserId: EndUserId;
  }): Promise<DocumentMongodbType<Like>>;
}
