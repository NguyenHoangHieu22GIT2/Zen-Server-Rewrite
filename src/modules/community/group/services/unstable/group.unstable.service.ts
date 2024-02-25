import { Injectable } from '@nestjs/common';
import { GroupServiceStable } from '../stable/group.stable.service';
import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { CreateGroupDto } from '../../dto';
import { TryCatchForServiceClass } from 'src/cores/decorators/TryCatchForServiceClass.decorator';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { CompareIdToThrowError, PopulateSkipAndLimit } from 'src/common/utils';
import { SearchGroupsDto } from '../../dto/search-groups.dto';

@Injectable()
@TryCatchForServiceClass()
export class GroupServiceUnstable {
  constructor(private readonly groupServiceStable: GroupServiceStable) {}

  async createGroup(endUserId: EndUserId, createGroupDto: CreateGroupDto) {
    const group = await this.groupServiceStable.createGroup(
      endUserId,
      createGroupDto,
    );
    return group;
  }

  async findGroup(endUserId: EndUserId, groupId: GroupId) {
    const group = await this.groupServiceStable.findGroup(groupId);
    return group;
  }

  async getGroups(endUserId: EndUserId, queryLimitSkip: QueryLimitSkip) {
    const groups = await this.groupServiceStable.getGroups([
      ...PopulateSkipAndLimit(queryLimitSkip),
    ]);
    return groups;
  }

  async searchGroups(endUserId: EndUserId, searchGroupsDto: SearchGroupsDto) {
    const groups = await this.groupServiceStable.getGroups([
      { $match: { name: searchGroupsDto.name } },
      ...PopulateSkipAndLimit(searchGroupsDto),
    ]);
    return groups;
  }

  async deleteGroup(endUserId: EndUserId, groupId: GroupId) {
    const group = await this.groupServiceStable.findGroup(groupId);
    CompareIdToThrowError(endUserId, group.endUserId);
    await group.deleteOne();
    return group;
  }
}
