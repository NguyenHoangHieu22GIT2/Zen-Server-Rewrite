import {
  DocumentMongodbType,
  GroupMemberAggregation,
} from 'src/common/types/mongodbTypes';
import { GroupMember } from '../entities';
import { GetGroupMembers } from '../dto';
import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { GroupIdAndUserIdObject } from './group-members.service';

export const IGroupMembersServiceString = 'IGroupMembersService';

export interface IGroupMembersService {
  addGroupMember(
    groupIdAndUserIdObject: GroupIdAndUserIdObject,
  ): Promise<DocumentMongodbType<GroupMember>>;

  getGroupMembers(
    getGroupMembers: GetGroupMembers,
  ): Promise<GroupMemberAggregation[]>;

  findGroupMember(
    groupIdAndUserIdObject: GroupIdAndUserIdObject,
  ): Promise<GroupMember>;

  deleteGroupMember(
    hostId: EndUserId,
    groupIdAndUserIdObject: GroupIdAndUserIdObject,
  ): Promise<GroupMember>;

  countGroupMembers(groupId: GroupId): Promise<number>;
}
