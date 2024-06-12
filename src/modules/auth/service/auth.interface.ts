import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import {
  ActivateAccountDto,
  ChangeForgottonPasswordDto,
  ForgotPasswordDto,
  LoginEndUserDto,
  RegisterEndUserDto,
} from '../dto';
import { EndUser } from 'src/modules/users/enduser';
import { FilterQuery } from 'mongoose';

export const IAuthServiceString = 'IAuthService';

export interface IAuthService {
  registerAccount(
    registerEndUserDto: RegisterEndUserDto,
  ): Promise<DocumentMongodbType<EndUser>>;

  findAccountFilterQuery(
    filterQuery: FilterQuery<EndUser>,
  ): Promise<DocumentMongodbType<EndUser> | null>;

  activateAccount(
    activateAccountDto: ActivateAccountDto,
  ): Promise<DocumentMongodbType<EndUser>>;

  loginAccount(loginEndUserDto: LoginEndUserDto): Promise<EndUser>;

  forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<DocumentMongodbType<EndUser>>;

  changeForgottonPassword(
    changeForgottonPasswordDto: ChangeForgottonPasswordDto,
  ): Promise<DocumentMongodbType<EndUser>>;
}
