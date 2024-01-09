import { EndUser } from 'src/modules/enduser/entities/enduser.entity';

export type UserRedisType = {
  [K in keyof EndUser]: string;
};
