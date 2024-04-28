import { PipelineStage } from 'mongoose';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { FriendAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/social/friend.aggregation';
import { EndUserId } from 'src/common/types/utilTypes';
import { Friend } from '../../entities/friend.entity';

export const IFriendStableServiceString = 'IFriendStableService';

export type IFriendStableServiceArgs = {
  isFriend: {
    leaderId: EndUserId;
    endUserId: EndUserId;
  };
  getFriendsAggregation: PipelineStage[];
  removeFriend: {
    leaderId: EndUserId;
    endUserId: EndUserId;
  };
  createFriend: {
    leaderId: EndUserId;
    endUserId: EndUserId;
  };
};

export interface IFriendStableService {
  // private isFriend(args: IFriendStableServiceArgs['isFriend']): Promise<boolean>;

  getFriendsAggregation(
    pipelineStage: IFriendStableServiceArgs['getFriendsAggregation'],
  ): Promise<FriendAggregation>;

  removeFriend(
    args: IFriendStableServiceArgs['removeFriend'],
  ): Promise<DocumentMongodbType<Friend>>;

  createFriend(
    args: IFriendStableServiceArgs['createFriend'],
  ): Promise<DocumentMongodbType<Friend>>;
}
