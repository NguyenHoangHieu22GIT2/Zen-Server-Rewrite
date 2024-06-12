import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {
  ActivateAccountDto,
  ChangeForgottonPasswordDto,
  ForgotPasswordDto,
  LoginEndUserDto,
  RegisterEndUserDto,
} from '../dto';
import { EndUser } from 'src/modules/users/enduser/';
import { v4 } from 'uuid';
import { checkingToConvertToObjectFromDocument } from 'src/common/utils/';

import { FilterQuery } from 'mongoose';
import { isNullOrUndefined } from 'src/common/utils/';
import { AuthRepository } from '../repository/auth.repository';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { IAuthService } from './auth.interface';
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(BaseRepositoryName)
    private readonly authRepsitory: AuthRepository,
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
    const createdAccount = await this.authRepsitory.create(accountInfo);

    return createdAccount;
  }

  async findAccountFilterQuery(filterQuery: FilterQuery<EndUser>) {
    return this.authRepsitory.findOne(filterQuery);
  }

  async activateAccount({ activationToken }: ActivateAccountDto) {
    const inactivateAccount = await this.authRepsitory.findOne({
      activationToken,
    });

    if (isNullOrUndefined(inactivateAccount)) {
      throw new UnauthorizedException('We found no account with this token!');
    }

    // Set To undefined so the property in mongodb document remove the field entirely
    inactivateAccount.activationToken = undefined;
    const activatedAccount = inactivateAccount;

    return activatedAccount.save();
  }

  async loginAccount(loginEndUserDto: LoginEndUserDto) {
    const existedAccount = await this.authRepsitory.findOne({
      email: loginEndUserDto.email,
    });
    if (isNullOrUndefined(existedAccount)) {
      throw new UnauthorizedException('This account does not exist');
    }

    if (existedAccount.activationToken) {
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
    const user = await this.authRepsitory.findOne({
      email: forgotPasswordDto.email,
    });

    if (isNullOrUndefined(user)) {
      throw new UnauthorizedException("You don't have the access");
    }
    user.modifyToken = v4();

    const savedUser = await user.save();

    return savedUser;
  }

  async changeForgottonPassword(
    changeForgottonPasswordDto: ChangeForgottonPasswordDto,
  ) {
    const existedAccount = await this.authRepsitory.findOne({
      modifyToken: changeForgottonPasswordDto.modifyToken,
    });

    if (!existedAccount) {
      throw new UnauthorizedException("You don't have access to this!");
    }
    existedAccount.modifyToken = undefined;
    existedAccount.password = await bcrypt.hash(
      changeForgottonPasswordDto.password,
      +process.env.BCRYPT_HASH,
    );

    return existedAccount.save();
  }
}
