import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';

import { PostServiceStable } from '../stable/post.stable.service';
import { FindPostDto } from '../dto/find-post.dto';
import { EndUserId, PostId } from 'src/common/types/utilTypes/Brand';
import { ModifyPostDto } from '../dto/modify-post.dto';

import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';

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

  public async getPosts({
    queryLimitSkip,
    endUserId,
  }: {
    queryLimitSkip: QueryLimitSkip;
    endUserId: EndUserId;
  }) {
    try {
      const posts = await this.postServiceStable.getPostsAggregation({
        queryLimitSkip,
        endUserId,
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
