import { Types } from 'mongoose';
import { ObjectToHashType } from 'src/common/types/redisTypes/ObjectToHash.redis.type';
import {
  convertToBooleanBasedOnStringMeaning,
  convertToObjectId,
} from 'src/common/utils/convertTypes';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';

export function userDeserialize(endUser: ObjectToHashType<EndUser>): EndUser {
  return {
    _id: convertToObjectId(endUser._id),
    username: endUser.username,
    email: endUser.email,
    avatar: endUser.avatar,
    gender: endUser.gender,
    isOnline: convertToBooleanBasedOnStringMeaning(endUser.isOnline),
    password: endUser.password,
    isBanned: convertToBooleanBasedOnStringMeaning(endUser.isBanned),
    restrict: JSON.parse(endUser.restrict),
    createdAt: new Date(endUser.createdAt),
    updatedAt: new Date(endUser.updatedAt),
    modifyToken: endUser.modifyToken,
    activationToken: endUser.activationToken,
    offlineTime: new Date(endUser.offlineTime),
  };
}
