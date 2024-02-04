import { Injectable } from '@nestjs/common';
import { PostServiceStable } from '../stable/post.stable.service';

import { EndUserId, PostId } from 'src/common/types/utilTypes/Brand';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';
import { PipelineStage } from 'mongoose';
import { CreatePostDto } from '../../dto/create-post.dto';
import { FindPostDto } from '../../dto/find-post.dto';
import { ModifyPostDto } from '../../dto/modify-post.dto';
import { GetUserPostsDto } from '../../dto/get-user-posts.dto';

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
    try {
      const createdPost = await this.postServiceStable.createPost({
        createPostDto,
        endUserId,
        imageNames,
      });
      return createdPost;
    } catch (error) {
      throw error;
    }
  }

  public async findPost(findPostDto: FindPostDto) {
    try {
      const post =
        await this.postServiceStable.findPostAggregation(findPostDto);
      return post;
    } catch (error) {
      throw error;
    }
  }

  public async getUserPosts({
    endUserId,
    getUserPostsDto,
  }: {
    endUserId: EndUserId;
    getUserPostsDto: GetUserPostsDto;
  }) {
    try {
      const posts = await this.postServiceStable.getPostsAggregation({
        queryLimitSkip: getUserPostsDto,
        queryAggregation: [{ $match: { _id: endUserId } }],
      });
      return posts;
    } catch (error) {}
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
    try {
      const queryAggregation: PipelineStage[] = [];

      const posts = await this.postServiceStable.getPostsAggregation({
        queryLimitSkip,
        queryAggregation,
      });

      return posts;
    } catch (error) {
      throw error;
    }
  }

  public async modifyPost({
    endUserId,
    modifyPostDto,
  }: {
    modifyPostDto: ModifyPostDto;
    endUserId: EndUserId;
  }) {
    try {
      const post = await this.postServiceStable.modifyPost({
        modifyPostDto,
        endUserId,
      });
      return post;
    } catch (error) {
      throw error;
    }
  }

  public async deletePost({
    postId,
    endUserId,
  }: {
    endUserId: EndUserId;
    postId: PostId;
  }) {
    try {
      const post = await this.postServiceStable.deletePost({
        postId,
        endUserId,
      });
      return post;
    } catch (error) {
      throw error;
    }
  }
}
