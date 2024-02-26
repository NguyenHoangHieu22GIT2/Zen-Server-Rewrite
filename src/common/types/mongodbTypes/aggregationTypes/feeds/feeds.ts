import { EndUserId } from 'src/common/types/utilTypes/Brand';
import { Post } from 'src/modules/feeds/post';

export type PostAggregation = {
  endUser: {
    _id: EndUserId;
    username: string;
    avatar: string;
  };
} & Omit<Post, 'endUserId'>;
