import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';
import { RedisClient } from './client.redis';
import {
  userFriendsKey,
  userKey,
  usersHaveRegisteredKey,
  usersRecentlyLoginKey,
} from '../redisKeys/user.redis.keys';
import { ConvertObjectToHash } from 'src/common/utils/convertObjectToHash';
import { Injectable } from '@nestjs/common';
import { userDeserialize } from '../redis-deserialize/user.deserialize';
import { ObjectToHashType } from 'src/common/types/redisTypes/ObjectToHash.redis.type';

@Injectable()
export class UserRedis {
  //HASH
  static async userConvertToRedisTypeThenHSET(email: string, user: EndUser) {
    const convertedUser = ConvertObjectToHash<EndUser>(user);
    return RedisClient.HSET(userKey(email), convertedUser);
  }

  static async findUserHGETALLAndDeserialize(email: string) {
    const serializedUser = (await RedisClient.HGETALL(
      userKey(email),
    )) as unknown as ObjectToHashType<EndUser>;
    const deserializedUser = userDeserialize(serializedUser);
    return deserializedUser;
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
