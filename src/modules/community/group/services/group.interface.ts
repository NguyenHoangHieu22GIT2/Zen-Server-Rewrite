import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { CreateGroupDto, ModifyGroupDto } from '../dto';
import {
  DocumentMongodbType,
  PopulateEndUserAggregation,
} from 'src/common/types/mongodbTypes';
import { Group } from '../entities';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { SearchGroupsDto } from '../dto/search-groups.dto';

export const IGroupServiceString = 'IGroupService';

export interface IGroupService {
  createGroup(
    endUserId: EndUserId,
    createGroupDto: CreateGroupDto,
    imageName: string,
  ): Promise<DocumentMongodbType<Group>>;

  findGroup(groupId: GroupId): Promise<DocumentMongodbType<Group>>;

  getGroups<T>(
    queryLimitSkip: QueryLimitSkip,
  ): Promise<(PopulateEndUserAggregation<Group> & T)[]>;

  getYourCreatedGroups<T>(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<(PopulateEndUserAggregation<Group> & T)[]>;

  searchGroups<T>(
    searchGroupsDto: SearchGroupsDto,
  ): Promise<(PopulateEndUserAggregation<Group> & T)[]>;

  deleteGroup(
    endUserId: EndUserId,
    groupId: GroupId,
  ): Promise<DocumentMongodbType<Group>>;

  modifyGroup(
    endUserId: EndUserId,
    groupId: GroupId,
    modifyGroupDto: ModifyGroupDto,
    imageName: string,
  ): Promise<DocumentMongodbType<Group>>;
}
