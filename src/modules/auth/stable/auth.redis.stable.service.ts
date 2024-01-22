import { ConflictException, Injectable } from '@nestjs/common';
import { RedisClient } from 'src/cores/redis/client.redis';
import { UserRedis } from 'src/cores/redis/user.redis';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';

@Injectable()
export class AuthRedisStableService {
  async userConvertToRedisTypeThenHSET(user: EndUser) {
    if (RedisClient.isOpen) {
      await UserRedis.userConvertToRedisTypeThenHSET(user.email, user);
    }
  }

  async usersHaveRegisteredPFADD(email: string) {
    if (RedisClient.isOpen) {
      await UserRedis.usersHaveRegisteredPFADD(email);
    }
  }

  async checkLoginAcount(email: string) {
    if (RedisClient.isOpen) {
      let existedAccount =
        await UserRedis.findUserHGETALLThenDeserialize(email);
      return existedAccount;
    }
  }

  async checkRegisteredAccount(email: string, message: string) {
    if (RedisClient.isOpen) {
      const isAccountExist = await UserRedis.usersHaveRegisteredPFADD(email);
      if (!isAccountExist) {
        throw new ConflictException(message);
      }
    }
  }
}
