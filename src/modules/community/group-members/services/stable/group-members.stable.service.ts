import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GroupMember } from '../../entities';
import { Model } from 'mongoose';
import { LookUpEndUserAggregate } from 'src/common/constants';
import { PopulateSkipAndLimit } from 'src/common/utils/';
import { GetGroupMembers } from '../../dto/get-group-members.dto';
import {
  DocumentMongodbType,
  GroupMemberAggregation,
} from 'src/common/types/mongodbTypes';
import {
  GroupIdAndUserIdObject,
  IGroupMembersServiceStable,
} from './group-member.interface';

@Injectable()
export class GroupMembersServiceStable implements IGroupMembersServiceStable {
  constructor(
    @InjectModel(GroupMember.name)
    private readonly groupMemberModel: Model<GroupMember>,
  ) {}

  async addGroupMember({
    endUserId,
    groupId,
  }: GroupIdAndUserIdObject): Promise<DocumentMongodbType<GroupMember>> {
    const groupMember = await this.groupMemberModel.create({
      groupId,
      endUserId,
    });
    return groupMember;
  }

  async findGroupMember({ endUserId, groupId }: GroupIdAndUserIdObject) {
    const groupMember = await this.groupMemberModel.findOne({
      endUserId,
      groupId,
    });
    return groupMember;
  }

  async getGroupMembers({
    groupId,
    ...queryLimitSkip
  }: GetGroupMembers): Promise<GroupMemberAggregation[]> {
    const groupMembers = await this.groupMemberModel.aggregate([
      {
        $match: { groupId },
      },
      ...PopulateSkipAndLimit(queryLimitSkip),
      ...LookUpEndUserAggregate,
    ]);
    return groupMembers;
  }
}
