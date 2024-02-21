import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  GroupIdAndUserIdObject,
  GroupMembersServiceStable,
} from '../stable/group-members.stable.service';
import { tryCatchModified } from 'src/common/utils';
import { GetGroupMembers } from '../../dto/get-group-members.dto';
import { EndUserId } from 'src/common/types/utilTypes';
import { Group } from 'src/modules/community/group/entities';

@Injectable()
export class GroupMembersServiceUnstable {
  constructor(
    private readonly groupMembersServiceStable: GroupMembersServiceStable,
  ) {}

  async addGroupMember(groupIdAndUserIdObject: GroupIdAndUserIdObject) {
    return tryCatchModified(async () => {
      return this.groupMembersServiceStable.addGroupMember(
        groupIdAndUserIdObject,
      );
    });
  }

  async getGroupMembers(getGroupMembers: GetGroupMembers) {
    return tryCatchModified(async () => {
      const groupMembers =
        await this.groupMembersServiceStable.getGroupMembers(getGroupMembers);
      return groupMembers;
    });
  }

  async findGroupMember(groupIdAndUserIdObject: GroupIdAndUserIdObject) {
    return tryCatchModified(async () => {
      const groupMember = await this.groupMembersServiceStable.findGroupMember(
        groupIdAndUserIdObject,
      );
      return groupMember;
    });
  }
  async deleteGroupMember(
    hostId: EndUserId,
    groupIdAndUserIdObject: GroupIdAndUserIdObject,
  ) {
    return tryCatchModified(async () => {
      const groupMember = await this.groupMembersServiceStable.findGroupMember(
        groupIdAndUserIdObject,
      );
      //Populate in Mongoose is hard with types, so it has to be this ugly!
      const groupPopulatedInGroupMember = (await groupMember.populate({
        path: 'groupId',
        select: 'endUserId',
      })) as Group & { groupId: Pick<Group, 'endUserId'> };
      if (!hostId.equals(groupPopulatedInGroupMember.endUserId)) {
        throw new UnauthorizedException(
          'You are not the admin of the group to remove this user',
        );
      }
      groupMember.deleteOne();
      return groupMember;
    });
  }
}
