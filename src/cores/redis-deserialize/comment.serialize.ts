import { ObjectToHashType } from 'src/common/types/redisTypes/ObjectToHash.redis.type';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils/';
import { Comment } from 'src/modules/feeds/comment';

export function commentDeserialize(
  comment: ObjectToHashType<Comment>,
): Comment {
  return {
    ...comment,
    _id: checkToConvertToMongoIdOrThrowError({
      id: comment._id,
      returnError: true,
    }),
    createdAt: new Date(parseInt(comment.createdAt)),
    endUserId: checkToConvertToMongoIdOrThrowError({
      id: comment.endUserId,
      returnError: true,
    }),
    parentCommentId: checkToConvertToMongoIdOrThrowError({
      id: comment.parentCommentId,
      returnError: true,
    }),
    postId: checkToConvertToMongoIdOrThrowError({
      id: comment.postId,
      returnError: true,
    }),
    updatedAt: new Date(parseInt(comment.updatedAt)),
  };
}
