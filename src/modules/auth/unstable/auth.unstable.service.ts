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

@Injectable()
export class AuthServiceUnstable {
  constructor(
    @InjectModel(EndUser.name) private readonly EndUserModel: Model<EndUser>,
    private readonly authServiceStable: AuthServiceStable,
  ) {}

  async registerAccount(createEndUserDto: RegisterEndUserDto) {
    try {
      await this.authServiceStable.checkRegisteredAccount(
        createEndUserDto.email,
        'This email is already in used. Try another one',
      );

      const hashedPassword = await bcrypt.hash(
        createEndUserDto.password,
        +process.env.BCRYPT_HASH,
      );

      const accountInfo: Partial<EndUser> = {
        ...createEndUserDto,
        password: hashedPassword,
        activationToken: v4(),
      };

      const createdAccount = await this.EndUserModel.create(accountInfo);

      return createdAccount;
    } catch (error) {
      throw error;
    }
  }

  async activateAccount(activationToken: string) {
    try {
      const inactivateAccount =
        await this.authServiceStable.checkAccountIfNotExistThenThrowError({
          filterQuery: { activationToken },
          message: 'We found no account with this token!',
        });

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

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    try {
      const user =
        await this.authServiceStable.checkAccountIfNotExistThenThrowError({
          filterQuery: { email: forgotPasswordDto.email },
          message: 'Check your Input carefully please!',
        });

      user.modifyToken = v4();

      const savedUser = await user.save();

      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  async changeForgottonPassword(
    changeForgottonPasswordDto: ChangeForgottonPasswordDto,
  ) {
    try {
      const existedAccount =
        await this.authServiceStable.checkAccountIfNotExistThenThrowError({
          filterQuery: { modifyToken: changeForgottonPasswordDto.modifyToken },
          message: 'This is not the right place for you to be. Get out.',
        });

      existedAccount.modifyToken = undefined;
      existedAccount.password = await bcrypt.hash(
        changeForgottonPasswordDto.password,
        +process.env.BCRYPT_HASH,
      );
      return existedAccount.save();
    } catch (error) {
      throw error;
    }
  }
}
