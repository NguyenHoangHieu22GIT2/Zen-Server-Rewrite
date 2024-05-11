import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { IFriendRequestServiceString } from './friend-request.interface.service';
import {
  FriendUnstableService,
  IFriendUnstableServiceString,
} from '../friend/services';
import { LoggedInGuard } from 'src/modules/auth';
import { ApiTags } from '@nestjs/swagger';
import { RequestUser } from 'src/common/types/utilTypes';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { FindFriendRequestDto } from './dto/find-friend-request.dto';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { GetFriendRequestsSwaggerAPIDecorators } from 'src/documents/swagger-api/friend-request/get-friend-requests.api';
import { CreateFriendRequestSwaggerAPIDecorators } from 'src/documents/swagger-api/friend-request/create-friend-request.api';
import { AcceptFriendRequestSwaggerAPIDecorators } from 'src/documents/swagger-api/friend-request/accept-friend-request.api';
import { DeclineFriendRequestSwaggerAPIDecorators } from 'src/documents/swagger-api/friend-request/decline-friend-request.api';

@UseGuards(LoggedInGuard)
@ApiTags('Friend Request')
@Controller('friend-request')
export class FriendRequestController {
  constructor(
    @Inject(IFriendRequestServiceString)
    private readonly friendRequestService: FriendRequestService,
    @Inject(IFriendUnstableServiceString)
    private readonly friendService: FriendUnstableService,
  ) {}

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

  @CreateFriendRequestSwaggerAPIDecorators()
  @Post()
  public async createFriendRequest(
    @Req() req: RequestUser,
    @Body() createFriendRequestDto: CreateFriendRequestDto,
  ) {
    //TODO: APPLY function to find the relationship to stop this.
    // const hasBeenFriend = await this.friendService.

    const friendRequest = await this.friendRequestService.createFriendRequest(
      req.user._id,
      createFriendRequestDto.endUserId,
    );

    return friendRequest;
  }

  @AcceptFriendRequestSwaggerAPIDecorators()
  @Patch('accept-friend-request')
  public async acceptFriendRequest(
    @Req() req: RequestUser,
    @Body() findFriendRequestDto: FindFriendRequestDto,
  ) {
    const friendRequest = await this.friendRequestService.acceptFriendRequest(
      req.user._id,
      findFriendRequestDto.friendRequestId,
    );

    await this.friendService.addFriend(req.user._id, friendRequest.friendId);

    return friendRequest;
  }

  @DeclineFriendRequestSwaggerAPIDecorators()
  @Patch('decline-friend-request')
  public async declineFriendRequest(
    @Req() req: RequestUser,
    @Body() FindFriendRequestDto: FindFriendRequestDto,
  ) {
    const friendRequest = await this.friendRequestService.declineFriendRequest(
      req.user._id,
      FindFriendRequestDto.friendRequestId,
    );

    return friendRequest;
  }
}
