import { Injectable } from '@nestjs/common';
import { ExecuteIfRedisAvailableDecorator } from 'src/cores/decorators/ExecuteRedis.decorator';
import { UserRedis } from 'src/cores/redis/user.redis';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';

@Injectable()
@ExecuteIfRedisAvailableDecorator()
export class AuthRedisService {
  async userConvertToRedisTypeThenHSET(user: EndUser) {
    UserRedis.userConvertToRedisTypeThenHSET(user.email, user);
  }

  async addUserRegisteredToRedis(email: string) {
    await UserRedis.usersHaveRegisteredSADD(email);
  }

  async isEmailAlreadyRegistered(email: string) {
    return UserRedis.usersHaveRegisteredSISMEMBER(email);
  }

  async checkLoginAcount(email: string) {
    UserRedis.findUserHGETALLThenDeserialize(email);
  }
}
