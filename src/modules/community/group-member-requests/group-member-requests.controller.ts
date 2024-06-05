import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GroupMemberRequestsService } from './service/group-member-requests.service';
import { CreateGroupMemberRequestDto } from './dto/create-group-member-request.dto';
import { LoggedInGuard } from 'src/modules/auth';
import { RequestUser } from 'src/common/types/utilTypes';

@Controller('group-member-requests')
@ApiTags('Group-Member-Requests')
@UseGuards(LoggedInGuard)
export class GroupMemberRequestsController {
  constructor(
    private readonly groupMemberRequestService: GroupMemberRequestsService,
  ) {}

  @Post()
  createRequest(
    @Body() createDto: CreateGroupMemberRequestDto,
    @Req() req: RequestUser,
  ) {}
}
