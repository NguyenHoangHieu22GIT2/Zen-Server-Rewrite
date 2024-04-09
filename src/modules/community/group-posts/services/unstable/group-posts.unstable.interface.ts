import { EndUserId, GroupId, GroupPostId } from 'src/common/types/utilTypes';
import {
  CreateGroupPostDto,
  FindGroupPostDto,
  GetUserGroupPostsDto,
  ModifyGroupPostDto,
} from '../../dto';
import { GroupPost } from '../../entities';
import { DeleteGroupMember } from 'src/modules/community/group-members';
import { GroupPostAggregation } from 'src/common/types/mongodbTypes';

export const IGroupPostsServiceUnstableString = 'IGroupPostsServiceUnstable';

export interface IGroupPostsServiceUnstable {
  createPost({
    createGroupPostDto,
    endUserId,
    imageNames,
  }: {
    createGroupPostDto: CreateGroupPostDto;
    endUserId: EndUserId;
    imageNames: string[];
  }): Promise<GroupPost>;

  findPost(findGroupPostDto: FindGroupPostDto): Promise<GroupPostAggregation>;

  getUserGroupPosts({
    endUserId,
    getUserGroupPostsDto,
  }: {
    endUserId: EndUserId;
    getUserGroupPostsDto: GetUserGroupPostsDto;
  }): Promise<GroupPostAggregation[]>;

  deletePost({
    endUserId,
    groupPostId,
  }: {
    endUserId: EndUserId;
    groupPostId: GroupId;
  }): Promise<GroupPost>;

  modifyPost({
    endUserId,
    modifyGroupPostDto,
  }: {
    endUserId: EndUserId;
    modifyGroupPostDto: ModifyGroupPostDto;
  }): Promise<GroupPost>;

  likePost({
    endUserId,
    groupPostId,
  }: {
    endUserId: EndUserId;
    groupPostId: GroupId;
  }): Promise<GroupPost>;

  unlikePost({
    endUserId,
    groupPostId,
  }: {
    endUserId: EndUserId;
    groupPostId: GroupId;
  }): Promise<GroupPost>;

  deleteComment({
    endUserId,
    groupPostId,
    commentId,
  }: {
    endUserId: EndUserId;
    groupPostId: GroupId;
    commentId: GroupId;
  }): Promise<GroupPost>;

  deletePost({
    endUserId,
    groupPostId,
  }: {
    endUserId: EndUserId;
    groupPostId: GroupPostId;
  }): Promise<GroupPost>;
}
