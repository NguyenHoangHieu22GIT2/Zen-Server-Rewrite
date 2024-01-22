import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { RegisterEndUserDto } from '../dto/register-end-user.dto';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';

import { AuthServiceStable } from '../stable/auth.stable.service';
import { LoginEndUserDto } from '../dto/login-end-user.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { v4 } from 'uuid';
import { ChangeForgottonPasswordDto } from '../dto/change-forgotton-password.dto';
import { checkingToConvertToObjectFromDocument } from 'src/common/utils/convertToObjectMongodb';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/DocumentMongodbType';

@Injectable()
export class AuthServiceUnstable {
  constructor(private readonly authServiceStable: AuthServiceStable) {}

  async registerAccount(registerEndUserDto: RegisterEndUserDto) {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async activateAccount(inactivateAccount: DocumentMongodbType<EndUser>) {
    try {
      // Set To undefined so the property in mongodb document remove the field entirely
      inactivateAccount.activationToken = undefined;
      const activatedAccount = inactivateAccount;

      return activatedAccount.save();
    } catch (error) {
      throw error;
    }
  }

  async loginAccount(loginEndUserDto: LoginEndUserDto) {
    try {
      let existedAccount =
        await this.authServiceStable.checkLoginAccount(loginEndUserDto);

      if (existedAccount.activationToken) {
        throw new UnauthorizedException(
          'This account has not been activated, please go to your email account to activate it',
        );
      }

      await this.authServiceStable.checkPasswordAndThrowErrorIfNotMatch(
        loginEndUserDto.password,
        existedAccount.password,
      );

      const convertedExistedAccount =
        checkingToConvertToObjectFromDocument(existedAccount);

      return convertedExistedAccount;
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(existedAccount: DocumentMongodbType<EndUser>) {
    try {
      existedAccount.modifyToken = v4();

      const savedUser = await existedAccount.save();

      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  async changeForgottonPassword(
    existedAccount: DocumentMongodbType<EndUser>,
    newPassword: string,
  ) {
    try {
      existedAccount.modifyToken = undefined;
      existedAccount.password = await bcrypt.hash(
        newPassword,
        +process.env.BCRYPT_HASH,
      );

      return existedAccount.save();
    } catch (error) {
      throw error;
    }
  }
}
