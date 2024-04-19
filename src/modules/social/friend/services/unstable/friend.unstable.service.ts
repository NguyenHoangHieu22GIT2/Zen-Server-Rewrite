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

@Injectable()
@TryCatchDecorator()
export class FriendUnstableService implements IFriendUnstableService {
  constructor(
    @Inject(IFriendStableServiceString)
    private readonly friendService: IFriendStableService,
  ) {}

  async addFriend(
    endUserId: EndUserId,
    friendId: EndUserId,
  ): Promise<DocumentMongodbType<Friend>> {
    const newFriend = await this.friendService.createFriend(
      endUserId,
      friendId,
    );
    return newFriend;
  }

  async removeFriend(
    endUserId: EndUserId,
    friendId: EndUserId,
  ): Promise<DocumentMongodbType<Friend>> {
    const deletedFriend = await this.friendService.removeFriend(
      endUserId,
      friendId,
    );
    return deletedFriend;
  }

  async getFriendList(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<FriendAggregation> {
    const query = getFriendsAggregation(endUserId, queryLimitSkip);
    const friends = await this.friendService.getFriendsAggregation(query);
    return friends;
  }

  async findFriendsByName(
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

  getRecommendation(endUserId: EndUserId, queryLimitSkip: QueryLimitSkip): Promise<FriendAggregation> {
    const query = getFriendsAggregation(endUserId, queryLimitSkip);
  }
}
