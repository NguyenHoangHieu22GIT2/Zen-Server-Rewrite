import { PostRedisType } from 'src/common/types/redisTypes/post.redis.type';
import { ConvertObjectPropertiesTypeToString } from 'src/common/utils/convertObjectPropertiesTypeToString';
import { Post } from 'src/modules/post/entities/post.entity';
import { RedisClient } from './client.redis';
import { likesKey, postKey, viewsKey } from '../redisKeys/post.redis.key';
import { Types } from 'mongoose';

export class PostRedis {
  static async postConvertToRedisTypeThenHSET(
    postId: Types.ObjectId,
    post: Post,
  ) {
    const convertedPostToRedisType =
      ConvertObjectPropertiesTypeToString<PostRedisType>(Post);
    return RedisClient.HSET(postKey(postId), convertedPostToRedisType);
  }

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
