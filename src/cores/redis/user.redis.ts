import { EndUser } from 'src/modules/enduser/entities/enduser.entity';
import { RedisClient } from './client.redis';
import { ConvertObjectPropertiesTypeToString } from 'src/common/utils/convertObjectPropertiesTypeToString';
import { UserRedisType } from 'src/common/types/redisTypes/user.redis.type';
import {
  userFriendsKey,
  userKey,
  usersHaveRegisteredKey,
  usersRecentlyLoginKey,
} from '../redisKeys/user.redis.keys';

export class UserRedis {
  static async userConvertToRedisTypeThenHSET(email: string, user: EndUser) {
    const convertedUserForRedis =
      ConvertObjectPropertiesTypeToString<UserRedisType>(user);
    convertedUserForRedis.email;
    return RedisClient.HSET(userKey(email), convertedUserForRedis);
  }

  static async usersRecentlyLoginPFADD(email: string) {
    return RedisClient.PFADD(usersRecentlyLoginKey(), email);
  }

  static async usersRecentlyLoginPFCOUNT() {
    return RedisClient.PFCOUNT(usersRecentlyLoginKey());
  }

  static async usersHaveRegisteredPFADD(email: string) {
    return RedisClient.PFADD(usersHaveRegisteredKey(), email);
  }

  static async usersHaveRegisteredPFCOUNT() {
    return RedisClient.PFCOUNT(usersHaveRegisteredKey());
  }

  static async userFriendsPFADD(
    emailOfUserThatContains: string,
    emailOfUserThatIsPushedIn: string,
  ) {
    return RedisClient.PFADD(
      userFriendsKey(emailOfUserThatContains),
      emailOfUserThatIsPushedIn,
    );
  }

  static async userFriendsPFCOUNT(email: string) {
    return RedisClient.PFCOUNT(userFriendsKey(email));
  }
}
