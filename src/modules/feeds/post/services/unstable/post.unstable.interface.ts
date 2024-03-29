import {
  DocumentMongodbType,
  PostAggregation,
} from 'src/common/types/mongodbTypes';
import { Post } from '../../entities';
import {
  CreatePostDto,
  FindPostDto,
  GetUserPostsDto,
  ModifyPostDto,
} from '../../dto';
import { EndUserId, PostId } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { PipelineStage } from 'mongoose';

export type IPostServiceUnstableArgs = {
  createPost: {
    createPostDto: CreatePostDto;
    endUserId: EndUserId;
    imageNames: string[];
  };

  findPost: FindPostDto;

  getUserPosts: {
    endUserId: EndUserId;
    getUserPostsDto: GetUserPostsDto;
  };

  getPostsAggregation: {
    queryLimitSkip: QueryLimitSkip;
    pipelineStages: PipelineStage[];
  };

  getRecommendedPost: {
    queryLimitSkip: QueryLimitSkip;
    endUserId: EndUserId;
  };
  modifyPost: {
    modifyPostDto: ModifyPostDto;
    endUserId: EndUserId;
    images: string[];
  };

  deletePost: {
    endUserId: EndUserId;
    postId: PostId;
  };
};

export const IPostServiceUnstableString = 'IPostServiceUnstable ';

export interface IPostServiceUnstable {
  createPost(
    createPost: IPostServiceUnstableArgs['createPost'],
  ): Promise<DocumentMongodbType<Post>>;

  findPost(
    findPostDto: IPostServiceUnstableArgs['findPost'],
  ): Promise<PostAggregation>;

  getUserPosts(
    getuserPosts: IPostServiceUnstableArgs['getUserPosts'],
  ): Promise<PostAggregation[]>;

  getPostsAggregation(
    getPostsAggregation: IPostServiceUnstableArgs['getPostsAggregation'],
  ): Promise<PostAggregation[]>;

  getRecommendedPosts(
    getRecommendedPost: IPostServiceUnstableArgs['getRecommendedPost'],
  ): Promise<PostAggregation[]>;

  modifyPost(
    modifyPost: IPostServiceUnstableArgs['modifyPost'],
  ): Promise<DocumentMongodbType<Post>>;

  deletePost(
    deletePost: IPostServiceUnstableArgs['deletePost'],
  ): Promise<DocumentMongodbType<Post>>;
}
