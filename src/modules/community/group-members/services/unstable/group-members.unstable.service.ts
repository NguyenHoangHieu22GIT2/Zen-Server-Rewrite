import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { GetGroupMembers } from '../../dto/get-group-members.dto';
import { EndUserId } from 'src/common/types/utilTypes';
import { Group } from 'src/modules/community/group/entities';
import { IGroupMembersServiceUnstable } from './group-members.interface';
import { isIdsEqual } from 'src/common/utils';
import {
  GroupIdAndUserIdObject,
  IGroupMembersServiceStable,
  IGroupMembersServiceStableString,
} from '../stable/group-member.interface';

@Injectable()
export class GroupMembersServiceUnstable
  implements IGroupMembersServiceUnstable
{
  constructor(
    @Inject(IGroupMembersServiceStableString)
    private readonly groupMembersServiceStable: IGroupMembersServiceStable,
  ) {}

  async addGroupMember(groupIdAndUserIdObject: GroupIdAndUserIdObject) {
    return this.groupMembersServiceStable.addGroupMember(
      groupIdAndUserIdObject,
    );
  }

  async getGroupMembers(getGroupMembers: GetGroupMembers) {
    const groupMembers =
      await this.groupMembersServiceStable.getGroupMembers(getGroupMembers);
    return groupMembers;
  }

  async findGroupMember(groupIdAndUserIdObject: GroupIdAndUserIdObject) {
    const groupMember = await this.groupMembersServiceStable.findGroupMember(
      groupIdAndUserIdObject,
    );
    return groupMember;
  }

  async deleteGroupMember(
    hostId: EndUserId,
    groupIdAndUserIdObject: GroupIdAndUserIdObject,
  ) {
    const groupMember = await this.groupMembersServiceStable.findGroupMember(
      groupIdAndUserIdObject,
    );
    //Populate in Mongoose is hard with types, so it has to be this ugly!
    const groupPopulatedInGroupMember = (await groupMember.populate({
      path: 'groupId',
      select: 'endUserId',
    })) as Group & { groupId: Pick<Group, 'endUserId'> };
    if (isIdsEqual(hostId, groupPopulatedInGroupMember.endUserId)) {
      throw new BadRequestException("You don't have access to this!");
    }
    await groupMember.deleteOne();
    return groupMember;
  }
}
