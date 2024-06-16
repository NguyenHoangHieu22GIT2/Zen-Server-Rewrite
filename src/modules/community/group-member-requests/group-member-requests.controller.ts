import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGroupMemberRequestDto } from './dto/create-group-member-request.dto';
import { LoggedInGuard } from 'src/modules/auth';
import { RequestUser } from 'src/common/types/utilTypes';
import {
  IGroupMemberRequests,
  IGroupMemberRequestsString,
} from './service/group-member-requests.interface';
import { FindGroupDto } from '../group-members';
import { IGroupService, IGroupServiceString } from '../group/services';
import { ActionForRequestDto } from './dto/action-for-request.dto';
import {
  IGroupMembersService,
  IGroupMembersServiceString,
} from '../group-members/services/group-members.interface';

@Controller('group-member-requests')
@ApiTags('Group-Member-Requests')
@UseGuards(LoggedInGuard)
export class GroupMemberRequestsController {
  constructor(
    @Inject(IGroupMemberRequestsString)
    private readonly groupMemberRequestService: IGroupMemberRequests,
    @Inject(IGroupServiceString)
    private readonly groupService: IGroupService,
    @Inject(IGroupMembersServiceString)
    private readonly groupMemberService: IGroupMembersService,
  ) {}

  @Post()
  public async createRequest(
    @Body() createDto: CreateGroupMemberRequestDto,
    @Req() req: RequestUser,
  ) {
    const hasJoined = await this.groupMemberService.findGroupMember({
      endUserId: req.user._id,
      groupId: createDto.groupId,
    });

    const group = await this.groupService.findGroup(createDto.groupId);

    if (hasJoined || (group && group.endUserId.equals(req.user._id))) {
      throw new BadRequestException('you already joined this group!');
    }

    const request = await this.groupMemberRequestService.createRequest(
      req.user._id,
      createDto.groupId,
    );
    return request;
  }

  @Get(':groupId')
  public async getRequests(
    @Req() req: RequestUser,
    @Param() param: FindGroupDto,
  ) {
    const group = await this.groupService.findGroup(param.groupId);
    const requests = await this.groupMemberRequestService.getRequests(
      req.user._id,
      group,
    );
    return requests;
  }

  @Patch('decline')
  public async declineRequest(
    @Req() req: RequestUser,
    @Body() { endUserId, groupId }: ActionForRequestDto,
  ) {
    const group = await this.groupService.findGroup(groupId);

    const request = await this.groupMemberRequestService.declineRequest(
      req.user._id,
      endUserId,
      group,
    );
    return request;
  }

  @Patch('accept')
  public async acceptRequest(
    @Req() req: RequestUser,
    @Body() { endUserId, groupId }: ActionForRequestDto,
  ) {
    const group = await this.groupService.findGroup(groupId);

    const request = await this.groupMemberRequestService.acceptRequest(
      req.user._id,
      endUserId,
      group,
    );

    await this.groupMemberService.addGroupMember({
      endUserId,
      groupId,
    });
    return request;
  }
}
