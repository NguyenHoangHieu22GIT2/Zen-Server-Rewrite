import { PipelineStage } from 'mongoose';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { FriendAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/social/friend.aggregation';
import { EndUserId } from 'src/common/types/utilTypes';
import { Friend } from '../../entities/friend.entity';

export const IFriendStableServiceString = 'IFriendStableService';

export const IFriendStableServiceArgs = {};

export interface IFriendStableService {
  getFriendsAggregation(
    pipelineStage: PipelineStage[],
  ): Promise<FriendAggregation>;

  removeFriend(
    leaderId: EndUserId,
    endUserId: EndUserId,
  ): Promise<DocumentMongodbType<Friend>>;

  createFriend(
    leaderId: EndUserId,
    endUserId: EndUserId,
  ): Promise<DocumentMongodbType<Friend>>;
}
