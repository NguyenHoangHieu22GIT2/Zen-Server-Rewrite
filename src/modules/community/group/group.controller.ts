import { Body, Controller, Post, Req } from '@nestjs/common';
import { GroupServiceUnstable } from './services';
import { RequestUser } from 'src/common/types/utilTypes';
import { CreateGroupDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupServiceUnstable) {}

  @Post()
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
}
