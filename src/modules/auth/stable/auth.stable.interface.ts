import { FilterQuery } from 'mongoose';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { EndUserId } from 'src/common/types/utilTypes';
import { EndUser } from 'src/modules/users/enduser';

export const IAuthServiceStableString = 'IAuthServiceStable';

export interface IAuthServiceStable {
  create(accountInfo: Partial<EndUser>): Promise<DocumentMongodbType<EndUser>>;

  findAccountFilterQuery(
    filterQuery: FilterQuery<EndUser>,
  ): Promise<DocumentMongodbType<EndUser>> | null;

  findAccountById(endUserId: EndUserId): Promise<DocumentMongodbType<EndUser>>;
}
