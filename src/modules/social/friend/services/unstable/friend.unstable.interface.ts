import { QueryLimitSkip } from 'src/cores/global-dtos';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { EndUserId } from 'src/common/types/utilTypes';
import { FriendAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/social/friend.aggregation';
import { Friend } from '../../entities/friend.entity';

export const IFriendUnstableServiceString = 'IFriendUnstableService';

export interface IFriendUnstableService {
  getRecommendation(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<FriendAggregation>;

  getFriendList(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<FriendAggregation>;

  // searchStrangerFriends(
  //   endUserId: EndUserId,
  //   name: string,
  //   queryLimitSkip: QueryLimitSkip,
  // ): Promise<userMinimalType[]>;

  findFriendsByName(
    endUserId: EndUserId,
    name: string,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<FriendAggregation>;

  removeFriend(
    leaderId: EndUserId,
    friendId: EndUserId,
  ): Promise<DocumentMongodbType<Friend>>;

  addFriend(
    leaderId: EndUserId,
    friendId: EndUserId,
  ): Promise<DocumentMongodbType<Friend>>;
}
