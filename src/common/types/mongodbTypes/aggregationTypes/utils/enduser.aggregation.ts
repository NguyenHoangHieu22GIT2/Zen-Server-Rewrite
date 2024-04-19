import { EndUserId } from 'src/common/types/utilTypes';

export type EndUserAggregation = {
  endUser: {
    _id: EndUserId;
    username: string;
    avatar: string;
  };
};
