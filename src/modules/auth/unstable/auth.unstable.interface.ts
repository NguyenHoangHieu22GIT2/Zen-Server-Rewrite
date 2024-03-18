import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import {
  ActivateAccountDto,
  ChangeForgottonPasswordDto,
  ForgotPasswordDto,
  LoginEndUserDto,
  RegisterEndUserDto,
} from '../dto';
import { EndUser } from 'src/modules/users/enduser';

export const IAuthUnstableServiceString = 'IAuthUnstableService';

export interface IAuthUnstableService {
  registerAccount(
    registerEndUserDto: RegisterEndUserDto,
  ): Promise<DocumentMongodbType<EndUser>>;

  activateAccount(
    activateAccountDto: ActivateAccountDto,
  ): Promise<DocumentMongodbType<EndUser>>;

  loginAccount(loginEndUserDto: LoginEndUserDto): Promise<EndUser>;

  forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<DocumentMongodbType<EndUser>>;

  changeForgottonPassword(
    changeForgottonPasswordDto: ChangeForgottonPasswordDto,
    newPassword: string,
  ): Promise<DocumentMongodbType<EndUser>>;
}
