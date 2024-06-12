import {
  DocumentMongodbType,
  PopulateEndUserAggregation,
} from 'src/common/types/mongodbTypes';
import { GroupMember } from '../entities';
import { FindGroupDto } from '../dto';
import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { GroupIdAndUserIdObject } from './group-members.service';
import { QueryLimitSkip } from 'src/cores/global-dtos';

export const IGroupMembersServiceString = 'IGroupMembersService';

export interface IGroupMembersService {
  addGroupMember(
    groupIdAndUserIdObject: GroupIdAndUserIdObject,
  ): Promise<DocumentMongodbType<GroupMember>>;

  getGroupMembers(
    findGroupDto: FindGroupDto,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<PopulateEndUserAggregation<GroupMember>[]>;

  findGroupMember(
    groupIdAndUserIdObject: GroupIdAndUserIdObject,
  ): Promise<GroupMember>;

  deleteGroupMember(
    hostId: EndUserId,
    groupIdAndUserIdObject: GroupIdAndUserIdObject,
  ): Promise<GroupMember>;

  countGroupMembers(groupId: GroupId): Promise<number>;
}
