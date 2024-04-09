import { ObjectToHashType } from 'src/common/types/redisTypes/ObjectToHash.redis.type';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils/';
import { Post } from 'src/modules/feeds/post';

export function postDeserialize(post: ObjectToHashType<Post>): Post {
  return {
    ...post,
    _id: checkToConvertToMongoIdOrThrowError({
      id: post._id,
      returnError: true,
    }),
    createdAt: new Date(parseInt(post.createdAt)),
    endUserId: checkToConvertToMongoIdOrThrowError({
      id: post.endUserId,
      returnError: true,
    }),
    updatedAt: new Date(parseInt(post.updatedAt)),
    views: parseInt(post.views),
    images: JSON.parse(post.images) as string[],
    groupId: checkToConvertToMongoIdOrThrowError({
      id: post.groupId,
      returnError: false,
    }),
  };
}
