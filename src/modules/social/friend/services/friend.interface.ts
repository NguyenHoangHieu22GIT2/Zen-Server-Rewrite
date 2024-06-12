import { QueryLimitSkip } from 'src/cores/global-dtos';
import {
  DocumentMongodbType,
  FriendAggregation,
} from 'src/common/types/mongodbTypes';
import { EndUserId } from 'src/common/types/utilTypes';
import { Friend } from '../entities/friend.entity';

export const IFriendServiceString = 'IFriendService';

export interface IFriendService {
  getRecommendation(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<FriendAggregation[]>;

  getFriendList(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<FriendAggregation[]>;

  isFriends(leaderId: EndUserId, friendId: EndUserId): Promise<boolean>;

  // searchStrangerFriends(
  //   endUserId: EndUserId,
  //   name: string,
  //   queryLimitSkip: QueryLimitSkip,
  // ): Promise<userMinimalType[]>;

  findFriendsByName(
    endUserId: EndUserId,
    name: string,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<FriendAggregation[]>;

  removeFriend(
    leaderId: EndUserId,
    friendId: EndUserId,
  ): Promise<DocumentMongodbType<Friend>>;

  addFriend(
    leaderId: EndUserId,
    friendId: EndUserId,
  ): Promise<DocumentMongodbType<Friend>>;
}
