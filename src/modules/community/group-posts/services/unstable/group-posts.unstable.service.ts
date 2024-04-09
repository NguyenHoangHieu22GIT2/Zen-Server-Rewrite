import { BadRequestException, Injectable } from '@nestjs/common';
import { GroupPostServiceStable } from '../stable/group-posts.stable.service';
import { CreateGroupPostDto } from '../../dto/create-group-post.dto';
import {
  EndUserId,
  GroupId,
  GroupPostId,
} from 'src/common/types/utilTypes/Brand';
import { FindGroupPostDto } from '../../dto/find-group-post.dto';
import { GetUserGroupPostsDto } from '../../dto/get-user-group-posts.dto';
import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';
import { ModifyGroupPostDto } from '../../dto/modify-group-post.dto';
import { isIdsEqual } from 'src/common/utils';
import { TryCatchDecorator } from 'src/cores/decorators';
import { IGroupPostsServiceUnstable } from './group-posts.unstable.interface';

@Injectable()
@TryCatchDecorator()
export class GroupPostsServiceUnstable {
  constructor(
    private readonly groupPostServiceStable: GroupPostServiceStable,
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
    const createdPost = await this.groupPostServiceStable.createPost({
      createGroupPostDto,
      endUserId,
      imageNames,
    });
    return createdPost;
  }

  public async findPost(findGroupPostDto: FindGroupPostDto) {
    const post =
      await this.groupPostServiceStable.findPostAggregation(findGroupPostDto);
    return post;
  }

  public async getUserGroupPosts({
    endUserId,
    getUserGroupPostsDto,
  }: {
    endUserId: EndUserId;
    getUserGroupPostsDto: GetUserGroupPostsDto;
  }) {
    const posts = await this.groupPostServiceStable.getGroupPostsAggregation({
      queryLimitSkip: getUserGroupPostsDto,
      queryAggregation: [
        { $match: { endUserId, groupId: getUserGroupPostsDto.groupId } },
      ],
    });
    return posts;
  }

  public async getPostsFromNewestToOldest({
    groupId,
    queryLimitSkip,
  }: {
    queryLimitSkip: QueryLimitSkip;
    groupId: GroupId;
  }) {
    const posts = await this.groupPostServiceStable.getGroupPostsAggregation({
      queryAggregation: [{ $match: { groupId: groupId } }],
      queryLimitSkip,
    });
    return posts;
  }

  // public async modifyPost({
  //   endUserId,
  //   modifyGroupPostDto,
  //   images,
  // }: {
  //   modifyGroupPostDto: ModifyGroupPostDto;
  //   endUserId: EndUserId;
  //   images: string[];
  // }) {
  //   const post = await this.groupPostServiceStable.findPostById({
  //     groupPostId: modifyGroupPostDto.groupPostId,
  //   });
  //   if (isIdsEqual(post.endUserId, endUserId)) {
  //     throw new BadRequestException("You don't have access to this!");
  //   }
  //   Object.assign(post, { ...modifyGroupPostDto, images });
  //   return post.save();
  // }
  //
}
