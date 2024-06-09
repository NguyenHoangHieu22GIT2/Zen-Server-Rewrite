import {
  DocumentMongodbType,
  PopulateEndUserAggregation,
} from 'src/common/types/mongodbTypes';
import { EndUserId, FriendRequestId } from 'src/common/types/utilTypes';
import { FriendRequest } from '../entities/friend-request.entity';
import { QueryLimitSkip } from 'src/cores/global-dtos';

export const IFriendRequestServiceString = 'IFriendRequestService ';

export interface IFriendRequestService<
  T extends FriendRequest = FriendRequest,
> {
  createFriendRequest(
    leaderId: EndUserId,
    friendId: EndUserId,
  ): Promise<DocumentMongodbType<T>>;

  removeFriendRequest(
    leaderId: EndUserId,
    friendId: EndUserId,
  ): Promise<DocumentMongodbType<T>>;

  acceptFriendRequest(
    endUserId: EndUserId,
    friendRequestId: FriendRequestId,
  ): Promise<DocumentMongodbType<T>>;

  declineFriendRequest(
    endUserId: EndUserId,
    friendRequestId: FriendRequestId,
  ): Promise<DocumentMongodbType<T>>;

  getFriendRequests(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<PopulateEndUserAggregation<FriendRequest>[]>;
}
