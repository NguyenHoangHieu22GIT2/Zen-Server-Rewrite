import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { CreateGroupDto, ModifyGroupDto } from '../../dto';
import {
  DocumentMongodbType,
  GroupAggregation,
} from 'src/common/types/mongodbTypes';
import { Group } from '../../entities';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { SearchGroupsDto } from '../../dto/search-groups.dto';

export const IGroupServiceUnstableString = 'IGroupServiceUnstable';

export interface IGroupServiceUnstable {
  createGroup(
    endUserId: EndUserId,
    createGroupDto: CreateGroupDto,
    imageName: string,
  ): Promise<DocumentMongodbType<Group>>;

  findGroup(groupId: GroupId): Promise<DocumentMongodbType<Group>>;

  getGroups(queryLimitSkip: QueryLimitSkip): Promise<GroupAggregation[]>;

  searchGroups(searchGroupsDto: SearchGroupsDto): Promise<GroupAggregation[]>;

  deleteGroup(
    endUserId: EndUserId,
    groupId: GroupId,
  ): Promise<DocumentMongodbType<Group>>;

  modifyGroup(
    endUserId: EndUserId,
    modifyGroupDto: ModifyGroupDto,
  ): Promise<DocumentMongodbType<Group>>;
}
