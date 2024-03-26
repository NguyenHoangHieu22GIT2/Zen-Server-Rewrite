import { EndUserId } from 'src/common/types/utilTypes';

export type endUserAggregation = {
  endUser: {
    _id: EndUserId;
    username: string;
    avatar: string;
  };
};
