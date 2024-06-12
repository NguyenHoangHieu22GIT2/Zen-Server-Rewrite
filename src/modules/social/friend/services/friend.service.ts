import { Inject, Injectable } from '@nestjs/common';
import { IFriendService } from './friend.interface';

import {
  DocumentMongodbType,
  FriendAggregation,
} from 'src/common/types/mongodbTypes';
import { EndUserId } from 'src/common/types/utilTypes';
import { Friend } from '../entities/friend.entity';
import { TryCatchDecorator } from 'src/cores/decorators';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { getFriendsAggregation } from 'src/cores/mongodb-aggregations';
import { nameOfCollections } from 'src/common/constants';
import { FriendRepository } from '../repository/friends.repository';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';

@Injectable()
@TryCatchDecorator()
export class FriendService implements IFriendService {
  constructor(
    @Inject(BaseRepositoryName)
    private readonly friendRepository: FriendRepository,
  ) {}

  public async isFriends(
    leaderId: EndUserId,
    friendId: EndUserId,
  ): Promise<boolean> {
    const result = await this.friendRepository.findOne({
      endUserId: leaderId,
      endUserIds: friendId,
    });

    if (!result) {
      return false;
    }
    return true;
  }

  //THIS IS HARD WITH MONGODB :(((
  //TODO: DO THIS LATER
  public async getRecommendation(
    endUserId: EndUserId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _queryLimitSkip: QueryLimitSkip,
  ): Promise<FriendAggregation[]> {
    const friends = await this.friendRepository.getFriendsAggregation([
      {
        $match: { endUserId: endUserId },
      },
      {
        $addFields: {
          filteredFriends: {
            $filter: {
              input: '$friends',
              as: 'friend',
              cond: { $not: { $in: ['$$friend', [1, 2, 3]] } },
            },
          },
        },
      },
      {
        $lookup: {
          from: nameOfCollections.EndUser,
          localField: 'friends',
          foreignField: '_id',
          as: 'FriendDetails',
        },
      },
    ]);
    return friends;
  }

  // public async searchStrangerFriends(
  //   endUserId: EndUserId,
  //   name: string,
  //   queryLimitSkip: QueryLimitSkip,
  // ): Promise<userMinimalType[]> {
  //   return 0 as any;
  // }

  public async addFriend(
    leaderId: EndUserId,
    friendId: EndUserId,
  ): Promise<DocumentMongodbType<Friend>> {
    const newFriend = await this.friendRepository.createFriend({
      leaderId,
      friendId,
    });
    return newFriend;
  }

  public async removeFriend(
    leaderId: EndUserId,
    friendId: EndUserId,
  ): Promise<DocumentMongodbType<Friend>> {
    const deletedFriend = await this.friendRepository.removeFriend({
      leaderId,
      friendId,
    });
    return deletedFriend[0];
  }

  public async getFriendList(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<FriendAggregation[]> {
    const query = getFriendsAggregation(endUserId, queryLimitSkip);
    const friends = await this.friendRepository.getFriendsAggregation(query);
    return friends;
  }

  public async findFriendsByName(
    endUserId: EndUserId,
    name: string,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<FriendAggregation[]> {
    const query = getFriendsAggregation(endUserId, queryLimitSkip, [
      { $match: { name: { $regex: name, $options: 'i' } } },
    ]);
    const friends = await this.friendRepository.getFriendsAggregation(query);
    return friends;
  }
}
