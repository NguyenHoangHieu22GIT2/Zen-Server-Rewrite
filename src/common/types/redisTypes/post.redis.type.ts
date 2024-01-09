import { Post } from 'src/modules/post/entities/post.entity';

export type PostRedisType = {
  [K in keyof Post]: string;
};
