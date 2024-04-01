/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { CreateGroupDto, ModifyGroupDto } from '../../dto';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import {
  isUndefined,
  isIdsEqual,
  PopulateSkipAndLimit,
} from 'src/common/utils';
import { SearchGroupsDto } from '../../dto/search-groups.dto';
import { IGroupServiceUnstable } from './group.unstable.interface';
import {
  DocumentMongodbType,
  GroupAggregation,
} from 'src/common/types/mongodbTypes';
import { LookUpEndUserAggregate } from 'src/common/constants';
import { TryCatchDecorator } from 'src/cores/decorators';
import {
  IGroupServiceStable,
  IGroupServiceStableString,
} from '../stable/group.stable.interface';
import { Group } from '../../entities';

@Injectable()
@TryCatchDecorator()
export class GroupServiceUnstable implements IGroupServiceUnstable {
  constructor(
    @Inject(IGroupServiceStableString)
    private readonly groupServiceStable: IGroupServiceStable,
  ) {}

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
      { $match: { $text: { $search: searchGroupsDto.name } } },
      ...PopulateSkipAndLimit(searchGroupsDto),
      ...LookUpEndUserAggregate,
    ]);
    return groups;
  }

  async deleteGroup(endUserId: EndUserId, groupId: GroupId) {
    const group: DocumentMongodbType<Group> | undefined =
      await this.groupServiceStable.findGroup(groupId);
    if (isUndefined(group)) {
      throw new NotFoundException('No Group Found');
    }
    if (!isIdsEqual(endUserId, group.endUserId)) {
      throw new BadRequestException("You don't have access to this!");
    }
    await this.groupServiceStable.deleteGroup(groupId);
    return group;
  }

  async modifyGroup(endUserId: EndUserId, modifyGroupDto: ModifyGroupDto) {
    const group = await this.groupServiceStable.findGroup(
      modifyGroupDto.groupId,
    );
    if (isUndefined(group)) {
      throw new NotFoundException('No Group Found');
    }
    isIdsEqual(endUserId, group.endUserId);
    await this.groupServiceStable.saveGroup(
      modifyGroupDto.groupId,
      modifyGroupDto,
    );
    return group;
  }
}
