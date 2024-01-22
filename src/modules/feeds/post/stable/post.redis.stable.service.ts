import { Injectable } from '@nestjs/common';
import { PostAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/feeds/post.aggregation';
import { PostRedis } from 'src/cores/redis/post.redis';

@Injectable()
export class PostRedisStableService {
  async savePosts(posts: PostAggregation[]) {
    await Promise.all([
      posts.map((post) => {
        return PostRedis.postConvertToRedisTypeThenHSET(post._id, post);
      }),
    ]);
  }
}
