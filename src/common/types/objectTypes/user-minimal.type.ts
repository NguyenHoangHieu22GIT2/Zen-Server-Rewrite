import { EndUser } from 'src/modules/enduser/entities/enduser.entity';

export type userMinimalType = Pick<EndUser, 'username' | 'avatar' | '_id'>;
