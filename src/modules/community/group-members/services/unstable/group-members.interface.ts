import {
  DocumentMongodbType,
  GroupMemberAggregation,
} from 'src/common/types/mongodbTypes';
import { GroupMember } from '../../entities';
import { GetGroupMembers } from '../../dto';
import { EndUserId } from 'src/common/types/utilTypes';
import { GroupIdAndUserIdObject } from '../stable/group-member.interface';

export const IGroupMembersServiceUnstableString =
  'IGroupMembersServiceUnstable';

export interface IGroupMembersServiceUnstable {
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
}
