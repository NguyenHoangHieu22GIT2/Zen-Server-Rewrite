import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';
import { GroupMember } from '../entities';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { GetGroupMembersDto } from '../dto';
import { PopulateSkipAndLimit } from 'src/common/utils';
import { LookUpEndUserAggregate } from 'src/cores/mongodb-aggregations';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { PopulateEndUserAggregation } from 'src/common/types/mongodbTypes';

@Injectable()
export class GroupMembersRepository extends GenericRepositoryMongodb<GroupMember> {
  constructor(
    @InjectModel(GroupMember.name)
    private readonly groupMemberModel: Model<GroupMember>,
  ) {
    super(groupMemberModel);
  }

  async getGroupMembers(
    getGroupMembersDto: GetGroupMembersDto,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<PopulateEndUserAggregation<GroupMember>[]> {
    const groupMembers = await this.groupMemberModel.aggregate([
      {
        $match: { groupId: getGroupMembersDto.groupId },
      },
      ...PopulateSkipAndLimit(queryLimitSkip),
      ...LookUpEndUserAggregate,
    ]);
    return groupMembers;
  }
}
