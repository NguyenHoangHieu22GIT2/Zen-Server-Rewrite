import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  IFriendRequestService,
  IFriendRequestServiceString,
} from '../friend-request/services/friend-request.interface.service';
import { IFriendService, IFriendServiceString } from '../friend/services';
import { CreateFriendRequestSwaggerAPIDecorators } from 'src/documents/swagger-api/friend-request/create-friend-request.api';
import { RequestUser } from 'src/common/types/utilTypes';
import { CreateFriendRequestDto } from '../friend-request/dto/create-friend-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { AcceptFriendRequestSwaggerAPIDecorators } from 'src/documents/swagger-api/friend-request/accept-friend-request.api';
import { FindFriendRequestDto } from '../friend-request/dto/find-friend-request.dto';
import { RemoveFriendSwaggerAPIDecorators } from 'src/documents/swagger-api/friends/remove-friend.api';
import { FindFriendDto } from '../friend/dto';
import { LoggedInGuard } from 'src/modules/auth';

@ApiTags('friend-system')
@Controller('friend-system')
@UseGuards(LoggedInGuard)
export class FriendSystemController {
  constructor(
    @Inject(IFriendRequestServiceString)
    private readonly friendRequestService: IFriendRequestService,
    @Inject(IFriendServiceString)
    private readonly friendService: IFriendService,
  ) {}

  @CreateFriendRequestSwaggerAPIDecorators()
  @Post('create-friend-request')
  public async createFriendRequest(
    @Req() req: RequestUser,
    @Body() createFriendRequestDto: CreateFriendRequestDto,
  ) {
    const hasBeenFriend = await this.friendService.isFriends(
      req.user._id,
      createFriendRequestDto.endUserId,
    );

    if (hasBeenFriend) {
      throw new BadRequestException('You already been friend with this user!');
    }

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

    await this.friendService.addFriend(req.user._id, friendRequest.leaderId);

    return friendRequest;
  }

  @RemoveFriendSwaggerAPIDecorators()
  @Put('remove-friend')
  public async removeFriend(
    @Req() req: RequestUser,
    @Body() findFriendDto: FindFriendDto,
  ) {
    const friendResult = await this.friendService.removeFriend(
      req.user._id,
      findFriendDto.endUserId,
    );

    // We don't know who was the sender so we have to remove it like this
    await this.friendRequestService.removeFriendRequest(
      req.user._id,
      findFriendDto.endUserId,
    );

    await this.friendRequestService.removeFriendRequest(
      findFriendDto.endUserId,
      req.user._id,
    );

    return friendResult || 'Nothing to remove friend here!';
  }
}
