import { EndUserId, PostId } from 'src/common/types/utilTypes/Brand';

export type PostAggregation = {
  _id: PostId;
  title: string;
  body: string;
  views: number;
  user: {
    _id: EndUserId;
    username: string;
    avatar: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
