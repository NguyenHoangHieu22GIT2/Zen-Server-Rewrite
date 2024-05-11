import { Inject, Injectable } from '@nestjs/common';
import { IFriendUnstableService } from './friend.unstable.interface';
import {
  IFriendStableService,
  IFriendStableServiceString,
} from '../stable/friend.stable.interface';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { EndUserId } from 'src/common/types/utilTypes';
import { Friend } from '../../entities/friend.entity';
import { TryCatchDecorator } from 'src/cores/decorators';
import { FriendAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/social/friend.aggregation';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { getFriendsAggregation } from 'src/cores/mongodb-aggregations';
import { nameOfCollections } from 'src/common/constants';

@Injectable()
@TryCatchDecorator()
export class FriendUnstableService implements IFriendUnstableService {
  constructor(
    @Inject(IFriendStableServiceString)
    private readonly friendService: IFriendStableService,
  ) {}

  //THIS IS HARD WITH MONGODB :(((
  //TODO: DO THIS LATER
  public async getRecommendation(
    endUserId: EndUserId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _queryLimitSkip: QueryLimitSkip,
  ): Promise<FriendAggregation> {
    const friends = await this.friendService.getFriendsAggregation([
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
    const newFriend = await this.friendService.createFriend({
      leaderId,
      friendId,
    });
    return newFriend;
  }

  public async removeFriend(
    leaderId: EndUserId,
    friendId: EndUserId,
  ): Promise<DocumentMongodbType<Friend>> {
    const deletedFriend = await this.friendService.removeFriend({
      leaderId,
      friendId,
    });
    return deletedFriend;
  }

  public async getFriendList(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<FriendAggregation> {
    const query = getFriendsAggregation(endUserId, queryLimitSkip);
    const friends = await this.friendService.getFriendsAggregation(query);
    return friends;
  }

  public async findFriendsByName(
    endUserId: EndUserId,
    name: string,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<FriendAggregation> {
    const query = getFriendsAggregation(endUserId, queryLimitSkip, [
      { $match: { name: { $regex: name, $options: 'i' } } },
    ]);
    const friends = await this.friendService.getFriendsAggregation(query);
    return friends;
  }
}
