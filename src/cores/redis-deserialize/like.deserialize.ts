import { ObjectToHashType } from 'src/common/types/redisTypes/ObjectToHash.redis.type';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils/';
import { Like } from 'src/modules/feeds/like';

export function likeDeserialize(like: ObjectToHashType<Like>): Like {
  return {
    ...like,
    _id: checkToConvertToMongoIdOrThrowError({
      id: like._id,
      returnError: true,
    }),
    endUserId: checkToConvertToMongoIdOrThrowError({
      id: like.endUserId,
      returnError: true,
    }),
    postId: checkToConvertToMongoIdOrThrowError({
      id: like.postId,
      returnError: true,
    }),
  };
}
