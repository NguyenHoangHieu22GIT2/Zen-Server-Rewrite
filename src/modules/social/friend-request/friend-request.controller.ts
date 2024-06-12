import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  IFriendRequestService,
  IFriendRequestServiceString,
} from './services/friend-request.interface.service';

import { LoggedInGuard } from 'src/modules/auth';
import { ApiTags } from '@nestjs/swagger';
import { RequestUser } from 'src/common/types/utilTypes';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { GetFriendRequestsSwaggerAPIDecorators } from 'src/documents/swagger-api/friend-request/get-friend-requests.api';
import { DeclineFriendRequestSwaggerAPIDecorators } from 'src/documents/swagger-api/friend-request/decline-friend-request.api';
import { FindFriendRequestDto } from './dto/find-friend-request.dto';
import { FindByIdEndUserDto } from 'src/modules/users/enduser';
import { isIdsEqual } from 'src/common/utils';

@UseGuards(LoggedInGuard)
@ApiTags('Friend Request')
@Controller('friend-request')
export class FriendRequestController {
  constructor(
    @Inject(IFriendRequestServiceString)
    private readonly friendRequestService: IFriendRequestService,
  ) {}

  @GetFriendRequestsSwaggerAPIDecorators()
  @Get(':endUserId')
  public async getFriendRequestsFromEndUserId(
    @Req() req: RequestUser,
    @Query() query: QueryLimitSkip,
    @Param() param: FindByIdEndUserDto,
  ) {
    if (!isIdsEqual(req.user._id, param.endUserId)) {
      throw new UnauthorizedException("you can't do this!");
    }

    const friendRequests = await this.friendRequestService.getFriendRequests(
      param.endUserId,
      query,
    );

    return friendRequests;
  }

  @GetFriendRequestsSwaggerAPIDecorators()
  @Get()
  public async getFriendRequests(
    @Req() req: RequestUser,
    @Query() query: QueryLimitSkip,
  ) {
    const friendRequests = await this.friendRequestService.getFriendRequests(
      req.user._id,
      query,
    );

    return friendRequests;
  }

  @DeclineFriendRequestSwaggerAPIDecorators()
  @Patch('decline-friend-request')
  public async declineFriendRequest(
    @Req() req: RequestUser,
    @Body() findFriendRequestDto: FindFriendRequestDto,
  ) {
    const friendRequest = await this.friendRequestService.declineFriendRequest(
      req.user._id,
      findFriendRequestDto.friendRequestId,
    );

    return friendRequest;
  }
}
