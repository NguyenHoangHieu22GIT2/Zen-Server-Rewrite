import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { EndUserId, PostId } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { Like } from '../../entities';

export const ILikeServiceUnstableString = 'ILikeServiceUnstable';

export interface ILikeServiceUnstable {
  getNumberOfLikes(postId: PostId): Promise<number>;

  getLikes({
    postId,
    queryLimitSkip,
  }: {
    postId: PostId;
    queryLimitSkip: QueryLimitSkip;
  }): Promise<DocumentMongodbType<Like>[]>;

  toggleLike({
    postId,
    endUserId,
  }: {
    postId: PostId;
    endUserId: EndUserId;
  }): Promise<DocumentMongodbType<Like>>;
}
