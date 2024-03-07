import {
  DocumentMongodbType,
  GroupMemberAggregation,
} from 'src/common/types/mongodbTypes';
import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { GroupMember } from '../../entities';
import { GetGroupMembers } from '../../dto';

export type GroupIdAndUserIdObject = {
  endUserId: EndUserId;
  groupId: GroupId;
};

export const IGroupMembersServiceStableString = 'IGroupMembersServiceStable';

export interface IGroupMembersServiceStable {
  addGroupMember(
    groupIdAndUserIdObject: GroupIdAndUserIdObject,
  ): Promise<DocumentMongodbType<GroupMember>>;

  findGroupMember(
    groupIdAndUserIdObject: GroupIdAndUserIdObject,
  ): Promise<DocumentMongodbType<GroupMember>>;

  getGroupMembers(
    getGroupMembers: GetGroupMembers,
  ): Promise<GroupMemberAggregation[]>;
}
