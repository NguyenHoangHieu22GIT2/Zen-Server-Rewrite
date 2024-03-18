import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {
  ActivateAccountDto,
  ChangeForgottonPasswordDto,
  ForgotPasswordDto,
  LoginEndUserDto,
  RegisterEndUserDto,
} from '../dto/';
import { EndUser } from 'src/modules/users/enduser/';
import { v4 } from 'uuid';
import {
  isUndefined,
  checkingToConvertToObjectFromDocument,
} from 'src/common/utils/';
import {
  IAuthServiceStable,
  IAuthServiceStableString,
} from '../stable/auth.stable.interface';
import { TryCatchDecorator } from 'src/cores/decorators';
import { IAuthUnstableService } from './auth.unstable.interface';

@Injectable()
@TryCatchDecorator()
export class AuthServiceUnstable implements IAuthUnstableService {
  constructor(
    @Inject(IAuthServiceStableString)
    private readonly authServiceStable: IAuthServiceStable,
  ) {}

  async registerAccount(registerEndUserDto: RegisterEndUserDto) {
    const hashedPassword = await bcrypt.hash(
      registerEndUserDto.password,
      +process.env.BCRYPT_HASH,
    );

    const accountInfo: Partial<EndUser> = {
      ...registerEndUserDto,
      password: hashedPassword,
      activationToken: v4(),
    };
    const createdAccount = await this.authServiceStable.create(accountInfo);

    return createdAccount;
  }

  async activateAccount({ activationToken }: ActivateAccountDto) {
    const inactivateAccount =
      await this.authServiceStable.checkAccountIfNotExistThenThrowError({
        filterQuery: { activationToken },
        message: 'We found no account with this token!',
      });

    if (isUndefined(inactivateAccount)) {
      throw new UnauthorizedException("You don't have access to this action");
    }
    // Set To undefined so the property in mongodb document remove the field entirely
    inactivateAccount.activationToken = undefined;
    const activatedAccount = inactivateAccount;

    return activatedAccount.save();
  }

  async loginAccount(loginEndUserDto: LoginEndUserDto) {
    const existedAccount =
      await this.authServiceStable.checkLoginAccount(loginEndUserDto);
    if (existedAccount == undefined || existedAccount.activationToken) {
      throw new UnauthorizedException(
        'This account has not been activated, please go to your email account to activate it',
      );
    }

    const isMatchedPassword = await bcrypt.compare(
      loginEndUserDto.password,
      existedAccount.password,
    );

    if (!isMatchedPassword) {
      throw new UnauthorizedException('Invalid Password');
    }

    const convertedExistedAccount =
      checkingToConvertToObjectFromDocument(existedAccount);

    return convertedExistedAccount;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user =
      await this.authServiceStable.checkAccountIfNotExistThenThrowError({
        filterQuery: { email: forgotPasswordDto.email },
        message: 'Check your Input carefully please!',
      });

    if (isUndefined(user)) {
      throw new UnauthorizedException("You don't have the access");
    }
    user.modifyToken = v4();

    const savedUser = await user.save();

    return savedUser;
  }

  async changeForgottonPassword(
    changeForgottonPasswordDto: ChangeForgottonPasswordDto,
    newPassword: string,
  ) {
    const existedAccount =
      await this.authServiceStable.checkAccountIfNotExistThenThrowError({
        filterQuery: { modifyToken: changeForgottonPasswordDto.modifyToken },
        message: 'This is not the right place for you to be. Get out.',
      });

    existedAccount.modifyToken = undefined;
    existedAccount.password = await bcrypt.hash(
      newPassword,
      +process.env.BCRYPT_HASH,
    );

    return existedAccount.save();
  }
}
