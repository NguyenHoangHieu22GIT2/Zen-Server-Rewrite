import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FriendRequestRepository } from './repository/friend-request.repository';
import { EndUserId, FriendRequestId } from 'src/common/types/utilTypes';
import { IFriendRequestService } from './friend-request.interface.service';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { emptyObj, isIdsEqual } from 'src/common/utils';

@Injectable()
export class FriendRequestService implements IFriendRequestService {
  constructor(
    private readonly friendRequestRepository: FriendRequestRepository,
  ) {}

  public async createFriendRequest(leaderId: EndUserId, friendId: EndUserId) {
    const result = await this.friendRequestRepository.create({
      leaderId,
      friendId,
    });
    return result;
  }

  public async getFriendRequests(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ) {
    const result = await this.friendRequestRepository.find(
      {
        leaderId: endUserId,
      },
      emptyObj,
      { ...queryLimitSkip },
    );
    return result;
  }

  public async acceptFriendRequest(
    endUserId: EndUserId,
    friendRequestId: FriendRequestId,
  ) {
    const result = await this.friendRequestRepository.findById(friendRequestId);

    if (!isIdsEqual(result.leaderId, endUserId)) {
      throw new UnauthorizedException(
        'You are not allowed to accept this friend request!',
      );
    }

    result.state = 'accepted';

    return result.save();
  }

  public async declineFriendRequest(
    endUserId: EndUserId,
    friendRequestId: FriendRequestId,
  ) {
    const result = await this.friendRequestRepository.findById(friendRequestId);

    if (!isIdsEqual(result.leaderId, endUserId)) {
      throw new UnauthorizedException(
        'You are not allowed to decline this friend request!',
      );
    }

    result.deleteOne();

    return result;
  }
}
