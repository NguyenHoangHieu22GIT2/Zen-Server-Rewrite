import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';
import { GroupMember } from '../entities';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { GetGroupMembers } from '../dto';
import { GroupMemberAggregation } from 'src/common/types/mongodbTypes';
import { PopulateSkipAndLimit } from 'src/common/utils';
import { LookUpEndUserAggregate } from 'src/cores/mongodb-aggregations';

@Injectable()
export class GroupMembersRepository extends GenericRepositoryMongodb<GroupMember> {
  constructor(
    @InjectModel(GroupMember.name)
    private readonly groupMemberModel: Model<GroupMember>,
  ) {
    super(groupMemberModel);
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
