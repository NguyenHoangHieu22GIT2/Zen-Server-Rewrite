import { ObjectToHashType } from 'src/common/types/redisTypes/ObjectToHash.redis.type';
import {
  convertToBooleanBasedOnStringMeaning,
  convertToObjectId,
} from 'src/common/utils/convertTypes';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';

export function userDeserialize(endUser: ObjectToHashType<EndUser>): EndUser {
  console.log('user deserialize', endUser);
  return {
    ...endUser,
    _id: convertToObjectId(endUser._id),
    isBanned: convertToBooleanBasedOnStringMeaning(endUser.isBanned),
    isOnline: convertToBooleanBasedOnStringMeaning(endUser.isOnline),
    restrict: JSON.parse(endUser.restrict),
    createdAt: new Date(parseInt(endUser.createdAt)),
    updatedAt: new Date(parseInt(endUser.updatedAt)),
    offlineTime: new Date(parseInt(endUser.offlineTime)),
  };
}
