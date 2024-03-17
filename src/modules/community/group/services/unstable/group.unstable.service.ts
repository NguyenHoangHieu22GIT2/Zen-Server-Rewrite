import { Injectable } from '@nestjs/common';
import { GroupServiceStable } from '../stable/group.stable.service';
import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { CreateGroupDto, ModifyGroupDto } from '../../dto';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { isIdsEqual, PopulateSkipAndLimit } from 'src/common/utils';
import { SearchGroupsDto } from '../../dto/search-groups.dto';
import { IGroupServiceUnstable } from './group.unstable.interface';
import { GroupAggregation } from 'src/common/types/mongodbTypes';
import { LookUpEndUserAggregate } from 'src/common/constants';

@Injectable()
export class GroupServiceUnstable implements IGroupServiceUnstable {
  constructor(private readonly groupServiceStable: GroupServiceStable) {}

  async createGroup(endUserId: EndUserId, createGroupDto: CreateGroupDto) {
    const group = await this.groupServiceStable.createGroup(
      endUserId,
      createGroupDto,
    );
    return group;
  }

  async findGroup(groupId: GroupId) {
    const group = await this.groupServiceStable.findGroup(groupId);
    return group;
  }

  async getGroups(queryLimitSkip: QueryLimitSkip) {
    const groups = await this.groupServiceStable.getGroups<GroupAggregation>([
      ...PopulateSkipAndLimit(queryLimitSkip),
      ...LookUpEndUserAggregate,
    ]);
    return groups;
  }

  async searchGroups(searchGroupsDto: SearchGroupsDto) {
    const groups = await this.groupServiceStable.getGroups<GroupAggregation>([
      { $match: { name: searchGroupsDto.name } },
      ...PopulateSkipAndLimit(searchGroupsDto),
      ...LookUpEndUserAggregate,
    ]);
    return groups;
  }

  async deleteGroup(endUserId: EndUserId, groupId: GroupId) {
    const group = await this.groupServiceStable.findGroup(groupId);
    isIdsEqual(endUserId, group.endUserId);
    await group.deleteOne();
    return group;
  }

  async modifyGroup(endUserId: EndUserId, modifyGroupDto: ModifyGroupDto) {
    const group = await this.groupServiceStable.findGroup(
      modifyGroupDto.groupId,
    );
    isIdsEqual(endUserId, group.endUserId);
    Object.assign(group, modifyGroupDto);
    return group.save();
  }
}
