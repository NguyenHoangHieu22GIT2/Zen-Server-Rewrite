import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { EndUserId, PostId } from 'src/common/types/utilTypes/Brand';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';
import { PipelineStage } from 'mongoose';
import { CreateGroupPostDto } from '../../dto/create-group-post.dto';
import { FindGroupPostDto } from '../../dto/find-group-post.dto';
import { GroupPostServiceStable } from '../stable/group-posts.stable.service';
import { GetUserGroupPostsDto } from '../../dto/get-user-group-posts.dto';
import { ModifyGroupPostDto } from '../../dto/modify-group-post.dto';

@Injectable()
export class PostServiceUnstable {
  constructor(
    private readonly groupPostServiceUnstable: GroupPostServiceStable,
  ) {}

  public async createPost({
    createGroupPostDto,
    endUserId,
    imageNames,
  }: {
    createGroupPostDto: CreateGroupPostDto;
    endUserId: EndUserId;
    imageNames: string[];
  }) {
    try {
      const createdPost = await this.groupPostServiceUnstable.createPost({
        createGroupPostDto,
        endUserId,
        imageNames,
      });
      return createdPost;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findPost(findPostDto: FindGroupPostDto) {
    try {
      const post =
        await this.groupPostServiceUnstable.findPostAggregation(findPostDto);
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async getUserGroupPosts({
    endUserId,
    getUserGroupPostsDto,
  }: {
    endUserId: EndUserId;
    getUserGroupPostsDto: GetUserGroupPostsDto;
  }) {
    try {
      const posts = await this.groupPostServiceUnstable.getPostsAggregation({
        queryLimitSkip: getUserGroupPostsDto,
        queryAggregation: [
          {
            $match: {
              endUserId: endUserId,
              groupId: getUserGroupPostsDto.groupId,
            },
          },
        ],
      });
      return posts;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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

      const posts = await this.groupPostServiceUnstable.getPostsAggregation({
        queryLimitSkip,
        queryAggregation,
      });

      return posts;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async modifyPost({
    endUserId,
    modifyGroupPostDto,
    images,
  }: {
    modifyGroupPostDto: ModifyGroupPostDto;
    endUserId: EndUserId;
    images: string[];
  }) {
    try {
      const post = await this.groupPostServiceUnstable.modifyPost({
        modifyGroupPostDto,
        endUserId,
        images,
      });
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error);
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
      const post = await this.groupPostServiceUnstable.deletePost({
        postId,
        endUserId,
      });
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
