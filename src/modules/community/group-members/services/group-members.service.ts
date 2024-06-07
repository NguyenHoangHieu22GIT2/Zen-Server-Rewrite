import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { GetGroupMembersDto } from '../dto/get-group-members.dto';
import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { Group } from 'src/modules/community/group/entities';
import { IGroupMembersService } from './group-members.interface';
import { isIdsEqual } from 'src/common/utils';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { GroupMembersRepository } from '../repository/group-members.repository';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { FindGroupDto } from '../dto';
export type GroupIdAndUserIdObject = {
  endUserId: EndUserId;
  groupId: GroupId;
};
@Injectable()
export class GroupMembersService implements IGroupMembersService {
  constructor(
    // @Inject(IgroupRepositoryString)
    // private readonly groupRepository: IgroupRepository,
    @Inject(BaseRepositoryName)
    private readonly groupRepository: GroupMembersRepository,
  ) {}

  public async countGroupMembers(groupId: GroupId): Promise<number> {
    return this.groupRepository.countDocuments({ groupId });
  }

  async addGroupMember(groupIdAndUserIdObject: GroupIdAndUserIdObject) {
    return this.groupRepository.create({
      groupId: groupIdAndUserIdObject.groupId,
      endUserId: groupIdAndUserIdObject.endUserId,
    });
  }

  async getGroupMembers(
    getGroupMembers: FindGroupDto,
    queryLimitSkip: QueryLimitSkip,
  ) {
    const groupMembers = await this.groupRepository.getGroupMembers(
      getGroupMembers,
      queryLimitSkip,
    );
    return groupMembers;
  }

  async findGroupMember({ endUserId, groupId }: GroupIdAndUserIdObject) {
    const groupMember = await this.groupRepository.findOne({
      endUserId,
      groupId,
    });
    return groupMember;
  }
  async deleteGroupMember(
    hostId: EndUserId,
    { endUserId, groupId }: GroupIdAndUserIdObject,
  ) {
    const groupMember = await this.groupRepository.findOne({
      endUserId,
      groupId,
    });
    //Populate in Mongoose is hard with types, so it has to be this ugly!
    const groupPopulatedInGroupMember = (await groupMember.populate({
      path: 'groupId',
      select: 'endUserId',
    })) as Group & { groupId: Pick<Group, 'endUserId'> };
    if (isIdsEqual(hostId, groupPopulatedInGroupMember.endUserId)) {
      throw new BadRequestException("You don't have access to this!");
    }
    groupMember.deleteOne();
    return groupMember;
  }
}
