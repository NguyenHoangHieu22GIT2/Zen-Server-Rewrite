import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from '../../entities';
import { Model, PipelineStage } from 'mongoose';
import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { PopulateSkipAndLimit } from 'src/common/utils';
import { CreateGroupDto } from '../../dto';

@Injectable()
export class GroupServiceStable {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
  ) {}

  async createGroup(endUserId: EndUserId, createGroupDto: CreateGroupDto) {
    const group = await this.groupModel.create({
      endUserId,
      ...createGroupDto,
    });
    return group;
  }

  async findGroup(groupId: GroupId) {
    const group = await this.groupModel.findById(groupId);
    return group;
  }

  async getGroups(
    queryLimitSkip: QueryLimitSkip,
    pipelineStages: PipelineStage[],
  ) {
    const groups = await this.groupModel.aggregate([
      ...PopulateSkipAndLimit(queryLimitSkip),
      ...pipelineStages,
    ]);
    return groups;
  }
}
