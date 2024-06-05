import {
  DocumentMongodbType,
  PostAggregation,
} from 'src/common/types/mongodbTypes';
import { Post } from '../entities';
import {
  CreatePostDto,
  FindPostDto,
  GetUserPostsDto,
  ModifyPostDto,
} from '../dto';
import { EndUserId, PostId } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { PipelineStage } from 'mongoose';

export type IPostServiceArgs = {
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

export const IPostServiceString = 'IPostService';

export interface IPostService {
  createPost(
    createPost: IPostServiceArgs['createPost'],
  ): Promise<DocumentMongodbType<Post>>;

  findPost(findPostDto: IPostServiceArgs['findPost']): Promise<PostAggregation>;

  getUserPostsFromGroup(
    getuserPosts: IPostServiceArgs['getUserPosts'],
  ): Promise<PostAggregation[]>;

  getUserPostsFromProfile(
    getuserPosts: IPostServiceArgs['getUserPosts'],
  ): Promise<PostAggregation[]>;

  getPostsAggregation(
    getPostsAggregation: IPostServiceArgs['getPostsAggregation'],
  ): Promise<PostAggregation[]>;

  getRecommendedPosts(
    getRecommendedPost: IPostServiceArgs['getRecommendedPost'],
  ): Promise<PostAggregation[]>;

  modifyPost(
    modifyPost: IPostServiceArgs['modifyPost'],
  ): Promise<DocumentMongodbType<Post>>;

  deletePost(
    deletePost: IPostServiceArgs['deletePost'],
  ): Promise<DocumentMongodbType<Post>>;
}
