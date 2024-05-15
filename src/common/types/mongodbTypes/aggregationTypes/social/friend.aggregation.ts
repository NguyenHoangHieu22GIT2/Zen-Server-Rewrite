import { userMinimalType } from 'src/common/types/objectTypes';
import { EndUserId } from 'src/common/types/utilTypes';

export type FriendAggregation = {
  endUserId: EndUserId;
  friends: userMinimalType[];
};
