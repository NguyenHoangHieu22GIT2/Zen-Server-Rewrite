import {
  DocumentMongodbType,
  PopulateEndUserAggregation,
} from 'src/common/types/mongodbTypes';
import { Post } from '../entities';
import {
  CreatePostDto,
  FindPostDto,
  GetUserPostsDto,
  ModifyPostDto,
} from '../dto';
import { EndUserId, GroupId, PostId } from 'src/common/types/utilTypes';
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

  getGroupPosts: {
    groupId: GroupId;
    queryLimitSkip: QueryLimitSkip;
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

  findPost<T extends object>(
    findPostDto: IPostServiceArgs['findPost'],
  ): Promise<PopulateEndUserAggregation<Post> & T>;

  getUserPostsFromGroup<T extends object>(
    getuserPosts: IPostServiceArgs['getUserPosts'],
  ): Promise<(PopulateEndUserAggregation<Post> & T)[]>;

  getUserPostsFromProfile<T extends object>(
    getuserPosts: IPostServiceArgs['getUserPosts'],
  ): Promise<(PopulateEndUserAggregation<Post> & T)[]>;

  getGroupPosts<T extends object>(
    args: IPostServiceArgs['getGroupPosts'],
  ): Promise<(PopulateEndUserAggregation<Post> & T)[]>;

  getPostsAggregation(
    getPostsAggregation: IPostServiceArgs['getPostsAggregation'],
  ): Promise<PopulateEndUserAggregation<Post>[]>;

  getRecommendedPosts<T extends object>(
    getRecommendedPost: IPostServiceArgs['getRecommendedPost'],
  ): Promise<(PopulateEndUserAggregation<Post> & T)[]>;

  modifyPost(
    modifyPost: IPostServiceArgs['modifyPost'],
  ): Promise<DocumentMongodbType<Post>>;

  deletePost(
    deletePost: IPostServiceArgs['deletePost'],
  ): Promise<DocumentMongodbType<Post>>;
}
