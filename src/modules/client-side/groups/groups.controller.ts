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
import { nameOfCollections } from 'src/common/constants';
import { RequestUser } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { LoggedInGuard } from 'src/modules/auth';
import { Group } from 'src/modules/community/group';
import { FindGroupDto } from 'src/modules/community/group-members';
import {
  IGroupMembersService,
  IGroupMembersServiceString,
} from 'src/modules/community/group-members/services/group-members.interface';
import {
  IGroupService,
  IGroupServiceString,
} from 'src/modules/community/group/services';

@Controller('groups')
@ApiTags('Groups-for-client')
@UseGuards(LoggedInGuard)
export class GroupsController {
  constructor(
    @Inject(IGroupServiceString) private readonly groupService: IGroupService,
    @Inject(IGroupMembersServiceString)
    private readonly groupMemberService: IGroupMembersService,
  ) {}

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

  @Get('join-groups')
  public async getJoinedGroups(
    @Req() req: RequestUser,
    @Param() query: QueryLimitSkip,
  ) {
    const results = await this.groupMemberService.getGroupMembersAggregation<{
      group: Group;
    }>([
      {
        $match: { endUserId: req.user._id },
      },
      { $limit: query.limit },
      { $skip: query.skip },
      {
        $lookup: {
          from: nameOfCollections.Group,
          localField: 'groupId',
          foreignField: 'id',
          as: 'group',
        },
      },
      {
        $project: {
          group: 1,
        },
      },
      {
        $lookup: {
          from: nameOfCollections.EndUser,
          localField: 'group.endUserId',
          foreignField: 'id',
          as: 'endUser',
        },
      },
      {
        $unset: [
          'group.endUser.password',
          'group.endUser.activationToken',
          'group.endUser.modifyToken',
        ],
      },
    ]);

    const groupsCreated = await this.groupService.getYourCreatedGroups(
      req.user._id,
      query,
    );
    return { groupsJoined: results, groupsCreated };
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
}
