import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GroupMember } from '../../entities';
import { Model } from 'mongoose';
import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { LookUpEndUserAggregate } from 'src/common/constants';
import { PopulateSkipAndLimit } from 'src/common/utils/';
import { GetGroupMembers } from '../../dto/get-group-members.dto';

export type GroupIdAndUserIdObject = {
  endUserId: EndUserId;
  groupId: GroupId;
};

@Injectable()
export class GroupMembersServiceStable {
  constructor(
    @InjectModel(GroupMember.name)
    private readonly groupMemberModel: Model<GroupMember>,
  ) {}

  async addGroupMember({ endUserId, groupId }: GroupIdAndUserIdObject) {
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

  async getGroupMembers({ groupId, ...queryLimitSkip }: GetGroupMembers) {
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
