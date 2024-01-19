import { ObjectToHashType } from 'src/common/types/redisTypes/ObjectToHash.redis.type';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';

export function userSerialize(endUser: EndUser): ObjectToHashType<EndUser> {
  console.log(endUser.offlineTime.getTime().toString());
  return {
    ...endUser,
    _id: endUser._id.toString(),
    isOnline: endUser.isOnline.toString(),
    isBanned: endUser.isBanned.toString(),
    offlineTime: endUser.offlineTime.getTime().toString(),
    createdAt: endUser.createdAt.getTime().toString(),
    updatedAt: endUser.updatedAt.getTime().toString(),
    restrict: JSON.stringify(endUser.restrict),
    expireTimeForModifyToken: endUser.expireTimeForModifyToken
      .getTime()
      .toString(),
  };
}
