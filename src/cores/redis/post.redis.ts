import { RedisClient } from './client.redis';
import {
  likesKey,
  postKey,
  postSortedSetKey,
  viewsKey,
} from '../redisKeys/post.redis.keys';
import { ConvertObjectToHash } from 'src/common/utils/';
import { EndUserId, PostId } from 'src/common/types/utilTypes';
import { postDeserialize } from '../redis-deserialize/post.deserialize';
import { ObjectToHashType } from 'src/common/types/redisTypes';
import { Post } from 'src/modules/feeds/post';
import { isRedisResultEmpty } from 'src/common/utils/';
import { PopulateEndUserAggregation } from 'src/common/types/mongodbTypes';

export class PostRedis {
  //HASH
  static async postConvertToRedisTypeThenHSET(
    postId: PostId,
    post: PopulateEndUserAggregation<Post>,
  ) {
    const convertedPost = ConvertObjectToHash(post);
    return RedisClient.HSET(postKey(postId), convertedPost);
  }

  static async postHGETALL(postId: PostId) {
    const post = (await RedisClient.HGETALL(
      postKey(postId),
    )) as ObjectToHashType<Post>;
    if (isRedisResultEmpty(post)) {
      return null;
    }
    return postDeserialize(post);
  }

  //HYPERLOGLOG
  static async viewsPFADD(postId: PostId, userId: EndUserId) {
    return RedisClient.PFADD(viewsKey(postId), userId.toString());
  }

  static async viewsPFCOUNT(postId: PostId) {
    return RedisClient.PFCOUNT(viewsKey(postId));
  }

  static async likesPFADD(postId: PostId, userId: PostId) {
    return RedisClient.PFADD(likesKey(postId), userId.toString());
  }

  static async likesPFCOUNT(postId: PostId) {
    return RedisClient.PFCOUNT(likesKey(postId));
  }

  // SORTED SET

  static async postZADD(post: PopulateEndUserAggregation<Post>) {
    return RedisClient.ZADD(postSortedSetKey(post.endUser._id), {
      value: post._id.toString(),
      score: post.createdAt.getTime(),
    });
  }
}
