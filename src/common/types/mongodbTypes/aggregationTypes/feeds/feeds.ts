import { EndUserId } from 'src/common/types/utilTypes/Brand';
import { Comment } from 'src/modules/feeds/comment';
import { Like } from 'src/modules/feeds/like';
import { Post } from 'src/modules/feeds/post';

export type PostAggregation = {
  endUser: {
    _id: EndUserId;
    username: string;
    avatar: string;
  };
} & Omit<Post, 'endUserId'>;

export type LikeAggregation = {
  endUser: {
    _id: EndUserId;
    username: string;
    avatar: string;
  };
} & Omit<Like, 'endUserId'>;

export type CommentAggregation = {
  endUser: {
    _id: EndUserId;
    username: string;
    avatar: string;
  };
} & Omit<Comment, 'endUserId'>;
