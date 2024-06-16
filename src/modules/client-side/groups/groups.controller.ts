import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestUser } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { LoggedInGuard } from 'src/modules/auth';
import { FindGroupDto } from 'src/modules/community/group-members';
import {
  IGroupMembersService,
  IGroupMembersServiceString,
} from 'src/modules/community/group-members/services/group-members.interface';
import {
  IGroupService,
  IGroupServiceString,
} from 'src/modules/community/group/services';
import {
  IEndUserService,
  IEndUserServiceString,
} from 'src/modules/users/enduser';

@Controller('groups')
@ApiTags('Groups-for-client')
@UseGuards(LoggedInGuard)
export class GroupsController {
  constructor(
    @Inject(IGroupServiceString) private readonly groupService: IGroupService,
    @Inject(IGroupMembersServiceString)
    private readonly groupMemberService: IGroupMembersService,
    @Inject(IEndUserServiceString)
    private readonly endUserService: IEndUserService,
  ) {}

  @Get('join-groups')
  public async getJoinedGroups(
    @Req() req: RequestUser,
    @Query() query: QueryLimitSkip,
  ) {
    const groupsJoined = await this.groupMemberService.getGroupsJoined(
      req.user._id,
      query,
    );
    console.log(groupsJoined);

    for (let i = 0; i < groupsJoined.length; i++) {
      const groupJoined = groupsJoined[i];

      await groupJoined.populate('groupId');

      const endUser = await this.endUserService.findById(
        //@ts-expect-error error type
        groupJoined.groupId.endUserId,
      );
      //@ts-expect-error error type
      groupJoined.endUser = endUser;
    }

    const groupsCreated = await this.groupService.getYourCreatedGroups(
      req.user._id,
      query,
    );
    return { groupsJoined, groupsCreated };
  }

  @Get()
  public async groupDiscovery(
    @Req() req: RequestUser,
    @Query() queryLimitSkip: QueryLimitSkip,
  ) {
    const groups = await this.groupService.getGroups<{
      isJoined: boolean;
      numOfMembers: number;
    }>(queryLimitSkip);

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      const isJoined = await this.groupMemberService.findGroupMember({
        endUserId: req.user._id,
        groupId: group._id,
      });
      const numOfMembers = await this.groupMemberService.countGroupMembers(
        group._id,
      );
      group.isJoined = isJoined ? true : false;
      if (group.endUser._id.equals(req.user._id)) {
        group.isJoined = true;
      }
      group.numOfMembers = numOfMembers;
    }

    return groups;
  }

  @Get(':groupId')
  public async groupDetail(
    @Req() req: RequestUser,
    @Param() param: FindGroupDto,
  ) {
    const group = await this.groupService.findGroup(param.groupId);
    const numOfMembers = await this.groupMemberService.countGroupMembers(
      param.groupId,
    );
    let isJoined = false;
    if (group.endUserId.equals(req.user._id)) {
      isJoined = true;
    } else {
      const member = await this.groupMemberService.findGroupMember({
        endUserId: req.user._id,
        groupId: param.groupId,
      });
      isJoined = member ? true : false;
    }
    return { isJoined: isJoined, group, numOfMembers };
  }

  @Get(':groupId/group-members-count')
  public async groupMembersCount(
    @Req() req: RequestUser,
    @Param() param: FindGroupDto,
    @Query() queryLimitSkip: QueryLimitSkip,
  ) {
    const groupMembers = await this.groupMemberService.getGroupMembers(
      param,
      queryLimitSkip,
    );
    return groupMembers;
  }
}
