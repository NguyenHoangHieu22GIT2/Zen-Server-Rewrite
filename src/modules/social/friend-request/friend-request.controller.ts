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

  @Post()
  public async createFriendRequest(
    @Req() req: RequestUser,
    @Body() createFriendRequestDto: CreateFriendRequestDto,
  ) {
    const friendRequest = await this.friendRequestService.createFriendRequest(
      req.user._id,
      createFriendRequestDto.endUserId,
    );

    return friendRequest;
  }

  @Patch('accept-friend-request')
  public async acceptFriendRequest(
    @Req() req: RequestUser,
    @Body() findFriendRequestDto: FindFriendRequestDto,
  ) {
    const friendRequest = await this.friendRequestService.acceptFriendRequest(
      req.user._id,
      findFriendRequestDto.endUserId,
    );

    await this.friendService.addFriend(req.user._id, friendRequest.friendId);

    return friendRequest;
  }

  @Patch('decline-friend-request')
  public async declineFriendRequest(
    @Req() req: RequestUser,
    @Body() FindFriendRequestDto: FindFriendRequestDto,
  ) {
    const friendRequest = await this.friendRequestService.declineFriendRequest(
      req.user._id,
      FindFriendRequestDto.endUserId,
    );

    return friendRequest;
  }
}
