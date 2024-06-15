/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { CreateGroupDto, ModifyGroupDto } from '../dto';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import {
  isUndefined,
  isIdsEqual,
  PopulateSkipAndLimit,
} from 'src/common/utils';
import { SearchGroupsDto } from '../dto/search-groups.dto';
import { IGroupService } from './group.interface';
import {
  DocumentMongodbType,
  PopulateEndUserAggregation,
} from 'src/common/types/mongodbTypes';
import { LookUpEndUserAggregate } from 'src/cores/mongodb-aggregations';

import { TryCatchDecorator } from 'src/cores/decorators';

import { Group } from '../entities';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { GroupRepository } from '../repository/group.repository';

@Injectable()
@TryCatchDecorator()
export class GroupService implements IGroupService {
  constructor(
    @Inject(BaseRepositoryName)
    private readonly groupRepository: GroupRepository,
  ) {}

  async createGroup(
    endUserId: EndUserId,
    createGroupDto: CreateGroupDto,
    imageName: string,
  ) {
    const group = await this.groupRepository.create({
      endUserId,
      avatar: imageName,
      ...createGroupDto,
    });

    return group;
  }

  async findGroup(groupId: GroupId) {
    const group = await this.groupRepository.findById(groupId);
    return group;
  }

  async getGroups<T>(queryLimitSkip: QueryLimitSkip) {
    const groups = await this.groupRepository.findByAggregation<
      PopulateEndUserAggregation<Group> & T
    >([...PopulateSkipAndLimit(queryLimitSkip), ...LookUpEndUserAggregate]);
    return groups;
  }

  public async getYourCreatedGroups<T>(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ) {
    const groups = await this.groupRepository.findByAggregation<
      PopulateEndUserAggregation<Group> & T
    >([
      { $match: { endUserId: endUserId } },
      ...PopulateSkipAndLimit(queryLimitSkip),
      ...LookUpEndUserAggregate,
    ]);
    return groups;
  }

  async searchGroups<T>(searchGroupsDto: SearchGroupsDto) {
    const groups = await this.groupRepository.findByAggregation<
      PopulateEndUserAggregation<Group> & T
    >([
      { $match: { $text: { $search: searchGroupsDto.name } } },
      ...PopulateSkipAndLimit(searchGroupsDto),
      ...LookUpEndUserAggregate,
    ]);
    return groups;
  }

  async deleteGroup(endUserId: EndUserId, groupId: GroupId) {
    const group: DocumentMongodbType<Group> | undefined =
      await this.groupRepository.findById(groupId);
    if (isUndefined(group)) {
      throw new NotFoundException('No Group Found');
    }
    if (!isIdsEqual(endUserId, group.endUserId)) {
      throw new BadRequestException("You don't have access to this!");
    }
    await this.groupRepository.delete(groupId);
    return group;
  }

  async modifyGroup(
    endUserId: EndUserId,
    groupId: GroupId,
    modifyGroupDto: ModifyGroupDto,
    imageName: string,
  ) {
    const group = await this.groupRepository.findById(groupId);
    if (isUndefined(group)) {
      throw new NotFoundException('No Group Found');
    }
    isIdsEqual(endUserId, group.endUserId);
    Object.assign(group, { ...modifyGroupDto, imageName });
    await this.groupRepository.save(group);
    return group;
  }
}
