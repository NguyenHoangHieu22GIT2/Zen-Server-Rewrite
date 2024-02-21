import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GroupMembersServiceUnstable } from './services';
import { RequestUser } from 'src/common/types/utilTypes';
import { LoggedInGuard } from 'src/modules/auth';
import { FindGroupDto } from './dto/find-group.dto';
import { GetGroupMembers } from './dto/get-group-members.dto';
import { DeleteGroupMember } from './dto/delete-group-member.dto';

@Controller('group-members')
export class GroupMembersController {
  constructor(
    private readonly groupMembersService: GroupMembersServiceUnstable,
  ) {}

  @Post()
  @UseGuards(LoggedInGuard)
  async userJoinIn(
    @Req() req: RequestUser,
    @Body() findGroupDto: FindGroupDto,
  ) {
    const groupMember = await this.groupMembersService.addGroupMember({
      groupId: findGroupDto.groupId,
      endUserId: req.user._id,
    });
    return groupMember;
  }

  @Get()
  @UseGuards(LoggedInGuard)
  async getGroupMembers(@Param() params: GetGroupMembers) {
    const groupMembers = await this.groupMembersService.getGroupMembers(params);
    return groupMembers;
  }

  @Get(':endUserId')
  @UseGuards(LoggedInGuard)
  async findGroupMember(
    @Param() params: FindGroupDto,
    @Req() req: RequestUser,
  ) {
    const groupMember = await this.groupMembersService.findGroupMember({
      endUserId: req.user._id,
      groupId: params.groupId,
    });
    return groupMember;
  }

  @Delete(':endUserId')
  @UseGuards(LoggedInGuard)
  async deleteGroupMember(
    @Req() req: RequestUser,
    @Param() params: DeleteGroupMember,
  ) {
    const groupMember = await this.groupMembersService.deleteGroupMember(
      req.user._id,
      {
        endUserId: params.endUserId,
        groupId: params.groupId,
      },
    );
    return groupMember;
  }
}
