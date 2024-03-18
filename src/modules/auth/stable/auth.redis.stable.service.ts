import { ConflictException, Injectable } from '@nestjs/common';
import { ExecuteIfRedisAvailableDecorator } from 'src/cores/decorators/ExecuteRedis.decorator';
import { UserRedis } from 'src/cores/redis/user.redis';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';

@Injectable()
@ExecuteIfRedisAvailableDecorator()
export class AuthRedisStableService {
  async userConvertToRedisTypeThenHSET(user: EndUser) {
    UserRedis.userConvertToRedisTypeThenHSET(user.email, user);
  }

  async usersHaveRegisteredPFADD(email: string) {
    UserRedis.usersHaveRegisteredPFADD(email);
  }

  async checkLoginAcount(email: string) {
    UserRedis.findUserHGETALLThenDeserialize(email);
  }

  async checkRegisteredAccount(email: string, message: string) {
    const isAccountExist = await UserRedis.usersHaveRegisteredPFADD(email);
    if (!isAccountExist) {
      throw new ConflictException(message);
    }
  }
}
