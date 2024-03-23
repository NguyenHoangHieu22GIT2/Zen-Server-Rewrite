import { Injectable } from '@nestjs/common';
import { PostAggregation } from 'src/common/types/mongodbTypes/aggregationTypes/feeds/feeds';
import { EndUserId, PostId } from 'src/common/types/utilTypes';
import { ExecuteIfRedisAvailableDecorator } from 'src/cores/decorators/ExecuteRedis.decorator';
import { PostRedis } from 'src/cores/redis/post.redis';
import { Post } from '../../entities';

@Injectable()
@ExecuteIfRedisAvailableDecorator()
export class PostRedisStableService {
  async savePosts(posts: PostAggregation[]) {
    Promise.all([
      posts.map((post) => {
        return PostRedis.postConvertToRedisTypeThenHSET(post._id, post);
      }),
    ]);
  }

  async increaseView(endUserId: EndUserId, posts: PostAggregation[]) {
    Promise.all([
      posts.map((post) => {
        return PostRedis.viewsPFADD(post._id, endUserId);
      }),
    ]);
  }

  async getPost(postId: PostId): Promise<Post> {
    const result = await PostRedis.postHGETALL(postId);
    return result;
  }
}
