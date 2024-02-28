import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';
import { RedisClient } from './client.redis';
import {
  userFriendsKey,
  userKey,
  usersHaveRegisteredKey,
  usersRecentlyLoginKey,
} from '../redisKeys/user.redis.keys';
import { Injectable } from '@nestjs/common';
import { userDeserialize } from '../redis-deserialize/user.deserialize';
import { ObjectToHashType } from 'src/common/types/redisTypes/ObjectToHash.redis.type';
import { ConvertObjectToHash } from 'src/common/utils/index';

@Injectable()
export class UserRedis {
  //HASH
  static async userConvertToRedisTypeThenHSET(email: string, endUser: EndUser) {
    const convertedUser = ConvertObjectToHash(endUser);
    return RedisClient.HSET(userKey(email), convertedUser);
  }

  static async findUserHGETALLThenDeserialize(
    email: string,
  ): Promise<EndUser | undefined> {
    const serializedEndUser = (await RedisClient.HGETALL(
      userKey(email),
    )) as unknown as null | ObjectToHashType<EndUser>;
    if (Object.keys(serializedEndUser).length > 0) {
      return userDeserialize(serializedEndUser);
    }
    return undefined;
  }

  //HYPERLOGLOG
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
