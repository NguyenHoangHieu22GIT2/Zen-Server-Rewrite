import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestUser } from 'src/common/types/utilTypes';
import { CreateGroupDto, ModifyGroupDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { TryCatchDecorator } from 'src/cores/decorators/';
import { LoggedInGuard } from 'src/modules/auth';
import {
  IGroupServiceUnstable,
  IGroupServiceUnstableString,
} from './services/unstable/group.unstable.interface';
import { FindGroupDto } from '../group-members';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { SearchGroupsDto } from './dto/search-groups.dto';

@ApiTags('Group')
@Controller('group')
@TryCatchDecorator()
export class GroupController {
  constructor(
    @Inject(IGroupServiceUnstableString)
    private readonly groupService: IGroupServiceUnstable,
  ) {}

  @Post()
  @UseGuards(LoggedInGuard)
  async createGroup(
    @Req() req: RequestUser,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    const group = await this.groupService.createGroup(
      req.user._id,
      createGroupDto,
    );
    return group;
  }

  @Get(':groupId')
  findGroup(@Param() Param: FindGroupDto) {
    return this.groupService.findGroup(Param.groupId);
  }

  @Get()
  getGroups(@Query() query: QueryLimitSkip) {
    return this.groupService.getGroups(query);
  }

  @Get('/search')
  searchGroups(@Query() query: SearchGroupsDto) {
    return this.groupService.searchGroups(query);
  }

  @Delete(':groupId')
  @UseGuards(LoggedInGuard)
  deleteGroup(@Req() req: RequestUser, @Param() param: FindGroupDto) {
    return this.groupService.deleteGroup(req.user._id, param.groupId);
  }

  @Patch()
  @UseGuards(LoggedInGuard)
  modifyGroup(@Req() req: RequestUser, modifyGroupDto: ModifyGroupDto) {
    return this.groupService.modifyGroup(req.user._id, modifyGroupDto);
  }
}
