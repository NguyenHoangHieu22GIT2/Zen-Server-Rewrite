import { userMinimalType } from '../objectTypes';
import { EndUserId } from '../utilTypes';

export type PopulateEndUserAggregation<T> = {
  endUser: {
    _id: EndUserId;
    username: string;
    avatar: string;
  };
} & Omit<T, 'endUserId'>;

export type FriendAggregation = {
  endUserId: EndUserId;
  friends: userMinimalType[];
};

export * from './DocumentMongodbType';
