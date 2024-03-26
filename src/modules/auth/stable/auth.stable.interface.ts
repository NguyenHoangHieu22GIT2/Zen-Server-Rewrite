import { FilterQuery } from 'mongoose';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { EndUserId } from 'src/common/types/utilTypes';
import { EndUser } from 'src/modules/users/enduser';
import { LoginEndUserDto } from '../dto';

export const IAuthServiceStableString = 'IAuthServiceStable';

export interface IAuthServiceStable {
  create(accountInfo: Partial<EndUser>): Promise<DocumentMongodbType<EndUser>>;

  checkAccountIfAlreadyExist(
    filterQuery: FilterQuery<EndUser>,
  ): Promise<DocumentMongodbType<EndUser> | null>;

  checkRegisteredAccount(email: string, message: string): Promise<void>;

  checkAccountIfNotExistThenThrowError(params: {
    filterQuery: FilterQuery<EndUser>;
    message: string;
  }): Promise<DocumentMongodbType<EndUser>>;

  findAccountById(endUserId: EndUserId): Promise<DocumentMongodbType<EndUser>>;

  checkLoginAccount(
    loginEndUserDto: LoginEndUserDto,
  ): Promise<DocumentMongodbType<EndUser>>;
}
