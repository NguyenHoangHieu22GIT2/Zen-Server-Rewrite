import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from '../../entities';
import { Model, PipelineStage } from 'mongoose';
import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { CreateGroupDto, ModifyGroupDto } from '../../dto';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { IGroupServiceStable } from './group.stable.interface';

@Injectable()
export class GroupServiceStable implements IGroupServiceStable {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
  ) {}

  async createGroup(
    endUserId: EndUserId,
    createGroupDto: CreateGroupDto,
  ): Promise<DocumentMongodbType<Group>> {
    const group = await this.groupModel.create({
      endUserId,
      ...createGroupDto,
    });
    return group;
  }

  async findGroup(
    groupId: GroupId,
  ): Promise<DocumentMongodbType<Group> | undefined> {
    const group = await this.groupModel.findById(groupId);
    return group;
  }

  async getGroups<T>(pipelineStages: PipelineStage[]): Promise<T[]> {
    const groups = await this.groupModel.aggregate(pipelineStages);
    return groups;
  }

  async deleteGroup(groupId: GroupId): Promise<unknown> {
    const group = await this.groupModel.deleteOne({ _id: groupId });
    return group;
  }
  async saveGroup(
    groupId: GroupId,
    modifyGroupDto: ModifyGroupDto,
  ): Promise<unknown> {
    return this.groupModel.updateOne({ _id: groupId }, modifyGroupDto);
  }
}
