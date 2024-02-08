import { ConflictException, Injectable } from '@nestjs/common';
import { ExecuteIfRedisAvailable } from 'src/common/utils';
import { UserRedis } from 'src/cores/redis/user.redis';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';

@Injectable()
export class AuthRedisStableService {
  async userConvertToRedisTypeThenHSET(user: EndUser) {
    return ExecuteIfRedisAvailable(() =>
      UserRedis.userConvertToRedisTypeThenHSET(user.email, user),
    );
  }

  async usersHaveRegisteredPFADD(email: string) {
    return ExecuteIfRedisAvailable(() =>
      UserRedis.usersHaveRegisteredPFADD(email),
    );
  }

  async checkLoginAcount(email: string) {
    return ExecuteIfRedisAvailable(async () =>
      UserRedis.findUserHGETALLThenDeserialize(email),
    );
  }

  async checkRegisteredAccount(email: string, message: string) {
    return ExecuteIfRedisAvailable(async () => {
      const isAccountExist = await UserRedis.usersHaveRegisteredPFADD(email);
      if (!isAccountExist) {
        throw new ConflictException(message);
      }
    });
  }
}
