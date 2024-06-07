import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestUser } from 'src/common/types/utilTypes';
import { LoggedInGuard } from 'src/modules/auth';
import { FindGroupDto } from './dto/find-group.dto';
import { GetGroupMembersDto } from './dto/get-group-members.dto';
import { DeleteGroupMember } from './dto/delete-group-member.dto';
import { userJoinInSwaggerAPIDecorators } from 'src/documents/swagger-api/group-members/user-join-in.api';
import { getGroupMembersSwaggerAPIDecorators } from 'src/documents/swagger-api/group-members';
import { DeleteGroupMemberSwaggerAPIDecorators } from 'src/documents/swagger-api/group-members/delete-group-member.api';
import { ApiTags } from '@nestjs/swagger';
import {
  IGroupMembersService,
  IGroupMembersServiceString,
} from './services/group-members.interface';
import { QueryLimitSkip } from 'src/cores/global-dtos';

@Controller('group-members')
@ApiTags('Group Member')
export class GroupMembersController {
  constructor(
    @Inject(IGroupMembersServiceString)
    private readonly groupMembersService: IGroupMembersService,
  ) {}

  @Post()
  @UseGuards(LoggedInGuard)
  @userJoinInSwaggerAPIDecorators()
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

  @Get(':groupId')
  @UseGuards(LoggedInGuard)
  @getGroupMembersSwaggerAPIDecorators()
  async getGroupMembers(
    @Param() param: GetGroupMembersDto,
    @Query() query: QueryLimitSkip,
  ) {
    const groupMembers = await this.groupMembersService.getGroupMembers(
      param,
      query,
    );
    return groupMembers;
  }

  // @Get(':endUserId')
  // @UseGuards(LoggedInGuard)
  // @findGroupMemberSwaggerAPIDecorators()
  // async findGroupMember(
  //   @Param() params: FindGroupMemberDto,
  //   // This will be used for later when we implement Private and public group
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   @Req() req: RequestUser,
  // ) {
  //   const groupMember = await this.groupMembersService.findGroupMember({
  //     endUserId: params.endUserId,
  //     groupId: params.groupId,
  //   });
  //   return groupMember;
  // }

  @Delete(':endUserId')
  @UseGuards(LoggedInGuard)
  @DeleteGroupMemberSwaggerAPIDecorators()
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
