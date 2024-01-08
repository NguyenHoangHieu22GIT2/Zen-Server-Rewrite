import { EndUser } from 'src/modules/enduser/entities/enduser.entity';
import { RedisClient } from './client.redis';
import { ConvertObjectPropertiesTypeToString } from 'src/common/utils/convertObjectPropertiesTypeToString';

export class RedisUser {
  async hSetUser(email: string, user: EndUser) {
    const convertedUserForRedis =
      ConvertObjectPropertiesTypeToString<EndUser>(user);
    convertedUserForRedis.isBanned;
  }
}
