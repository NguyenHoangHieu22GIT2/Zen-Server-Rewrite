import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FriendRequestRepository } from './repository/friend-request.repository';
import { EndUserId, FriendRequestId } from 'src/common/types/utilTypes';
import { IFriendRequestService } from './friend-request.interface.service';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { emptyObj, isIdsEqual } from 'src/common/utils';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { FriendRequest } from './entities/friend-request.entity';

@Injectable()
export class FriendRequestService implements IFriendRequestService {
  constructor(
    @Inject(BaseRepositoryName)
    private readonly friendRequestRepository: FriendRequestRepository,
  ) {}

  public async createFriendRequest(leaderId: EndUserId, friendId: EndUserId) {
    const existed = await this.friendRequestRepository.findOne({
      leaderId,
      friendId,
    });

    if (existed) {
      throw new BadRequestException('You already sent a friend request!');
    }

    const result = await this.friendRequestRepository.create({
      leaderId,
      friendId,
      state: 'pending',
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

  private doesFriendRequestExist(
    result: DocumentMongodbType<FriendRequest> | unknown,
  ) {
    if (!result) {
      throw new BadRequestException('No friend request found!');
    }
  }

  public async acceptFriendRequest(
    endUserId: EndUserId,
    friendRequestId: FriendRequestId,
  ) {
    const result = await this.friendRequestRepository.findById(friendRequestId);

    this.doesFriendRequestExist(result);

    if (!isIdsEqual(result.friendId, endUserId)) {
      throw new UnauthorizedException(
        'You are not allowed to accept this friend request!',
      );
    }
    if (result.state === 'accepted') {
      throw new BadRequestException(
        'You already accepted this friend request!',
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

    this.doesFriendRequestExist(result);

    if (!isIdsEqual(result.friendId, endUserId)) {
      throw new UnauthorizedException(
        'You are not allowed to decline this friend request!',
      );
    }

    await result.deleteOne();

    return result;
  }
}
