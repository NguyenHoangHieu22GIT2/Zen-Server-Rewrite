import { QueryLimitSkip } from 'src/cores/global-dtos';
import { PipelineStage } from 'mongoose';
import {
  DocumentMongodbType,
  PostAggregation,
} from 'src/common/types/mongodbTypes';
import { CreatePostDto, FindPostDto } from '../../dto';
import { Post } from '../../entities';
import { EndUserId, PostId } from 'src/common/types/utilTypes';

export type IPostServiceStableArgs = {
  getPostsAggregation: {
    queryLimitSkip: QueryLimitSkip;
    queryAggregation: PipelineStage[];
  };
  findPostAggregation: FindPostDto;
  findPostById: FindPostDto;
  createPost: {
    createPostDto: CreatePostDto;
    endUserId: EndUserId;
    imageNames: string[];
  };
};

export const IPostServiceStableString = 'IPostServiceStable';

export interface IPostServiceStable {
  getPostsAggregation(
    params: IPostServiceStableArgs['getPostsAggregation'],
  ): Promise<PostAggregation[]>;

  findPostAggregation(
    pararms: IPostServiceStableArgs['findPostAggregation'],
  ): Promise<PostAggregation>;

  findPostById(
    params: IPostServiceStableArgs['findPostById'],
  ): Promise<DocumentMongodbType<Post>>;

  createPost(
    params: IPostServiceStableArgs['createPost'],
  ): Promise<DocumentMongodbType<Post>>;

  deletePost(postId: PostId): Promise<unknown>;

  savePost(postId: PostId, data: Partial<Post>): Promise<unknown>;
}
