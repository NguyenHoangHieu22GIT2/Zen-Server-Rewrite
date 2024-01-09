import { Post } from 'src/modules/post/entities/post.entity';
import { RedisClient } from './client.redis';
import { likesKey, postKey, viewsKey } from '../redisKeys/post.redis.keys';
import { Types } from 'mongoose';
import { ConvertObjectToHash } from 'src/common/utils/convertObjectToHash';

export class PostRedis {
  //HASH
  static async postConvertToRedisTypeThenHSET(
    postId: Types.ObjectId,
    post: Post,
  ) {
    const convertedPost = ConvertObjectToHash<Post>(post);
    return RedisClient.HSET(postKey(postId), convertedPost);
  }

  //HYPERLOGLOG
  static async viewsPFADD(postId: Types.ObjectId, userId: Types.ObjectId) {
    return RedisClient.PFADD(viewsKey(postId), userId.toString());
  }

  static async viewsPFCOUNT(postId: Types.ObjectId) {
    return RedisClient.PFCOUNT(viewsKey(postId));
  }

  static async likesPFADD(postId: Types.ObjectId, userId: Types.ObjectId) {
    return RedisClient.PFADD(likesKey(postId), userId.toString());
  }

  static async likesPFCOUNT(postId: Types.ObjectId) {
    return RedisClient.PFCOUNT(likesKey(postId));
  }
}
