import { Injectable } from '@nestjs/common';
import { PostServiceStable } from '../stable/post.stable.service';

import { EndUserId, PostId } from 'src/common/types/utilTypes/Brand';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';
import { PipelineStage } from 'mongoose';
import { CreatePostDto } from '../../dto/create-post.dto';
import { FindPostDto } from '../../dto/find-post.dto';
import { ModifyPostDto } from '../../dto/modify-post.dto';
import { GetUserPostsDto } from '../../dto/get-user-posts.dto';
import { tryCatchModified } from 'src/common/utils/';
import { CompareIdToThrowError } from 'src/common/utils/index';

@Injectable()
export class PostServiceUnstable {
  constructor(private readonly postServiceStable: PostServiceStable) {}

  public async createPost({
    createPostDto,
    endUserId,
    imageNames,
  }: {
    createPostDto: CreatePostDto;
    endUserId: EndUserId;
    imageNames: string[];
  }) {
    return tryCatchModified(async () => {
      const createdPost = await this.postServiceStable.createPost({
        createPostDto,
        endUserId,
        imageNames,
      });
      return createdPost;
    });
  }

  public async findPost(findPostDto: FindPostDto) {
    return tryCatchModified(async () => {
      const post =
        await this.postServiceStable.findPostAggregation(findPostDto);
      return post;
    });
  }

  public async getUserPosts({
    endUserId,
    getUserPostsDto,
  }: {
    endUserId: EndUserId;
    getUserPostsDto: GetUserPostsDto;
  }) {
    return tryCatchModified(async () => {
      const posts = await this.postServiceStable.getPostsAggregation({
        queryLimitSkip: getUserPostsDto,
        queryAggregation: [{ $match: { endUserId } }],
      });
      return posts;
    });
  }

  public async getPostsAggregation(
    queryLimitSkip: QueryLimitSkip,
    pipelineStages: PipelineStage[],
  ) {
    return tryCatchModified(async () => {
      return this.postServiceStable.getPostsAggregation({
        queryAggregation: pipelineStages,
        queryLimitSkip,
      });
    });
  }

  public async getRecommendedPosts({
    queryLimitSkip,
    //TODO: will use endUserId when we have recommendation system.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endUserId,
  }: {
    queryLimitSkip: QueryLimitSkip;
    endUserId: EndUserId;
  }) {
    return tryCatchModified(async () => {
      const queryAggregation: PipelineStage[] = [];

      const posts = await this.postServiceStable.getPostsAggregation({
        queryLimitSkip,
        queryAggregation,
      });

      return posts;
    });
  }

  public async modifyPost({
    endUserId,
    modifyPostDto,
    images,
  }: {
    modifyPostDto: ModifyPostDto;
    endUserId: EndUserId;
    images: string[];
  }) {
    return tryCatchModified(async () => {
      const post = await this.postServiceStable.findPostById({
        postId: modifyPostDto.postId,
      });
      CompareIdToThrowError(post.endUserId, endUserId);
      Object.assign(post, { ...modifyPostDto, images });
      return post.save();
    });
  }

  public async deletePost({
    postId,
    endUserId,
  }: {
    endUserId: EndUserId;
    postId: PostId;
  }) {
    return tryCatchModified(async () => {
      const post = await this.postServiceStable.findPostById({
        postId,
      });
      CompareIdToThrowError(post.endUserId, endUserId);

      await post.deleteOne();
      return post;
    });
  }
}
