import { ObjectToHashType } from 'src/common/types/redisTypes/ObjectToHash.redis.type';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';

export function userSerialize(endUser: EndUser): ObjectToHashType<EndUser> {
  return {
    _id: endUser._id.toString(),
    username: endUser.username,
    password: endUser.password,
    email: endUser.email,
    gender: endUser.gender,
    avatar: endUser.avatar,
    isOnline: endUser.isOnline.toString(),
    isBanned: endUser.isBanned.toString(),
    offlineTime: endUser.offlineTime.getTime().toString(),
    createdAt: endUser.createdAt.getTime().toString(),
    updatedAt: endUser.updatedAt.getTime().toString(),
    restrict: JSON.stringify(endUser.restrict),
    modifyToken: endUser.modifyToken,
    activationToken: endUser.activationToken,
  };
}
